import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Diary } from 'src/app/models/diary';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { IDialog } from 'src/app/interfaces/IDialog';

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
//OnInit
//implements AfterViewInit
export class TableComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @Output() saveDelete: EventEmitter<number> = new EventEmitter<number>();
  @Output() openEdit: EventEmitter<number> = new EventEmitter<number>();

  dataSourceColums: ColumsElement[] = [];
  columnsToDisplay: string[] = this.dataSourceColums.map(x => x.property);
  //dataSource: Diary[] = [];

  //dataSource = new MatTableDataSource<Diary>(ELEMENT_DATA);
  dataSource: any;

  constructor(public dialog: MatDialog) { }

  /*ngOnInit() {
  }*/

  /*gAfterViewInit() {
  }*/

  async setDataColums(dataColums: any): Promise<void> {
    console.log("Response Componete A: ", dataColums);
    this.dataSourceColums = dataColums;
    this.columnsToDisplay = this.dataSourceColums.map(x => x.property);
    console.log("Response Componete: ", this.dataSourceColums)
  }

  async setDataRows(dataRows: any): Promise<void> {
    //this.dataSource = dataRows;
    this.dataSource = new MatTableDataSource<Diary>(dataRows);
    this.dataSource.paginator = this.paginator;
  }

  confirmDeleteRecord(id: number) {
    let dataDialog: IDialog = { info: { id: id }, title: "Are you sure you want to delete this record?" };
    let processConfirm = this.dialog.open(ModalComponent, {
      data: {
        distribution: "modal-center",
        icon: "warning",
        iconColor: "warn-yellow",
        message: "<label>Esta operación es irreversible</label>",
        dataDialog,
        buttonText: {
          confirm: 'Delete',
          cancel: 'Cancel'
        }
      }
    });

    processConfirm.beforeClosed().subscribe(() => {
      console.log("PADRE FLUJO: ", processConfirm.componentInstance.result)
      if(processConfirm.componentInstance.result){
        this.deleteRecord(id);
      }
    });
    
  }

  deleteRecord(id: number) {
    console.log("Se eliminar el numero de registro hijo: ", id);
    
    this.saveDelete.emit(id);
  }

  editRecord(id: number) {
    //console.log("ACTION DE EDITAR el numero de registro hijo: ", id);
    this.openEdit.emit(id);
  }
}