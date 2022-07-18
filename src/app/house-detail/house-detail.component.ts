import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { House } from '../model/House';
import { GameOfThronesService } from '../services/game-of-thrones.service';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.scss'],
})
export class HouseDetailComponent implements OnInit {
  house: House;

  constructor(
    private gotService: GameOfThronesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.gotService.getHouseDetail(id).subscribe((data) => {
      this.house = data;
    });
  }
}
