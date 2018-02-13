import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup;
    user = {
      email: '',
      password: '',
      name: ''
    };

    get email() { return this.signupForm.get('email'); }
    get password() { return this.signupForm.get('password'); }
    get name() { return this.signupForm.get('name'); }
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder)  { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group ({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  signInWithEmail() {

    if (this.signupForm.valid) {
      this.user = this.signupForm.value;
      console.log(this.user);
      this.authService.signInRegular(this.user.email, this.user.password)
        .then((res) => {
          console.log(res);
          this.authService.setUserDefaultProfile(this.user.name)
            .then((response) => {
              console.log(response);
              this.router.navigate(['dashboard']);
            });
        })
        .catch((err) => console.log('error:' + err ));
    }
  }
}
