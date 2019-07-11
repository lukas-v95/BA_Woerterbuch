import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './jwt-authentification/auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  private authority: string;

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      console.log("token found!!")
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_FH_EMPLOYEE') {
          this.authority = 'fhEmp';
          return false;
        }
        this.authority = 'user';
        console.error("im a normal user");
        return true;
      });
    }
  }

  logout(){
    this.authority = null;
    this.roles = [];
    this.tokenStorage.signOut();
    this.router.navigate(['/auth/login']);
  }
}
