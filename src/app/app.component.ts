import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';

declare var FB: any;
@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, HttpClientModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  ngOnInit() {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId     : 'YOUR_APP_ID',
        cookie     : true,
        xfbml      : true,
        version    : 'v12.0'
      });
      FB.AppEvents.logPageView();
    };
  }
}
