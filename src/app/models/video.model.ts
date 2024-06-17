// video.model.ts
export interface Video {
    id?: number;
    video_name: string;
    likes: number;
    dislikes: number;
    views: number;
    upload_date: string;
    username: string;
    video_file: string;
    thumbnail: string;
  }
  