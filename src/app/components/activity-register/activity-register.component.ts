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

@Component({
  selector: 'app-activity-register',
  templateUrl: './activity-register.component.html',
  styleUrls: ['./activity-register.component.css']
})
export class ActivityRegisterComponent implements OnInit {

  @ViewChild('telInput')
  telInput!: TelInputComponent;

  public activityForm: FormGroup;

  priorities: Priority[] = [
    {name: 'High', value: 1},
    {name: 'Half', value: 2},
    {name: 'low', value: 3}
  ];

  constructor(private formBuilder: FormBuilder) {
    this.activityForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      tel: new FormControl(new MyTel('', '', ''))
    });
  }

  ngOnInit(): void {
  }

  otherPhone: boolean = false;
  addOtherPhone(): void {
    this.otherPhone = !this.otherPhone;
  }

  save(): void {
    console.log("SAVE DATOS: ", this.activityForm);
  }

}