import { Component, OnInit } from '@angular/core';
import {MatChipEvent, MatChipInputEvent} from '@angular/material/chips';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {

  form!:FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateQuestionComponent>,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      questionTitle: [[], [Validators.required]],
      questionDes: [[], [Validators.required]],
    });
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  removable = true;
  tags: Tags[] = [{name: 'Java'}, {name: 'Python'}, {name: 'JavaScript'}];
  selectable = true;


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Tags): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  edit(fruit: Tags, event: MatChipEvent) {
    // const value = event.value.trim();

    // // Remove fruit if it no longer has a name
    // if (!value) {
    //   this.remove(fruit);
    //   return;
    // }

    // // Edit existing fruit
    // const index = this.fruits.indexOf(fruit);
    // if (index > 0) {
    //   this.fruits[index].name = value;
    // }
  }
  create(){}

  onSubmit() {
    const object = this.createSaveObject();
    this.dialogRef.close(object);
  }

  createSaveObject() {
    const obj: any = {};
    obj.question_title = this.form.get('questionTitle')?.value;
    obj.question_des = this.form.get('questionDes')?.value;
    
    return obj;
  }

}
export interface Tags {
  name: string;
}