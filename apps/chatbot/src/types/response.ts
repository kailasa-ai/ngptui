export type LogAnnotation = {
  content: string;
  account: {
    id: string;
    name: string;
    email: string;
  };
  created_at: number;
};

export type Annotation = {
  id: string;
  authorName: string;
  logAnnotation?: LogAnnotation;
  created_at?: number;
};

export enum TransferMethod {
  all = "all",
  local_file = "local_file",
  remote_url = "remote_url",
}

export type VisionFile = {
  id?: string;
  type: string;
  transfer_method: TransferMethod;
  url: string;
  upload_file_id: string;
  belongs_to?: string;
};

export type MessageMore = {
  time: string;
  tokens: number;
  latency: number | string;
};

export const MessageRatings = ["like", "dislike", null] as const;
export type MessageRating = (typeof MessageRatings)[number];

export type Feedbacktype = {
  rating: MessageRating;
  content?: string | null;
};

export type ToolInfoInThought = {
  name: string;
  input: string;
  output: string;
  isFinished: boolean;
};

export type ThoughtItem = {
  id: string;
  tool: string; // plugin or dataset. May has multi.
  thought: string;
  tool_input: string;
  message_id: string;
  observation: string;
  position: number;
  files?: string[];
  message_files?: VisionFile[];
};

export type CitationItem = {
  content: string;
  data_source_type: string;
  dataset_name: string;
  dataset_id: string;
  document_id: string;
  document_name: string;
  hit_count: number;
  index_node_hash: string;
  segment_id: string;
  segment_position: number;
  score: number;
  word_count: number;
};

export type IChatItem = {
  id: string;
  content: string;
  citation?: CitationItem[];
  /**
   * Specific message type
   */
  isAnswer: boolean;
  /**
   * The user feedback result of this message
   */
  feedback?: Feedbacktype;
  /**
   * The admin feedback result of this message
   */
  adminFeedback?: Feedbacktype;
  /**
   * Whether to hide the feedback area
   */
  feedbackDisabled?: boolean;
  /**
   * More information about this message
   */
  more?: MessageMore;
  annotation?: Annotation;
  useCurrentUserAvatar?: boolean;
  isOpeningStatement?: boolean;
  suggestedQuestions?: string[];
  log?: { role: string; text: string; files?: VisionFile[] }[];
  agent_thoughts?: ThoughtItem[];
  message_files?: VisionFile[];
  workflow_run_id?: string;
  // for agent log
  conversationId?: string;
  input?: any;
};

export type MessageEnd = {
  id: string;
  metadata: {
    retriever_resources?: CitationItem[];
    annotation_reply: {
      id: string;
      account: {
        id: string;
        name: string;
      };
    };
  };
};

export type MessageReplace = {
  id: string;
  task_id: string;
  answer: string;
  conversation_id: string;
};

export type AnnotationReply = {
  id: string;
  task_id: string;
  answer: string;
  conversation_id: string;
  annotation_id: string;
  annotation_author_name: string;
};

export type WorkflowStartedResponse = {
  task_id: string;
  workflow_run_id: string;
  event: string;
  message_id: string;
  conversation_id: string;
  data: {
    id: string;
    workflow_id: string;
    sequence_number: number;
    created_at: number;
  };
};

export type WorkflowFinishedResponse = {
  task_id: string;
  workflow_run_id: string;
  event: string;
  data: {
    id: string;
    workflow_id: string;
    status: string;
    outputs: any;
    error: string;
    elapsed_time: number;
    total_tokens: number;
    total_steps: number;
    created_at: number;
    finished_at: number;
  };
};

export type NodeStartedResponse = {
  task_id: string;
  workflow_run_id: string;
  event: string;
  data: {
    id: string;
    node_id: string;
    node_type: string;
    index: number;
    predecessor_node_id?: string;
    inputs: any;
    created_at: number;
    extras?: any;
  };
};

export type NodeFinishedResponse = {
  task_id: string;
  workflow_run_id: string;
  event: string;
  data: {
    id: string;
    node_id: string;
    node_type: string;
    index: number;
    predecessor_node_id?: string;
    inputs: any;
    process_data: any;
    outputs: any;
    status: string;
    error: string;
    elapsed_time: number;
    execution_metadata: {
      total_tokens: number;
      total_price: number;
      currency: string;
    };
    created_at: number;
  };
};

export type TextChunkResponse = {
  task_id: string;
  workflow_run_id: string;
  event: string;
  data: {
    text: string;
  };
};

export type TextReplaceResponse = {
  task_id: string;
  workflow_run_id: string;
  event: string;
  data: {
    text: string;
  };
};

export type NodesDefaultConfigsResponse = {
  type: string;
  config: any;
}[];
