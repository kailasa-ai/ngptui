import { toast } from "sonner";
import type {
  NodeFinishedResponse,
  NodeStartedResponse,
  TextChunkResponse,
  TextReplaceResponse,
  WorkflowFinishedResponse,
  WorkflowStartedResponse,
  MessageEnd,
  MessageReplace,
  ThoughtItem,
  VisionFile,
} from "@/types/response";
import {
  IOtherOptions,
  IOnDataMoreInfo,
  FetchOptionType,
  ResponseError,
  StreamHandlerArguments,
} from "./types";

const ContentType = {
  json: "application/json",
  stream: "text/event-stream",
  form: "application/x-www-form-urlencoded; charset=UTF-8",
  download: "application/octet-stream", // for download
  upload: "multipart/form-data", // for upload
};

const baseOptions = {
  method: "GET",
  mode: "cors",
  credentials: "include", // always send cookies、HTTP Basic authentication.
  headers: new Headers({
    "Content-Type": ContentType.json,
  }),
  redirect: "follow",
};

function unicodeToChar(text: string) {
  if (!text) return "";

  return text.replace(/\\u[0-9a-f]{4}/g, (_match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  });
}

export function format(text: string) {
  let res = text.trim();
  if (res.startsWith("\n")) res = res.replace("\n", "");

  return res.replaceAll("\n", "<br/>").replaceAll("```", "");
}

const handleStream = (payload: StreamHandlerArguments) => {
  const {
    onData,
    response,
    onCompleted,
    onThought,
    onFile,
    onMessageEnd,
    onMessageReplace,
    onWorkflowStarted,
    onWorkflowFinished,
    onNodeStarted,
    onNodeFinished,
    onTextChunk,
    onTextReplace,
  } = payload;

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  let bufferObj: Record<string, any>;
  let isFirstMessage = true;
  async function read() {
    let hasError = false;
    const result = await reader?.read();

    if (result?.done) {
      onCompleted && onCompleted();
      return;
    }

    buffer += decoder.decode(result?.value, { stream: true });

    const lines = buffer.split("\n");
    try {
      lines.forEach((message) => {
        if (message.startsWith("data: ")) {
          // check if it starts with data:
          try {
            bufferObj = JSON.parse(message.substring(6)) as Record<string, any>; // remove data: and parse as json
          } catch (e) {
            // mute handle message cut off
            onData("", isFirstMessage, {
              conversationId: bufferObj?.conversation_id,
              messageId: bufferObj?.message_id,
              created_at: bufferObj?.created_at,
            });
            return;
          }
          if (bufferObj.status === 400 || !bufferObj.event) {
            onData("", false, {
              conversationId: undefined,
              messageId: "",
              errorMessage: bufferObj?.message,
              errorCode: bufferObj?.code,
              created_at: bufferObj?.created_at,
            });
            hasError = true;
            onCompleted?.(true, bufferObj?.message);
            return;
          }
          if (
            bufferObj.event === "message" ||
            bufferObj.event === "agent_message"
          ) {
            // can not use format here. Because message is splited.
            onData(unicodeToChar(bufferObj.answer), isFirstMessage, {
              conversationId: bufferObj.conversation_id,
              taskId: bufferObj.task_id,
              messageId: bufferObj.id,
              created_at: bufferObj.created_at,
            });
            isFirstMessage = false;
          } else if (bufferObj.event === "agent_thought") {
            onThought?.(bufferObj as ThoughtItem);
          } else if (bufferObj.event === "message_file") {
            onFile?.(bufferObj as VisionFile);
          } else if (bufferObj.event === "message_end") {
            onMessageEnd?.(bufferObj as MessageEnd);
          } else if (bufferObj.event === "message_replace") {
            onMessageReplace?.(bufferObj as MessageReplace);
          } else if (bufferObj.event === "workflow_started") {
            onWorkflowStarted?.(bufferObj as WorkflowStartedResponse);
          } else if (bufferObj.event === "workflow_finished") {
            onWorkflowFinished?.(bufferObj as WorkflowFinishedResponse);
          } else if (bufferObj.event === "node_started") {
            onNodeStarted?.(bufferObj as NodeStartedResponse);
          } else if (bufferObj.event === "node_finished") {
            onNodeFinished?.(bufferObj as NodeFinishedResponse);
          } else if (bufferObj.event === "text_chunk") {
            onTextChunk?.(bufferObj as TextChunkResponse);
          } else if (bufferObj.event === "text_replace") {
            onTextReplace?.(bufferObj as TextReplaceResponse);
          }
        }
      });
      buffer = lines[lines.length - 1];
    } catch (e) {
      onData("", false, {
        conversationId: undefined,
        messageId: "",
        errorMessage: `${e}`,
        created_at: Date.now(),
      });
      hasError = true;
      onCompleted?.(true, e as string);
      return;
    }
    if (!hasError) read();
  }

  read();
};

export const ssePost = async (
  url: string,
  fetchOptions: FetchOptionType,
  otherOptions: IOtherOptions
) => {
  const {
    onData,
    onCompleted,
    onThought,
    onFile,
    onMessageEnd,
    onMessageReplace,
    onWorkflowStarted,
    onWorkflowFinished,
    onNodeStarted,
    onNodeFinished,
    onTextChunk,
    onTextReplace,
    onError,
    getAbortController,
  } = otherOptions;

  const abortController = new AbortController();

  const options = Object.assign(
    {},
    baseOptions,
    {
      method: "POST",
      signal: abortController.signal,
    },
    fetchOptions
  );

  const contentType = options.headers.get("Content-Type");
  if (!contentType) options.headers.set("Content-Type", ContentType.json);

  getAbortController?.(abortController);

  const urlWithPrefix = `${url.startsWith("/") ? url : `/${url}`}`;

  const { body } = options;
  if (body) options.body = JSON.stringify(body);

  try {
    const response = await globalThis.fetch(
      urlWithPrefix,
      options as RequestInit
    );

    if (!/^(2|3)\d{2}$/.test(String(response.status))) {
      response.json().then((data: any) => {
        toast.error(data.message || "Server Error");
      });
      onError?.("Server Error");
      return;
    }

    return handleStream({
      response,
      onData: (
        str: string,
        isFirstMessage: boolean,
        moreInfo: IOnDataMoreInfo
      ) => {
        if (moreInfo.errorMessage) {
          onError?.(moreInfo.errorMessage, moreInfo.errorCode);
          if (
            moreInfo.errorMessage !== "AbortError: The user aborted a request."
          )
            toast.error(moreInfo.errorMessage);
          return;
        }
        onData?.(str, isFirstMessage, moreInfo);
      },
      onCompleted,
      onThought,
      onMessageEnd,
      onMessageReplace,
      onFile,
      onWorkflowStarted,
      onWorkflowFinished,
      onNodeStarted,
      onNodeFinished,
      onTextChunk,
      onTextReplace,
    });
  } catch (e: ResponseError | any) {
    if (e.toString() !== "AbortError: The user aborted a request.")
      toast.error(e);
    onError?.(e);
  }
};
