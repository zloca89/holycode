import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '../model/Character';
import { ResourseType } from '../model/ResourseType';
import { GameOfThronesService } from '../services/game-of-thrones.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  @Input()
  characters: Character[] = [];
  @Input()
  filters: Array<string> = [];
  @Output() handlePagination = new EventEmitter<any>();
  currentPage: number = 1;

  constructor(
    private router: Router,
    private gotService: GameOfThronesService
  ) {}

  ngOnInit(): void {}

  isVisible() {
    return (
      this.characters &&
      this.characters.length > 0 &&
      (this.filters.includes('Characters') || this.filters.length === 0)
    );
  }

  viewDetail(character: Character) {
    this.router.navigate([
      '/characterDetail',
      character.url.substring(character.url.lastIndexOf('/') + 1),
    ]);
  }

  getPage(page: number) {
    this.currentPage = page;
    this.handlePagination.emit({
      resourseType: ResourseType.Characters,
      page: this.currentPage,
    });
  }
}
