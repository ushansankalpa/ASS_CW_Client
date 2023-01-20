import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateAnswerComponent } from '../home/create-answer/create-answer.component';
import { CreateQuestionComponent } from '../home/create-question/create-question.component';
import { HomePageService } from '../home/home.service';
import { DeletequestioinComponent } from './deletequestioin/deletequestioin.component';
import { UpdatequestionComponent } from './updatequestion/updatequestion.component';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  user: any = null;
  url:any = null;
  questions: any[] = [];
  answers: any[] = [];
  panelOpenState = false;
  ques_id:number | undefined;
  form!:FormGroup;
  userId: number | undefined;
  constructor(protected homePageService: HomePageService,public dialog: MatDialog,private fb: FormBuilder) { }

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
    this.getData();
    this.url = environment.apiUrl;
    this.form = this.fb.group({
      search: ['', [Validators.required]],
    });

  }

  getData() {
    return  this.homePageService
        .queryProfile(this.user.user_id)
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
        const user_id = JSON.parse(localStorage.getItem('user_id') || '{}');
        this.subscribeToSaveResponse(this.homePageService.createQuestion(result,user_id));
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

  update(qs:any){
    this.dialog.open(UpdatequestionComponent, {
      width: '750px',
      data:qs
    }).afterClosed().subscribe(result => {
      if(result){
        this.subscribeToSaveResponse(this.homePageService.updateQuestion(result,qs.question_id));
      }
      
    });
  }

  
  deleted(qs:any){
    const dialogRef = this.dialog.open(DeletequestioinComponent, {
      data: {qes: qs.question_title},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.subscribeToSaveResponse(this.homePageService.deleteQuestion(qs.question_id));
      }
      
    });
  }
  

}
