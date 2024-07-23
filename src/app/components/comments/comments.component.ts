import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Comment } from '../../models/comment.model';

import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment.service';
import { CommentCardComponent } from '../comment-card/comment-card.component';
import { user } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CommentCardComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  photoUrl: string | null = null;
  photoID: string | null = null;
  @Input() currentUserId!: string; 
  @Input() commentArray: Comment[] = [];
  @Input() videoId!: number;
  commentForm: FormGroup;
  isFormSubmitted: boolean = false;
  userProfilePhotos: { [key: string]: string } = {};

  constructor(private fb: FormBuilder, private authService : AuthService, private commentService: CommentService, private route: ActivatedRoute) {
    this.commentForm = this.fb.group({
      body: ['', Validators.required],
    });
  }


  onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.currentUserId) {
      const CommentData = new FormData();
      CommentData.append('video_id', this.videoId.toString());
      CommentData.append('user_id', this.currentUserId.toString());
      CommentData.append('body', this.commentForm.value.body);


      for (const pair of (CommentData as any).entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      this.commentService.createComment(CommentData).subscribe({
        next: (response) => {
          console.log('Comentario creado:', response);
          this.commentArray.push(response);
          this.commentForm.reset();
          this.isFormSubmitted = false;
          location.reload() // Forzar la detección de cambios
        },
        error: (error) => {
          console.error('Error al crear el comentario:', error);
          this.isFormSubmitted = false;
        },
      });
    } else {
      console.log(
        'Error al crear el comentario',
        this.commentForm.valid,
        this.currentUserId
      );
    }
  }

  // loadUserProfilePhoto(userId: number): void {
  //   this.authService.getUserProfilePhoto(userId).subscribe(photoUrl => {
  //     this.userProfilePhotos[userId] = photoUrl;
  //     console.log('Foto de perfil cargada:', photoUrl);
  //   });
  // }

  loadUserProfilePhoto(profilePhoto: string | null): string {
    const BASE_URL = 'http://127.0.0.1:8000/storage/profile_photos/';
    return profilePhoto ? BASE_URL + profilePhoto : 'path/to/default/profile/photo.jpg';
  }


  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.commentArray = this.commentArray.filter(
        (comment) => comment.id !== commentId
      );
    });
  }
}
