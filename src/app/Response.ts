export interface Response<T> {
  status: string;
  body?: T;
  messages: string[];
}
