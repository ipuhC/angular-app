import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css'],
})
export class CommentCardComponent {
  @Input()
  comment!: Comment;
}
