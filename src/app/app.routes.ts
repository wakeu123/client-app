import { ListUserComponent } from './features/users/list.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { VideoComponent } from './features/video/video.component';
import { PhoneComponent } from './features/phone/phone.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'users', component: ListUserComponent },
    { path: 'video', component: VideoComponent, title: 'video' },
    { path: 'phone', component: PhoneComponent, title: 'Phone' },
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
