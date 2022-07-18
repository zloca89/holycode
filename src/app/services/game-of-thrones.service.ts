import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Book } from '../model/Book';
import { House } from '../model/House';
import { Character } from '../model/Character';
import { ResourseType } from '../model/ResourseType';

@Injectable({
  providedIn: 'root',
})
export class GameOfThronesService {
  public serviceUrl = 'https://www.anapioficeandfire.com/api/';

  constructor(private httpClient: HttpClient) {}

  public getAllBooks(page: number = 1) {
    return this.httpClient.get<Book[]>(`${this.serviceUrl}/books?page=${page}`);
  }

  public getAllHouses(page: number = 1) {
    return this.httpClient.get<House[]>(
      `${this.serviceUrl}/houses?page=${page}`
    );
  }

  public getAllCharacters(page: number = 1) {
    return this.httpClient.get<Character[]>(
      `${this.serviceUrl}/characters?page=${page}`
    );
  }

  public getBookDetail(bookId: string) {
    return this.httpClient.get<Book>(`${this.serviceUrl}/books/${bookId}`);
  }

  public getHouseDetail(houseId: string) {
    return this.httpClient.get<House>(`${this.serviceUrl}/houses/${houseId}`);
  }

  public getCharacterDetail(characterId: string) {
    return this.httpClient.get<Character>(
      `${this.serviceUrl}/characters/${characterId}`
    );
  }

  public getResourse(resourseType: ResourseType, page: number) {
    switch (resourseType) {
      case ResourseType.Books:
        this.getAllBooks(page);
        break;
      case ResourseType.Houses:
        this.getAllHouses(page);
        break;
      case ResourseType.Characters:
        this.getAllCharacters(page);
        break;
      default:
        break;
    }
  }
}
