import { Component } from '@angular/core';
import {AuthService} from './shared/auth.service';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: any;
  isCollapsed: boolean;
  constructor(private authService: AuthService,
              private router: RouterModule) {
    this.isCollapsed = true;
    this.authService.user
      .subscribe( data => {
        this.user = data;
      });
  }

  signIn() {
    this.authService.signin('google');
  }

  logout() {
    this.authService.logout();
  }

  resize(event: any) {
    if (window.innerWidth >= 768) {
      this.isCollapsed = true;
    }
  }
}
