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

@Component({
  selector: 'app-activity-register',
  templateUrl: './activity-register.component.html',
  styleUrls: ['./activity-register.component.css']
})
export class ActivityRegisterComponent implements OnInit {

  @ViewChild('telInput')
  telInput!: TelInputComponent;

  public activityForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.activityForm = this.formBuilder.group({
      tel: new FormControl(new MyTel('', '', ''))
    });
  }

  ngOnInit(): void {
  }

}