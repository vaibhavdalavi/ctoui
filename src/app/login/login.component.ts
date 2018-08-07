import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { LoginResponse } from '../models/loginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted= false;
  loading=false;
  loginForm: FormGroup;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService,
      private userService: UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  login(): void {

    this.submitted = true;
    
    if (this.loginForm.dirty && this.loginForm.valid) {
      debugger;
      this.userService.login(this.loginForm.value)
      .pipe(first())
        .subscribe(
        loginResponse => {
          if (loginResponse.status === LoginResponse.StatusEnum.SUCCESS) {
            this.authService.isLoggedIn = true;
            this.authService.user = loginResponse.user;
            this.authService.actingUser = Object.assign({}, this.authService.user);
            this.router.navigate(['/home']);
          } else {
            this.authService.isLoggedIn = false;
            debugger;
            error => {
              this.alertService.error(error);
              this.loading= false;
            }
          }
          return;
        },
       data => {
          this.authService.isLoggedIn = false;
          error => {
            this.alertService.error(error);
            this.loading= false;
          }
        }
        );
    } else if (!this.loginForm.dirty) {
      //this.errorMessage = 'Please provide valid username and password';
    }
  }

}
