import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { Book } from '../model/Book';
import { Character } from '../model/Character';
import { House } from '../model/House';
import { ResourseType } from '../model/ResourseType';
import { User } from '../model/User';
import { GameOfThronesService } from '../services/game-of-thrones.service';
import { UserService } from '../services/user.service';
import { FuzzySearchUtil } from '../util/fuzzy.search.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loggedInUser: User;
  loggedInUserSubscription: Subscription;
  books: Book[] = [];
  houses: House[] = [];
  characters: Character[] = [];
  initBooks: Book[] = [];
  initHouses: House[] = [];
  initCharacters: Character[] = [];
  filters: Array<string> = [];

  constructor(
    private userService: UserService,
    private gotService: GameOfThronesService,
    private router: Router
  ) {
    this.loggedInUserSubscription = this.userService.loggedInUser.subscribe(
      (user) => (this.loggedInUser = user)
    );
  }

  ngOnInit(): void {
    this.loadAllResourses();
  }

  loadAllResourses() {
    forkJoin({
      books: this.gotService.getAllBooks(1),
      houses: this.gotService.getAllHouses(1),
      characters: this.gotService.getAllCharacters(1),
    }).subscribe(({ books, houses, characters }) => {
      this.books = books;
      this.houses = houses;
      this.characters = characters;
      this.initBooks = books;
      this.initHouses = houses;
      this.initCharacters = characters;
    });
  }

  isActiveFilter(filter: string) {
    this.filters.includes(filter) ? 'active' : '';
  }

  handleFilter(filter: string) {
    if (this.filters.includes(filter)) {
      this.filters = this.filters.filter((a) => {
        return a !== filter;
      });
    } else {
      this.filters.push(filter);
    }
  }

  search(text: string) {
    if (text) {
      forkJoin({
        books: new FuzzySearchUtil(
          ResourseType.Books,
          this.initBooks
        ).fuzzySearch(text),
        houses: new FuzzySearchUtil(
          ResourseType.Houses,
          this.initHouses
        ).fuzzySearch(text),
        characters: new FuzzySearchUtil(
          ResourseType.Characters,
          this.initCharacters
        ).fuzzySearch(text),
      }).subscribe(({ books, houses, characters }) => {
        this.books = books;
        this.houses = houses;
        this.characters = characters;
      });
    } else {
      this.books = this.initBooks;
      this.houses = this.initHouses;
      this.characters = this.initCharacters;
    }
  }

  handlePagination(navigateParam: any) {
    switch (navigateParam.resourseType) {
      case ResourseType.Books:
        this.handleBooksPagination(navigateParam.page);
        break;
      case ResourseType.Houses:
        this.handleHousesPagination(navigateParam.page);
        break;
      case ResourseType.Characters:
        this.handleCharactersPagination(navigateParam.page);
        break;
      default:
        break;
    }
  }

  handleBooksPagination(page: number) {
    this.gotService.getAllBooks(page).subscribe((data) => {
      this.books = data;
      this.initBooks = data;
    });
  }
  handleHousesPagination(page: number) {
    this.gotService.getAllHouses(page).subscribe((data) => {
      this.houses = data;
      this.initHouses = data;
    });
  }
  handleCharactersPagination(page: number) {
    this.gotService.getAllCharacters(page).subscribe((data) => {
      this.characters = data;
      this.initCharacters = data;
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
