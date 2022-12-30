import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { HomePageService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  url:any = null;
  questions: any[] = [];
  constructor(protected homePageService: HomePageService,public dialog: MatDialog) { }
  

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

  openDialog() {
    this.dialog.open(CreateQuestionComponent, {
      width: '750px',
    }).afterClosed().subscribe(result => {
      if(result){
        this.subscribeToSaveResponse(this.homePageService.createQuestion(result));
      }
      
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.pipe(
        map((res: HttpResponse<any>) => res.body)
    ).subscribe(
        (res: any) => {
            this.getData();
        },
        (res: HttpErrorResponse) => this.onError(res.message)
    );

  }

  protected subscribeToSaveResponseUpvote(result: Observable<HttpResponse<any>>) {
    debugger
    result.pipe(
        map((res: HttpResponse<any>) => res)
    ).subscribe(
        (res: any) => {
            this.getData();
        },
        (res: HttpErrorResponse) => this.onError(res.message)
    );

  }

  upvote(question_id:any){
    this.subscribeToSaveResponseUpvote(this.homePageService.upVoteQuestion(question_id));
  }

  protected onError(errorMessage: string) {
    console.log(errorMessage);
  }
}
