import { TestBed } from '@angular/core/testing';

import { GameOfThronesService } from './game-of-thrones.service';

describe('GameOfThronesService', () => {
  let service: GameOfThronesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameOfThronesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
