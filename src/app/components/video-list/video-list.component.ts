import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video.model';
import { RouterModule } from '@angular/router';
import { HomeNavbarComponent } from '../../shared/home-navbar/home-navbar.component';


@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeNavbarComponent],
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  videos: Video[] = [];
  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    this.videoService.getVideos().subscribe((data: Video[]) => {
      this.videos = data;
    });
  }

  // deleteVideo(id: number): void {
  //   if (confirm('Are you sure you want to delete this video?')) {
  //     this.videoService.deleteVideo(id).subscribe(() => {
  //       this.videos = this.videos.filter(video => video.id !== id);
  //     });
  //   }
  // }
}
