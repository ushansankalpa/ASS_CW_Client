import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateAnswerComponent } from './create-answer/create-answer.component';
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
  answers: any[] = [];
  panelOpenState = false;
  ques_id:number | undefined;
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
        this.subscribeToSaveResponse(this.homePageService.createQuestion(result,1));
      }
      
    });
  }

  replyAnwsers(quesion: any) {
    this.dialog.open(CreateAnswerComponent, {
      width: '750px',
    }).afterClosed().subscribe(result => {
      if(result){
        this.subscribeToSaveResponse(this.homePageService.createAnswers(result,quesion.question_id));
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
    result.pipe(
        map((res: HttpResponse<any>) => res)
    ).subscribe(
        (res: any) => {
            this.getData();
        },
        (res: HttpErrorResponse) => this.onError(res.message)
    );

  }

  protected subscribeToSaveAnsResponseUpvote(result: Observable<HttpResponse<any>>) {
    result.pipe(
        map((res: HttpResponse<any>) => res)
    ).subscribe(
        (res: any) => {
            //this.getAnswers(this.ques_id);
        },
        (res: HttpErrorResponse) => this.onError(res.message)
    );

  }

  upvote(question_id:any){
    this.subscribeToSaveResponseUpvote(this.homePageService.upVoteQuestion(question_id));
  }

  ansUpVote(anws_id:any){
    this.subscribeToSaveAnsResponseUpvote(this.homePageService.anwsUpVoteQuestion(anws_id));
  }

  protected onError(errorMessage: string) {
    console.log(errorMessage);
  }

  getAnswers(question_id:any){
    this.answers = [];
    this.ques_id = question_id;
    return  this.homePageService
        .answers(question_id)
        .pipe(
            filter((res: HttpResponse<any>) => res.ok),
            map((res: HttpResponse<any>) => res.body)
        ).subscribe(
            (res: any) => {
              this.answers = res.data;
            },
            (res: HttpErrorResponse) => this.onRequestError(res.message)
        );
  }

}
