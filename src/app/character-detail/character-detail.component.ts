import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '../model/Character';
import { GameOfThronesService } from '../services/game-of-thrones.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {
  character: Character;
  constructor(
    private gotService: GameOfThronesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.gotService.getCharacterDetail(id).subscribe((data) => {
      this.character = data;
    });
  }
}
