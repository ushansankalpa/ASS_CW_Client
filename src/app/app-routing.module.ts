import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkComponent } from './component/bookmark/bookmark.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { UserprofileComponent } from './component/userprofile/userprofile.component';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'home',
    //loadChildren: () => import('././component/home/home.module').then(m => m.HomeModule),
    component: HomeComponent
  },
  {
    path:'profile',
    component: UserprofileComponent
    //loadChildren: () => import('././component/userprofile/userprofile.module').then(m => m.UserProfileModule),
  },
  {
    path:'bookmark',
    component: BookmarkComponent
    //loadChildren: () => import('././component/userprofile/userprofile.module').then(m => m.UserProfileModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
