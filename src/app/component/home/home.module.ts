import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomePageService } from './home.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    imports: [
        HttpClientModule,
        
    ],
    exports: [RouterModule],
  })
export class HomeModule{}