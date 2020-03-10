import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validationsForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.'}
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minLength', message: 'Password must be at least 5 characters long.' }
    ]
  }

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    });
  }

  tryRegister(value) {
    this.authService.registerUser(value)
    .then(
      res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created. Please log in.';
      },
      err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      }
    );
  }

  goLoginPage() {
    this.router.navigate(['login']);
  }
}
