export class Question {

    question_id?: number;
    question_title?: string;
    question_des?: string;
    question_img?: any;
    createdAt?: any;
    id?: number

  
    constructor(question:any) {
        this.question_id = question.question_id;
        this.question_title = question.question_title;
        this.question_des = question.question_des;
        this.question_img = question.question_img;
        this.createdAt = question.createdAt;
        this.id = question.id;
    }
  
  }
  