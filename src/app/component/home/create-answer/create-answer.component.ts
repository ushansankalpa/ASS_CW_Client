import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-answer',
  templateUrl: './create-answer.component.html',
  styleUrls: ['./create-answer.component.scss']
})
export class CreateAnswerComponent implements OnInit {

  form!:FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateAnswerComponent>,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      anwserDes: [[], [Validators.required]],
    });
  }

  addOnBlur = true;
  removable = true;
  selectable = true;


  create(){}

  onSubmit() {
    const object = this.createSaveObject();
    this.dialogRef.close(object);
  }

  createSaveObject() {
    const obj: any = {};
    obj.answer_des = this.form.get('anwserDes')?.value;
    obj.user_id = 1;
    return obj;
  }

}


