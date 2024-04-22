import type {
  AnnotationReply,
  MessageEnd,
  MessageReplace,
  ThoughtItem,
  VisionFile,
  NodeFinishedResponse,
  NodeStartedResponse,
  TextChunkResponse,
  TextReplaceResponse,
  WorkflowFinishedResponse,
  WorkflowStartedResponse,
} from "@/types/response";

export type IOnDataMoreInfo = {
  created_at: number;
  messageId: string;
  conversationId?: string;
  taskId?: string;
  errorMessage?: string;
  errorCode?: string;
};

export type IOnData = (
  message: string,
  isFirstMessage: boolean,
  moreInfo: IOnDataMoreInfo
) => void;
export type IOnThought = (though: ThoughtItem) => void;
export type IOnFile = (file: VisionFile) => void;
export type IOnMessageEnd = (messageEnd: MessageEnd) => void;
export type IOnMessageReplace = (messageReplace: MessageReplace) => void;
export type IOnAnnotationReply = (messageReplace: AnnotationReply) => void;
export type IOnCompleted = (hasError?: boolean, errorMessage?: string) => void;
export type IOnError = (msg: string, code?: string) => void;

export type IOnWorkflowStarted = (
  workflowStarted: WorkflowStartedResponse
) => void;
export type IOnWorkflowFinished = (
  workflowFinished: WorkflowFinishedResponse
) => void;
export type IOnNodeStarted = (nodeStarted: NodeStartedResponse) => void;
export type IOnNodeFinished = (nodeFinished: NodeFinishedResponse) => void;
export type IOnTextChunk = (textChunk: TextChunkResponse) => void;
export type IOnTextReplace = (textReplace: TextReplaceResponse) => void;

export type IOtherOptions = {
  bodyStringify?: boolean;
  needAllResponseContent?: boolean;
  deleteContentType?: boolean;
  silent?: boolean;
  onData?: IOnData; // for stream
  onThought?: IOnThought;
  onFile?: IOnFile;
  onMessageEnd?: IOnMessageEnd;
  onMessageReplace?: IOnMessageReplace;
  onError?: IOnError;
  onCompleted?: IOnCompleted; // for stream
  getAbortController?: (abortController: AbortController) => void;

  onWorkflowStarted?: IOnWorkflowStarted;
  onWorkflowFinished?: IOnWorkflowFinished;
  onNodeStarted?: IOnNodeStarted;
  onNodeFinished?: IOnNodeFinished;
  onTextChunk?: IOnTextChunk;
  onTextReplace?: IOnTextReplace;
};

export type ResponseError = {
  code: string;
  message: string;
  status: number;
};

export type FetchOptionType = Omit<RequestInit, "body"> & {
  params?: Record<string, any>;
  body?: BodyInit | Record<string, any> | null;
};

export type StreamHandlerArguments = {
  response: Response;
  onData: IOnData;
  onCompleted?: IOnCompleted;
  onThought?: IOnThought;
  onMessageEnd?: IOnMessageEnd;
  onMessageReplace?: IOnMessageReplace;
  onFile?: IOnFile;
  onWorkflowStarted?: IOnWorkflowStarted;
  onWorkflowFinished?: IOnWorkflowFinished;
  onNodeStarted?: IOnNodeStarted;
  onNodeFinished?: IOnNodeFinished;
  onTextChunk?: IOnTextChunk;
  onTextReplace?: IOnTextReplace;
};
