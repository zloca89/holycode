import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() search = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  clickEnter(event: any) {
    this.search.emit(event.target.value);
  }
}
