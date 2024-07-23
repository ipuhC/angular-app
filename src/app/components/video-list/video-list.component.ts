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
  primaryColor: string = '';
  secondaryColor: string = '';
  complementaryColor: string = '';
  buttonColor: string = '';
  textColor: string = '';

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.primaryColor = localStorage.getItem('primaryColor') || '#1f2937';
    this.secondaryColor = localStorage.getItem('secondaryColor') || '#111827';
    this.complementaryColor = localStorage.getItem('complementaryColor') || '#4b5563';
    this.buttonColor = localStorage.getItem('buttonColor') || '#9ca3af';
    this.textColor = localStorage.getItem('textColor') || '#dbe7e4';
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
