import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Video } from '../models/video.model';  // Asegúrate de tener un modelo Video

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private readonly API = 'http://127.0.0.1:8000/api/videos'; 
  private readonly BASE_URL = 'http://127.0.0.1:8000/storage/';  // URL base para las imágenes

  constructor(private http: HttpClient) { }

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.API).pipe(
      map(videos => videos.map(video => {
        video.thumbnail = this.BASE_URL + video.thumbnail;
        video.video_file = this.BASE_URL + video.video_file;
        return video;
      }))
    );
  }

  getVideo(id: number): Observable<Video> {
    return this.http.get<Video>(`${this.API}/${id}`).pipe(
      map(video => {
        video.thumbnail = this.BASE_URL + video.thumbnail;
        video.video_file = this.BASE_URL + video.video_file;
        return video;
      })
    );
  }

  createVideo(video: FormData): Observable<Video> {
    return this.http.post<Video>(this.API, video);
  }

  updateVideo(id: number, video: FormData): Observable<Video> {
    return this.http.post<Video>(`${this.API}/${id}`, video);
  }

  deleteVideo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
