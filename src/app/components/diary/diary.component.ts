import { Component, OnInit } from '@angular/core';
import { DiaryService } from 'src/app/services/diary.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {

  constructor(private diaryService: DiaryService) { }

  ngOnInit(): void {
    console.log("Hola Amigos");
    this.getDiary();
  }

  private async getDiary(): Promise<void> {
    try {
      const data = await this.diaryService.getAllDiary().toPromise();
      console.log(data);
    } catch (error : any) {
      console.log("HEY");
      console.log(error);
    }
  }

}
