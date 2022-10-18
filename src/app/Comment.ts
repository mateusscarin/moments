import { Moment } from './Moment';

export interface Comment {
  id?: number;
  text: string;
  username: string;
  moment: Moment;
  created_at?: Date | string;
  updated_at?: Date | string;
}
