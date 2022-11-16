import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder,) { }

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
    debugger
    console.log(this.form.value);
  }
}
