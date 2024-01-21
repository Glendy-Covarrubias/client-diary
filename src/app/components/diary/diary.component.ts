import { Component, OnInit, ViewChild } from '@angular/core';
import { DiaryService } from 'src/app/services/diary.service';
import { TableComponent } from '../generals/table/table.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivityRegisterComponent } from 'src/app/components/activity-register/activity-register.component';
import { IDialog, defaultDialog } from 'src/app/interfaces/IDialog';
import { ToastrService } from 'ngx-toastr';
import { MESSAGES, TITLE_VIEW } from 'src/constants';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {

  @ViewChild('tableDiary')
  tableDiary!: TableComponent;

  configColumns = [
    { property: "id", name: "#" },
    { property: "name", name: "Name" },
    { property: "status", name: "Status" },
    { property: "description", name: "Description" },
    { property: "action", name: "Action", actions: ["action_update", "action_delete"] }
  ];

  constructor(
    private diaryService: DiaryService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getDiary();
  }

  private getDiary(): void {
    this.diaryService.getAllDiary().subscribe({
      next: (response: any) => {
        this.tableDiary.setDataColums(this.configColumns);
        this.tableDiary.setDataRows(response.data);
      },
      error: (error) => {
        console.log("PUBLICANDO ERROR: ", error);
        this.toastr.error(`${MESSAGES.ERROR} ERROR: ${error.message}`, "Error")
      }
    });
  }

  openDialog(dataDialog: IDialog = defaultDialog): void {
    const dialogRef = this.dialog.open(ActivityRegisterComponent, { data: dataDialog });
    dialogRef.afterClosed().subscribe(result => {
      this.getDiary();
    });
  }

  async deleteRecord(id: number): Promise<void> {
    this.diaryService.deleteRecord(id).subscribe({
      next: () => this.getDiary(),
      error: (error) => this.toastr.error(`${MESSAGES.ERROR} ERROR: ${error}`, "Error"),
      complete: () => this.toastr.success(MESSAGES.SUCCES("deleted"), "Succes")
    })
  }

  async openEditRecord(id: number): Promise<void> {
    this.diaryService.getRecord(id).subscribe({
      next: (response: any) => {
        let dataDialog: IDialog = { info: response, edit: true, title: TITLE_VIEW.ACTIVITY_EDIT };
        this.openDialog(dataDialog);
      },
      error: (error) => this.toastr.error(`${MESSAGES.ERROR} ERROR: ${error}`, "Error"),
      complete: () => this.toastr.info("You can start capturing the information update", "Info")
    })
  }
}