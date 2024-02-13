import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  distribution?: any;
  icon?: any;
  iconColor?: any = "#FB8C00";
  title?: string = "";
  message: string = ""
  confirmButtonText = "Confirm"
  cancelButtonText = "Cancel"
  dataBuild?: any;
  result?: any = false;
  distributionButtons?: any = "center";

  //@Output() saveConfirm: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<ModalComponent>) {
      console.log("MODAL: ", data)
    if (data) {
      this.dataBuild = data.dataDialog;
      this.distributionButtons = data.distributionButtons || this.distributionButtons;
      this.distribution = `mat-dialog-body ${data.distribution}` || `mat-dialog-body ${this.distribution}`;
      this.icon = data.icon || this.icon;
      this.iconColor = `icon-modal-table ${data.iconColor}` || `icon-modal-table ${this.iconColor}`;
      this.title = data.dataDialog.title || this.title;
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        this.confirmButtonText = data.buttonText.confirm || this.confirmButtonText;
      }
    }
    //this.dialogRef.updateSize('300vw', '300vw')
  }

  ngOnInit(): void {
  }

  confirm(): void {
    console.log("confirmar eliminar: ", this.dialogRef);
    this.dialogRef.componentInstance.result = true;
    //return this.dataBuild;
    //this.saveConfirm.emit(true);
  }

}
