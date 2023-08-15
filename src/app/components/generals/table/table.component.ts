import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Diary } from 'src/app/models/diary';
import {MatPaginator} from '@angular/material/paginator';

export interface ColumsElement {
  property: string;
  name: string;
  actions: []
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Output() saveDelete: EventEmitter<number> = new EventEmitter<number>();
  
  dataSourceColums: ColumsElement[] = [];
  columnsToDisplay: string[] = this.dataSourceColums.map(x => x.property);
  dataSource: Diary[] = [];

  constructor() { }

  ngOnInit() {
  }

  async setDataColums(dataColums: any): Promise<void> {
    console.log("Response Componete A: ", dataColums);
    this.dataSourceColums = dataColums;
    this.columnsToDisplay = this.dataSourceColums.map(x => x.property);
    console.log("Response Componete: ", this.dataSourceColums)
  }

  async setDataRows(dataRows: any): Promise<void> {
    this.dataSource = dataRows;
  }

  deleteRecord(id: number) {
    console.log("Se eliminar el numero de registro hijo: ", id);
    this.saveDelete.emit(id);
  }
}