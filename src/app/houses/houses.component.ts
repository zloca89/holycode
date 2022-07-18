import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { House } from '../model/House';
import { ResourseType } from '../model/ResourseType';
import { GameOfThronesService } from '../services/game-of-thrones.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss'],
})
export class HousesComponent implements OnInit {
  @Input()
  houses: House[] = [];
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
      this.houses &&
      this.houses.length > 0 &&
      (this.filters.includes('Houses') || this.filters.length === 0)
    );
  }

  viewDetail(house: House) {
    this.router.navigate([
      '/houseDetail',
      house.url.substring(house.url.lastIndexOf('/') + 1),
    ]);
  }

  getPage(page: number) {
    this.currentPage = page;
    this.handlePagination.emit({
      resourseType: ResourseType.Houses,
      page: page,
    });
  }
}
