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

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CommentCardComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  @Input() currentUserId!: string; 
  @Input() commentArray: Comment[] = [];
  @Input() videoId!: number;
  commentForm: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private commentService: CommentService, private route: ActivatedRoute) {
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

  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.commentArray = this.commentArray.filter(
        (comment) => comment.id !== commentId
      );
    });
  }
}
