import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Output() handleFilter = new EventEmitter<string>();
  @Input()
  filters:Array<string> = [];

  constructor() {}

  ngOnInit(): void {}

  clickFilter(filter: string) {
    this.handleFilter.emit(filter);
  }

  isActive(filter:string) {
    return this.filters.includes(filter) ? "active" : "not-active";
  }
}
