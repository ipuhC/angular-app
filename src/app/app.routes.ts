import { Routes } from '@angular/router';
import { UserlistComponent } from './pages/userlist/userlist.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { HomeComponent } from './home/home.component';
import { ThemesComponent } from './pages/themes/themes.component';
import { VideoFormComponent } from './pages/video-form/video-form.component';
import { VideosComponent } from './pages/videos/videos.component';
import { VideoListComponent } from './components/video-list/video-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'userlist',
    component: UserlistComponent,
    canActivate: [authGuardGuard],
    data: { role: 'admin' },
  },
  {
    path: 'usercreate',
    component: CreateUserComponent,
    canActivate: [authGuardGuard],
    data: { role: 'admin' },
  },
  {
    path: 'usercreate/:id/editar',
    component: CreateUserComponent,
    canActivate: [authGuardGuard],
    data: { role: 'admin' },
  },
  {
    path: 'themes',
    component: ThemesComponent,
    canActivate: [authGuardGuard],
    data: { role: 'admin' },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'videoform',
    component: VideoFormComponent,
  },
  {
    path: 'videos',
    component: VideoListComponent
  },
  {
    path: 'videos/subir',
    component: VideoFormComponent
  },
  {
    path: 'videos/:id',
    component: VideosComponent,
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
