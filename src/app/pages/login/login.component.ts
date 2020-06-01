import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private loginService: LoginServiceService) {}

  username = '';
  password = '';
  invalidLogin = false;

  ngOnInit() {
  }

  login() {
    this.loginService.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['dashboard']);
        this.invalidLogin = false;
    },
    error => {
      this.invalidLogin = true;
    });
  }


  ngOnDestroy() {
  }

}
