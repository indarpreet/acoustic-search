import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  credentials = { username: '', password: '' };

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }


  login() {
    let url = 'http://localhost:8080/login';
    let result = this.http.post(url, {
      userName: this.credentials.username,
      password: this.credentials.password
    }).subscribe(response => {
      console.log(response);
    });
  }
}
