import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DiaryService } from 'src/app/services/diary.service';
import { TableComponent } from '../generals/table/table.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivityRegisterComponent } from 'src/app/components/activity-register/activity-register.component';

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

  constructor(private diaryService: DiaryService, public dialog: MatDialog) { }

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

  openDialog(): void {
    const dialogRef = this.dialog.open(ActivityRegisterComponent);
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
    console.log("REVISIÓN padre EDIT:", id);
    this.diaryService.getRecord(id).subscribe({
      next: (response: any) => {
        console.log("Response openEdit: ", response);
        this.openDialog();
      },
      error: (error) => {
        console.log("There was an error in retrieving data from the server openEdit", error);
      },
      complete: () => console.log('Observer got a complete notification openEdit'),
    })
  }

}
