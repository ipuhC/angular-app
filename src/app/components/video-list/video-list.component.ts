import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video.model';
import { RouterModule } from '@angular/router';
import { HomeNavbarComponent } from '../../shared/home-navbar/home-navbar.component';
import { VideosTableComponent } from '../../videos-table/videos-table.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeNavbarComponent, VideosTableComponent, FormsModule],
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  videos: Video[] = [];
  filteredVideos: Video[] = [];
  searchTitle: string = '';
  searchUsername: string = '';

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.videoService.getVideos().subscribe((data: Video[]) => {
      this.videos = data;
      this.filteredVideos = data;
    });
  }

  filter(): void {
    this.filteredVideos = this.videos.filter(video =>
      video.video_name.toLowerCase().includes(this.searchTitle.toLowerCase()) &&
      video.username.toLowerCase().includes(this.searchUsername.toLowerCase())
    );
  }
}
