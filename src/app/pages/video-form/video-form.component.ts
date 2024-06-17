import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminLayoutComponent } from '../../shared/admin-layout/admin-layout.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Video } from '../../models/video.model';
import { VideoService } from '../../services/video.service';
import { HomeNavbarComponent } from '../../shared/home-navbar/home-navbar.component';

@Component({
  selector: 'app-video-form',
  standalone: true,
  imports: [
    CommonModule,
    AdminLayoutComponent,
    ReactiveFormsModule,
    RouterModule,
    HomeNavbarComponent
  ],
  templateUrl: './video-form.component.html',
  styleUrl: './video-form.component.css',
})
export class VideoFormComponent {
  currentUserName: string = localStorage.getItem('userName') || '';
  videoForm: FormGroup;
  isFormSubmitted = false;
  videoId: number | null = null;
  videoFile: File | null = null;
  thumbnailFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private videoService: VideoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.videoForm = this.fb.group({
      video_file: [null, Validators.required],
      video_name: ['', Validators.required],
      likes: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^\\d{1,10}$'),
        ],
      ],
      dislikes: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^\\d{1,10}$'),
        ],
      ],
      views: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^\\d{1,10}$'),
        ],
      ],
      upload_date: ['', Validators.required],
      thumbnail: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    console.log('Current user:', localStorage.getItem('userName'));
    this.videoId = this.route.snapshot.params['id'];
    if (this.videoId) {
      this.videoService.getVideo(this.videoId).subscribe((video: Video) => {
        this.videoForm.patchValue(video);
      });
    }
  }

  onVideoChange(e: any) {
    const file: File = e.target.files[0];
    if (file) {
      this.videoFile = file;
    }
  }
  onThumbnailChange(e: any) {
    const file: File = e.target.files[0];
    if (file) {
      this.thumbnailFile = file;
    }
  }


  onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.videoForm.valid && this.videoFile && this.thumbnailFile) {
      const formData = new FormData();

      formData.append('video_name', this.videoForm.value.video_name);
      formData.append('likes', this.videoForm.value.likes);
      formData.append('dislikes', this.videoForm.value.dislikes);
      formData.append('views', this.videoForm.value.views);
      formData.append('upload_date', this.videoForm.value.upload_date);
      formData.append('username', this.currentUserName);
      formData.append('video_file', this.videoFile);
      formData.append('thumbnail', this.thumbnailFile);

      if (this.videoId) {
        this.videoService.updateVideo(this.videoId, formData).subscribe(
          {
            next: (response) => {
              console.log('Video updated:', response)
              this.router.navigate(['/',]);
            },
            error: (error) => {
              console.error('Error updating video:', error);
            },
          }
        );
      } else {
        this.videoService.createVideo(formData).subscribe(
          {
            next: (response) => {
              console.log('Video created:', response);
              this.router.navigate(['/']);
            },
            error: (error) => {
              console.error('Error creating video:', error);
            },
          
          }
        );
      }
    }else	{
      console.log('Form is valid: ',this.videoForm.valid,"VIDEO FILE: ", this.videoFile,"THUMBNILE FILE: ", this.thumbnailFile);
    }
    
  }
}
