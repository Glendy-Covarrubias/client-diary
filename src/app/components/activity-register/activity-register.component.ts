import { Component, OnInit, ViewChild } from '@angular/core';
import { MyTel, TelInputComponent } from '../generals/tel-input/tel-input.component';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NgControl,
  Validators,
} from '@angular/forms';
import { Priority } from '../../interfaces/priority';
import { DiaryService } from 'src/app/services/diary.service';


@Component({
  selector: 'app-activity-register',
  templateUrl: './activity-register.component.html',
  styleUrls: ['./activity-register.component.css']
})
export class ActivityRegisterComponent implements OnInit {

  @ViewChild('telInput')
  telInput!: TelInputComponent;

  public activityForm: FormGroup;
  public closeModal: boolean = false;

  priorities: Priority[] = [
    {name: 'High', value: 1},
    {name: 'Half', value: 2},
    {name: 'low', value: 3}
  ];

  statues: Priority[] = [
    {name: 'Process', value: 1},
    {name: 'Stopped', value: 2},
    {name: 'Done', value: 3}
  ];

  // email: ['', [Validators.email, Validators.minLength(0), Validators.maxLength(100)]],
  //dateExpirationTodayPF: ['', []],
  constructor(private formBuilder: FormBuilder, private diaryService: DiaryService) {
    this.activityForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      status: ['', [Validators.required]],
      ownerId: [1,[]]
      //time: new FormControl('', Validators.required),
      //tel: new FormControl(new MyTel('', '', ''))
    });
  }

  ngOnInit(): void {
  }

  otherPhone: boolean = false;
  addOtherPhone(): void {
    this.otherPhone = !this.otherPhone;
  }

  save(): void {
    console.log("SAVE DATOS: ", this.activityForm.value);
    /*this.diaryService.createDiary(this.activityForm.value).subscribe({
      next: (v) => console.log(`SAVE RESPONSE NEXT:`, v),
      error: (e) => console.error(`SAVE RESPONSE ERROR:`, e),
      complete: () => {
        console.info(`SAVE RESPONSE COMPLETE`);
      }
    });*/
  }
}