import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {

    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }else {
      this.router.navigate(['login']);
    }

  }

  logout() {
    this.authService.logoutUser()
    .then(
      res => {
        console.log(res);
        this.router.navigate(['login']);
      }
    ).catch(
      error => console.log(error)
    );
  }

}
