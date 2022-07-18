import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { User } from '../model/User';

let users = JSON.parse(localStorage.getItem('users') || '""') || [];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedInUserSubject: BehaviorSubject<User>;
  public loggedInUser: Observable<User>;

  constructor(private router: Router) {
    this.loggedInUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user') || '""')
    );
    this.loggedInUser = this.loggedInUserSubject.asObservable();
  }

  public get loggedInUserValue(): User {
    return this.loggedInUserSubject.value;
  }

  login(user: User) {
    if (!users.find((x: User) => x.username === user.username)) {
      return throwError({ message: 'Username or password is incorrect' });
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedInUserSubject.next(user);
    let userObservable: Observable<User> = of(user);
    return userObservable;
  }

  register(user: User) {
    if (users.find((x: User) => x.username === user.username)) {
      return throwError({message: 'Username "' + user.username + '" is already taken'});
    }
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    let userObservable: Observable<User> = of(user);
    return userObservable;
  }

  logout() {
    localStorage.removeItem('user');
    this.loggedInUserSubject.next(new User('', ''));
    this.router.navigate(['/login']);
  }
}
