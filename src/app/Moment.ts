import { Comment } from './Comment';

export interface Moment {
  id?: number;
  title: string;
  description: string;
  image: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  comments?: Comment[];
}
