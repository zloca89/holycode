import { ResourseType } from '../model/ResourseType';
import Fuse from 'fuse.js';
import { Observable, of } from 'rxjs';
import { BooksComponent } from '../books/books.component';
import { Book } from '../model/Book';


export class FuzzySearchUtil {
  resourseType: ResourseType;
  array: Array<ResourseType>;
  constructor(resourseType: ResourseType, array: Array<any>) {
    this.resourseType = resourseType;
    this.array = array;
  }
  keyByType = {
    Books: ['name', 'authors', 'numberOfPages', 'publisher', 'country', 'isbn'],
    Houses: [
      'name',
      'region',
      'coatOfArms',
      'words',
      'titles',
      'seats',
      'currentLord',
      'heir',
      'overlord',
      'founder',
      'ancestralWeapons',
      'swornMembers',
    ],
    Characters: [
      'name',
      'gender',
      'culture',
      'born',
      'died',
      'titles',
      'aliases',
      'father',
      'moter',
      'spouse',
      'allegiances',
      'tvSeries',
    ],
  };
  getSearchColumnsByType() {
    return this.keyByType[this.resourseType];
  }

  fuzzySearch(text: string): Observable<Array<any>> {
    let fuzzyArray: Array<any> = [];
    const fuse = new Fuse(this.array, {
      keys: this.getSearchColumnsByType(),
      threshold: 0.2,
      isCaseSensitive: false,
    });
    const fuzzySearch = fuse.search(text);
    fuzzySearch.filter((fuzzyEl) => {
      fuzzyArray.push(fuzzyEl.item);
    });
    let observables: Observable<Array<any>> = of(fuzzyArray);
    return observables;
  }
}
