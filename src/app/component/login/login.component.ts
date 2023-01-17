import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { filter, map, Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  user: any = null;

  constructor(private fb: FormBuilder,protected loginService: LoginService,private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [[], [Validators.required]],
      password: [[], [Validators.required]],
    });

  }

  // login(){
  //   console.error(this.form.value);
  // }

  login(){
    const object = this.createSaveObject();
    return  this.loginService
        .login(object)
        .pipe(
            filter((res: HttpResponse<any>) => res.ok),
            map((res: HttpResponse<any>) => res.body)
        ).subscribe(
            (res: any) => {
              this.user = res;
              if(this.user){
                localStorage.setItem('user_id', this.user.data.user_id);
                localStorage.setItem('user', JSON.stringify(this.user.data));
                this.router.navigate(['/home']);
              }
            },
            (res: HttpErrorResponse) => this.onRequestError(res.message)
        );
  }

  protected onRequestError(res:any){
  
  }

  createSaveObject() {
    const obj: any = {};
    obj.email = this.form.get('email')?.value;
    obj.password = this.form.get('password')?.value;
    return obj;
  }

}
