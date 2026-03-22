export type QueueItem = {
  id: string;
  endpoint: string;
  method: "POST";
  payload: any;
  retries: number;
  status: "pending" | "failed";
  createdAt: number;
};
