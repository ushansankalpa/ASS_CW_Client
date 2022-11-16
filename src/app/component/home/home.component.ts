import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HomePageService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  url:any = null;
  questions: any[] = [];
  constructor(protected homePageService: HomePageService) { }
  

  ngOnInit(): void {
    this.getData();
    this.url = environment.apiUrl;
  }

  getData() {
    return  this.homePageService
        .query()
        .pipe(
            filter((res: HttpResponse<any>) => res.ok),
            map((res: HttpResponse<any>) => res.body)
        ).subscribe(
            (res: any) => this.onRequestSuccess(res.data),
            (res: HttpErrorResponse) => this.onRequestError(res.message)
        );
  }
  
  protected onRequestSuccess(res:any){
    this.questions = res;
  }
  
  protected onRequestError(res:any){
  
  }

}
