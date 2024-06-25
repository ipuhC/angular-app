import { user } from "./user.model";

export interface Comment {
  id: number;
  video_id: number;
  user_id: number;
  username: string;
  body: string;
  created_at: string;
  updated_at: string;
  user: user;
}
