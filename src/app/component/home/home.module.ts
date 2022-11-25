import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomePageService } from './home.service';
import { HttpClientModule } from '@angular/common/http';
import { CreateQuestionComponent } from './create-question/create-question.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {EditorModule} from 'primeng/editor';

@NgModule({
    imports: [
        HttpClientModule,
        MatDialogModule,
        MatButtonModule,
        MatChipsModule,
        
    ],
    exports: [RouterModule],
    declarations: [
      
    ],
  })
export class HomeModule{}