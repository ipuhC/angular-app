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
import { AppComponent } from '../../app.component';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionsComponent } from '../../subscriptions-component/subscriptions-component.component';


declare var FB: any;
@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [
    CommonModule,
    AdminLayoutComponent,
    RouterModule,
    HomeNavbarComponent,
    CommentsComponent,
    AppComponent,
    SubscriptionsComponent,
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
  isShareModalOpen: boolean = false;
  primaryColor: string = '';
  secondaryColor: string = '';
  complementaryColor: string = '';
  buttonColor: string = '';
  textColor: string = '';

  animateLike: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private commentService: CommentService,
    private subscriptionService: SubscriptionService
  ) {}


  ngOnInit(): void {
    this.primaryColor = localStorage.getItem('primaryColor') || '#FFFFFF';
    this.secondaryColor = localStorage.getItem('secondaryColor') || '#e5e5e5';
    this.complementaryColor = localStorage.getItem('complementaryColor') || '#4b5563';
    this.buttonColor = localStorage.getItem('buttonColor') || '#bde0fe';
    this.textColor = localStorage.getItem('textColor') || '#000';
    this.route.params.subscribe(params => {
      this.videoId = +params['id'];
      if (this.videoId) {
        this.loadVideo(this.videoId);
        this.loadComments();
        this.videoUrl = `${window.location.origin}/videos/${this.videoId}`;
        
      }
    });
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId: 'YOUR_APP_ID', // Opcional, puede omitirlo si no tiene un App ID
        cookie: true,
        xfbml: true,
        version: 'v12.0'
      });
      FB.AppEvents.logPageView();
    };
    
  };
  
  copyToClipboard(): void {
    if (this.videoUrl) {
      navigator.clipboard.writeText(this.videoUrl).then(() => {
        alert('Link copiado al portapapeles');
      }, () => {
        alert('Error al copiar el URL');
      });
    }
  }


  private loadVideo(id:number): void {
    this.videoService.getVideo(id).subscribe(video => {
      console.log(video, typeof video);
      this.video = video;
      this.incrementViews()
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
  incrementLikes(): void {
    this.animateLike = true;
    this.videoService.updateLikes(this.videoId, this.video.likes + 1).subscribe(updatedVideo => {
      this.video = updatedVideo;
      setTimeout(() => {
        this.animateLike = false;
      }, 300);
    });
  }

  incrementDislikes(): void {
    this.videoService.updateDislikes(this.videoId, this.video.dislikes + 1).subscribe(updatedVideo => {
      this.video = updatedVideo;
    });
  }

  incrementViews(): void {
    this.videoService.updateViews(this.videoId, this.video.views + 1).subscribe(updatedVideo => {
      this.video = updatedVideo;
    });
  }

  shareOnWhatsApp(video: Video): void {
    const message = `Check out this video: ${video.video_name} - ${window.location.origin}/videos/${video.id}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  shareOnTwitter(video: Video): void {
    const message = `Check out this video: ${video.video_name}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${window.location.origin}/videos/${video.id}`;
    window.open(url, '_blank');
  }
  
  shareOnTelegram(video: Video): void {
    const message = `Check out this video: ${video.video_name}`;
    const url = `https://t.me/share/url?url=${window.location.origin}/videos/${video.id}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  shareOnFacebook(video: Video): void {
    console.log('share on facebook', window.location.href);
    FB.ui({
      display: 'popup',
      method: 'share',
      href: "www.google.com",
    }, function(response: any){});
  
  }

  openShareModal(): void {
    this.isShareModalOpen = true;
  }

  closeShareModal(): void {
    this.isShareModalOpen = false;
  }

  shareByEmail(video: Video): void {
    const subject = `Check out this video: ${video.video_name}`;
    const body = `I found this video and thought you might like it: ${window.location.origin}/videos/${video.id}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }

  subscribeToUser(userName: string): void {
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    if (!subscriptions.includes(userName)) {
      subscriptions.push(userName);
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
      window.location.reload();
      alert(`Suscripción exitosa a: ${userName}`);
    } else {
      alert(`Ya estás suscrito a: ${userName}`);
    }
  }
  isSubscribed(userName: string): boolean {
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    return subscriptions.includes(userName);
  }

}
