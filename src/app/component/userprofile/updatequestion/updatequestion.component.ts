import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-updatequestion',
  templateUrl: './updatequestion.component.html',
  styleUrls: ['./updatequestion.component.scss']
})
export class UpdatequestionComponent implements OnInit {

  form!:FormGroup;

  constructor(public dialogRef: MatDialogRef<UpdatequestionComponent>,private fb: FormBuilder,  @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      questionTitle: [[], [Validators.required]],
      questionDes: [[], [Validators.required]],
    });

    this.form.patchValue({
      questionTitle: this.data.question_title,
      questionDes: this.data.question_img,
    });


  }

  onSubmit() {
    const object = this.createSaveObject();
    this.dialogRef.close(object);
  }

  createSaveObject() {
    const obj: any = {};
    obj.question_title = this.form.get('questionTitle')?.value;
    obj.question_des = this.form.get('questionDes')?.value;
    obj.question_img = this.form.get('questionDes')?.value;
    obj.question_votes = this.data.question_votes;
    obj.user_id = this.data.user_id;
    return obj;
  }

}
