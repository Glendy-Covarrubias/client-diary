import { Component, Inject, Injectable, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MyTel, TelInputComponent } from '../generals/tel-input/tel-input.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Priority } from '../../interfaces/priority';
import { DiaryService } from 'src/app/services/diary.service';
import { IDialog, defaultDialog } from 'src/app/interfaces/IDialog';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-activity-register',
  templateUrl: './activity-register.component.html',
  styleUrls: ['./activity-register.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class ActivityRegisterComponent {

  @ViewChild('telInput')
  telInput!: TelInputComponent;

  public activityForm: FormGroup;
  public closeModal: boolean = false;

  priorities: Priority[] = [
    { name: 'High', value: 1 },
    { name: 'Half', value: 2 },
    { name: 'low', value: 3 }
  ];

  statues: Priority[] = [
    { name: 'Process', value: 1 },
    { name: 'Stopped', value: 2 },
    { name: 'Done', value: 3 }
  ];

  // email: ['', [Validators.email, Validators.minLength(0), Validators.maxLength(100)]],
  //dateExpirationTodayPF: ['', []],
  constructor(
    private formBuilder: FormBuilder,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataD: any,
    private diaryService: DiaryService,
    private toastr: ToastrService
  ) {
    this.activityForm = this.formBuilder.group({
      id: [null, []],
      name: ['g', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      status: ['', [Validators.required]],
      ownerId: [1, []]
      //time: new FormControl('', Validators.required),
      //tel: new FormControl(new MyTel('', '', ''))
    });

    if (dataD.edit) {
      if (dataD.info.data !== null) {
        this.getRecordEdit(dataD);
      }
    }
  }

  otherPhone: boolean = false;
  addOtherPhone(): void {
    this.otherPhone = !this.otherPhone;
  }

  save(): void {
    if (!this.activityForm.invalid) {
      if (this.activityForm.controls['id'].value === null) {
        this.diaryService.createDiary(this.activityForm.value).subscribe({
          next: (n: any) => {
            console.log(`SAVE RESPONSE NEXT:`, n);
            this.toastr.success(`Record ${n.data.name} create on ${new Date(n.data.createdAt).toLocaleString()}`, n.message.toUpperCase());
          },
          error: (e) => {
            console.error(`SAVE RESPONSE ERROR:`, e);
            this.toastr.error("An error has been detected, please try again later", e.message.toUpperCase());
          },
          complete: () => {
            console.info(`SAVE RESPONSE COMPLETE`);
            this._dialog.closeAll();
          }
        });
      } else {
        this.diaryService.editDiary(this.activityForm.value).subscribe({
          next: (n: any) => {
            console.log("SAVE RESPONSE NEXT EDIT: ", n);
            this.toastr.success(`Record ${n.data.name} updated on ${new Date(n.data.updatedAt).toLocaleString()}`, n.message.toUpperCase());
          },
          error: (e) => {
            console.error("SAVE RESPONSE ERROR EDIT: ", e);
            this.toastr.error("An error has been detected, please try again later", e.message.toUpperCase());
          },
          complete: () => {
            console.info("SAVE RESPONSE COMPLETE EDIT");
            this._dialog.closeAll();
          }
        })
      }
    }
  }

  async getRecordEdit(dataDialogH: IDialog = defaultDialog): Promise<void> {
    let infoDataDialog = dataDialogH.info.data;
    let viewDataEdit = {
      id: infoDataDialog.id,
      name: infoDataDialog.name,
      description: infoDataDialog.description,
      priority: this.priorities.find(x => x.value === infoDataDialog.priority)?.value,
      status: infoDataDialog.status,
      ownerId: infoDataDialog.ownerId
    }
    this.activityForm.setValue(viewDataEdit);
  }
}