import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private registerService: RegisterService,private router: Router,) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      fname: [[], [Validators.required]],
      lname: [[], [Validators.required]],
      username: [[], [Validators.required]],
      email: [[], [Validators.required]],
      password: [[], [Validators.required]],
      cpassword: [[], [Validators.required]],
    });
  }

  onSubmit() {
    const object = this.createSaveObject();
    if(object.password === this.form.get('cpassword')?.value){
      this.subscribeToSaveResponse(this.registerService.save(object));
    }
  }

  createSaveObject() {
    const obj: any = {};
    obj.first_name = this.form.get('fname')?.value;
    obj.last_name = this.form.get('lname')?.value;
    obj.username = this.form.get('username')?.value.toLowerCase();
    obj.email = this.form.get('email')?.value.toLowerCase();
    obj.password = this.form.get('password')?.value;
    
    return obj;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.pipe(
        map((res: HttpResponse<any>) => res.body)
    ).subscribe(
        (res: any) => {
            console.log('Registration Successful');
            this.router.navigate(['/']);
        },
        (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  protected onError(errorMessage: string) {
    console.log(errorMessage);
  }
}
