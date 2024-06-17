import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../../shared/admin-layout/admin-layout.component';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video.model';
import { HomeNavbarComponent } from '../../shared/home-navbar/home-navbar.component';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [
    CommonModule,
    AdminLayoutComponent,
    RouterModule,
    HomeNavbarComponent
  ],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent {
  videoUrl: string | null = null;
  videoId: number | null = null;
  video!: Video;
  videoList: Video[] = [];

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.videoId = +params['id'];
      if (this.videoId) {
        this.loadVideo(this.videoId);
        
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

  comments = [
    { profilePic: 'path/to/profilePic1.jpg', username: 'User1', text: 'Great video!' },
    { profilePic: 'path/to/profilePic2.jpg', username: 'User2', text: 'Thanks for sharing!' }
  ];

}
