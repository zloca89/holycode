import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/Book';
import { ResourseType } from '../model/ResourseType';
import { GameOfThronesService } from '../services/game-of-thrones.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  @Input()
  books: Book[] = [];
  @Input()
  filters: Array<string> = [];
  @Output() handlePagination = new EventEmitter<any>();

  page: number = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  isVisible() {
    return (
      this.books &&
      this.books.length > 0 &&
      (this.filters.includes(ResourseType.Books) || this.filters.length === 0)
    );
  }

  viewDetail(book: Book) {
    this.router.navigate([
      '/bookDetail',
      book.url.substring(book.url.lastIndexOf('/') + 1),
    ]);
  }

  getPage(page: number) {
    this.page = page;
    this.handlePagination.emit({
      resourseType: ResourseType.Books,
      page: page,
    });
  }
}
