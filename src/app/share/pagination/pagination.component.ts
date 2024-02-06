import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PaginationComponent),
      multi: true,
    }
  ]
})
export class PaginationComponent  {

  @Input() currentPage = 1;
  @Input() recordCount : number = 0;
  @Input() itemsPerPage: number = 5;
  @Input() customMessage: string = '';
  @Output() pageChange = new EventEmitter();
  constructor() { }
  ngOnChanges() {  }

  ngOnInit() { }

  //itemsPerPage: number = 5; 

  pageChanged(event: any): void {
    this.currentPage = event;
    console.log('pageChanged ' ,event);
    this.pageChange.emit(this.currentPage);
  }

  calculateStartIndex(): number {
    return ((this.currentPage ?? 0) - 1) * this.itemsPerPage + 1;
  }

  calculateEndIndex(): number {
    return Math.min((this.currentPage??0) * this.itemsPerPage, (this.recordCount??0));
  }


  ControlValueAccessor(){}
  
 }
