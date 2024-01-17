import { Component, Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IPriority, catPriority } from 'src/app/interfaces/IPriority'
import { IStatus, catStatus } from 'src/app/interfaces/IStatus';
import { IDialog, defaultDialog } from 'src/app/interfaces/IDialog';
import { DiaryService } from 'src/app/services/diary.service';
import { TITLE_VIEW, MESSAGES } from "src/constants";

@Component({
  selector: 'app-activity-register',
  templateUrl: './activity-register.component.html',
  styleUrls: ['./activity-register.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class ActivityRegisterComponent {
  public activityForm: FormGroup;
  public closeModal: boolean = false;
  public titleViewActivity: string = TITLE_VIEW.ACTIVITY_ADD;

  priorities: IPriority[] = catPriority;
  statues: IStatus[] = catStatus;

  constructor(
    private formBuilder: FormBuilder,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataD: any,
    private diaryService: DiaryService,
    private toastr: ToastrService
  ) {
    this.activityForm = this.formBuilder.group({
      id: [null, []],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      status: ['', [Validators.required]],
      ownerId: [1, []]
    });

    if (dataD.edit) {
      if (dataD.info.data !== null) {
        this.getRecordEdit(dataD);
      }
    }
  }

  save(): void {
    if (!this.activityForm.invalid) {
      if (this.activityForm.controls['id'].value === null) {
        this.diaryService.createDiary(this.activityForm.value).subscribe({
          next: (response: any) => {
            this._dialog.closeAll();
            this.toastr.info(`Record ${response.data.name} create on ${new Date(response.data.createdAt).toLocaleString()}`, "Info");
          },
          error: (e) => this.toastr.error(`${MESSAGES.ERROR} ERROR: ${e}`, "Error"),
          complete: () => this.toastr.success(MESSAGES.SUCCES("create"), "Succes")
        });
      } else {
        this.diaryService.editDiary(this.activityForm.value).subscribe({
          next: (response: any) => {
            this._dialog.closeAll();
            this.toastr.info(`Record ${response.data.name} updated on ${new Date(response.data.createdAt).toLocaleString()}`, "Info");
          },
          error: (e) => this.toastr.error(`${MESSAGES.ERROR} ERROR: ${e}`, "Error"),
          complete: () => this.toastr.success(MESSAGES.SUCCES("edit"), "Succes")
        })
      }
    }
  }

  async getRecordEdit(dataDialogH: IDialog = defaultDialog): Promise<void> {
    if (dataDialogH.title) {
      this.titleViewActivity = dataDialogH.title;
    }
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