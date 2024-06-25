import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8000/api';
  private apiUrlCreate = 'http://localhost:8000/api/comment';
  constructor(private http: HttpClient) {}
  // Obtener todos los comentarios de un video
  getCommentsByVideo(videoId: number): Observable<Comment[]> {
    return this.http.get<{ success: boolean, comments: Comment[] }>(`${this.apiUrl}/videos/${videoId}/comments`)
      .pipe(
        map(response => response.comments)
      );
  }
  // Crear un nuevo comentario
  createComment(comment: any): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrlCreate, comment);
  }

  // Actualizar un comentario existente
  updateComment(commentId: number, comment: any): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/${commentId}`, comment);
  }

  // Eliminar un comentario
  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${commentId}`);
  }
}
