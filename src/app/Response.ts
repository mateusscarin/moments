export interface Response<T> {
  status: string;
  messages?: string[];
  data: T;
}
