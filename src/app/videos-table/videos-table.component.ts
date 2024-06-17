import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Video {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  views: number;
  likes: number;
  dislikes: number;
  date: Date;
  [key: string]: any; // Add an index signature to allow accessing properties dynamically
}

@Component({
  selector: 'videos-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './videos-table.component.html',
  styleUrls: ['./videos-table.component.css']
})
export class VideosTableComponent implements OnInit {
  videos: Video[] = [
    {
      id: 1,
      thumbnail: '/placeholder.svg',
      title: 'El ERROR que DESTROZÓ a Woody Allen',
      description: 'DEL CARA JOT TV • 1.3K visualizaciones • hace 36 minutos',
      views: 1300,
      likes: 100,
      dislikes: 10,
      date: new Date('2024-06-01')
    },
    // más videos...
  ];

  filteredVideos: Video[] = [];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchTerm: string = '';

  ngOnInit(): void {
    this.filteredVideos = this.videos;
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredVideos = this.filteredVideos.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      const comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  filter(): void {
    this.filteredVideos = this.videos.filter(video =>
      video.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
