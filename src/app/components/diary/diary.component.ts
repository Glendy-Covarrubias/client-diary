import { Component, OnInit, ViewChild } from '@angular/core';
import { DiaryService } from 'src/app/services/diary.service';
import { TableComponent } from '../generals/table/table.component';

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
  ];

  constructor(private diaryService: DiaryService) { }

  ngOnInit(): void {
    this.getDiary();
  }

  private getDiary(): void {
    this.diaryService.getAllDiary().subscribe({
      next: (response) => {
        console.log("Response: ", response);
        //this.tableDiary.setDataColums(["id", "createdAt", "updatedAt", "name", "priority", "status", "description", "ownerId"]);
        this.tableDiary.setDataColums(this.configColumns);
        this.tableDiary.setDataRows(response);
      },
      error: (error) => {
        console.log("There was an error in retrieving data from the server", error);
      },
      complete: () => console.log('Observer got a complete notification'),
    });
  }

}
