import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  private formSubmitAttempt: boolean;
  private submitted: boolean;
  customErrors = { required: 'Diese Username - Passwort Kombination ist uns nicht bekannt!' }
  private loginSuccess = false;



  // old:
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.clearSessionData();
    
    this.myForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });


    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  //new:
  isFieldInvalid(field: string) {
    return (
      (!this.myForm.get(field).valid && this.myForm.get(field).touched) ||
      (this.myForm.get(field).untouched && this.formSubmitAttempt)
    );
  }


  onSubmit() {
    console.log("submitting...")
    if (this.myForm.valid) {
      console.log("form is valid!");
      console.log(this.form);

      this.loginInfo = new AuthLoginInfo(
        this.myForm.get('userName').value,
        this.myForm.get('password').value);

      this.authService.attemptAuth(this.loginInfo).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getAuthorities();
          this.reloadPage();
          this.loginSuccess = true;
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
        }
      );
    }
    console.log("verlasse on submit");
    this.submitted = true;
  }

  reloadPage() {
    // we need to refresh the page with a given path to update the view for the current user
    window.location.href = "/home";
  }

  clearSessionData() {
    console.log("clear session")
    //window.sessionStorage.clear();
  }
}
