import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { UserprofileComponent } from './component/userprofile/userprofile.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SearchComponent } from './component/search/search.component';
import { BookmarkComponent } from './component/bookmark/bookmark.component';
import { FeedComponent } from './component/feed/feed.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CreateQuestionComponent } from './component/home/create-question/create-question.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {EditorModule} from 'primeng/editor';
import { CreateAnswerComponent } from './component/home/create-answer/create-answer.component';
import { DeletequestioinComponent } from './component/userprofile/deletequestioin/deletequestioin.component';
import { UpdatequestionComponent } from './component/userprofile/updatequestion/updatequestion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserprofileComponent,
    SidenavComponent,
    SearchComponent,
    BookmarkComponent,
    FeedComponent,
    CreateQuestionComponent,
    CreateAnswerComponent,
    DeletequestioinComponent,
    UpdatequestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
      ReactiveFormsModule,
      MatCardModule,
      MatButtonModule,
      MatExpansionModule,
      MatIconModule,
      MatToolbarModule,
      MatMenuModule,
      MatSidenavModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
    MatChipsModule,
    EditorModule
    
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
