import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../../shared/admin-layout/admin-layout.component';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video.model';
import { HomeNavbarComponent } from '../../shared/home-navbar/home-navbar.component';
import { CommentsComponent } from '../../components/comments/comments.component';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment.model';
@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [
    CommonModule,
    AdminLayoutComponent,
    RouterModule,
    HomeNavbarComponent,
    CommentsComponent
  ],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent {
  videoUrl: string | null = null;
  videoId: number = 0;
  video!: Video;
  videoList: Video[] = [];
  commentArray: Comment[] = [];
  currentUserId!: string;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private commentService: CommentService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.videoId = +params['id'];
      if (this.videoId) {
        this.loadVideo(this.videoId);
        this.loadComments();
      }
    });
  };

  private loadVideo(id:number): void {
    this.videoService.getVideo(id).subscribe(video => {
      console.log(video, typeof video);
      this.video = video;
    });
    this.videoService.getVideos().subscribe(videoList => {
      this.videoList = videoList;
    });
  }

  private loadComments(): void {
    this.commentService.getCommentsByVideo(this.videoId).subscribe((data: any) => {
      this.commentArray = data;
      this.currentUserId = localStorage.getItem('userId') || '';
      console.log(this.commentArray);
    });
  }

}
