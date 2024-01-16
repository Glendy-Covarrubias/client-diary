import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DiaryService } from 'src/app/services/diary.service';
import { TableComponent } from '../generals/table/table.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivityRegisterComponent } from 'src/app/components/activity-register/activity-register.component';
import { IDialog, defaultDialog } from 'src/app/interfaces/IDialog';
import { DataDiary } from 'src/app/models/diary'

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {

  @ViewChild('tableDiary')
  tableDiary!: TableComponent;


  configColumns = [
    { property: "id", name: "No." },
    { property: "name", name: "Propietario" },
    { property: "status", name: "Estatus" },
    { property: "description", name: "Description" },
    { property: "action", name: "Action", actions: ["action_update", "action_delete"] }
  ];

  constructor(
    private diaryService: DiaryService, 
    public dialog: MatDialog
    //public activity: ActivityRegisterComponent
  ) { }

  ngOnInit(): void {
    this.getDiary();
  }

  private getDiary(): void {
    this.diaryService.getAllDiary().subscribe({
      next: (response: any) => {
        console.log("Response: ", response.data);
        //this.tableDiary.setDataColums(["id", "createdAt", "updatedAt", "name", "priority", "status", "description", "ownerId"]);
        this.tableDiary.setDataColums(this.configColumns);
        this.tableDiary.setDataRows(response.data);
      },
      error: (error) => {
        console.log("There was an error in retrieving data from the server", error);
      },
      complete: () => console.log('Observer got a complete notification'),
    });
  }

  
  
  openDialog(dataDialog: IDialog = defaultDialog): void {
   
    
    const dialogRef = this.dialog.open(ActivityRegisterComponent, { data: dataDialog})

    /*await dialogRef.afterOpened().subscribe({
      next: async () => {
        if(data.edit){
          //await this.activity.getRecordEdit(data);
          await this.activity.ngAfterContentInit(data);
        }
      },
      error: (error) => {
        console.log("There was an error in retrieving data from the server openEdit", error);
      },
      complete: () => console.log('Observer got a complete notification openEdit'),
    })*/
    

    dialogRef.afterClosed().subscribe(result => {
      this.getDiary();
    });
  }

  async deleteRecord(id: number): Promise<void> {
    console.log("REVISIÓN padre:", id)
    this.diaryService.deleteRecord(id).subscribe({
      next: (response: any) => {
        console.log("Response delete: ", response);
        this.getDiary();
      },
      error: (error) => {
        console.log("There was an error in retrieving data from the server delete", error);
      },
      complete: () => console.log('Observer got a complete notification delete'),
    })
  }

  async openEditRecord(id: number): Promise<void> {
    this.diaryService.getRecord(id).subscribe({
      next: (response: any) => {
        let dataDialog: IDialog = { info: response, edit: true };
        this.openDialog(dataDialog);
      },
      error: (error) => {
        console.log("There was an error in retrieving data from the server openEdit", error);
      },
      complete: () => console.log('Observer got a complete notification openEdit'),
    })
  }

}
