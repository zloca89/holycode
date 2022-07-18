import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './model/User';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'holycode app';

  loggedInUser: User;

  constructor(
      private router: Router,
      private userService: UserService
  ) {
      this.userService.loggedInUser.subscribe(user => this.loggedInUser = user);
  }
}
