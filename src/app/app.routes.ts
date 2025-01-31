import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { VideoComponent } from './features/video/video.component';
import { PhoneComponent } from './features/phone/phone.component';
import { LoginComponent } from './features/login/login.component';
import { ListUserComponent } from './features/users/list.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { FileUploadComponent } from './features/file/file-upload.component';
import { FileService } from './shared/services/file.service';
import { UserFascade } from './features/users/user.fascade';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'users', component: ListUserComponent, providers: [UserFascade] },
    { path: 'file-upload', component: FileUploadComponent, providers: [FileService] },
    { path: 'video', component: VideoComponent, title: 'video' },
    { path: 'phone', component: PhoneComponent, title: 'Phone' },
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: 'file-upload', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
