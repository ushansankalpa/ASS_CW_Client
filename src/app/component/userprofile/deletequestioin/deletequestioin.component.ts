import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-deletequestioin',
  templateUrl: './deletequestioin.component.html',
  styleUrls: ['./deletequestioin.component.scss']
})
export class DeletequestioinComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeletequestioinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  
  ngOnInit(): void {
  }

  onNoClick(value:any): void {
    if(value == 'yes'){
      this.dialogRef.close(true);
    }else{
      this.dialogRef.close(false);
    }
  
  }
}
