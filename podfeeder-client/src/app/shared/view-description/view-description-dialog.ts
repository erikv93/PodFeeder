import { Component, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NgStyle } from "../../../../node_modules/@angular/common/common_module.d-NEF7UaHr";

@Component({
    selector: 'view-description-dialog',
    templateUrl: 'view-description-dialog.html',
    imports: [],
})
export class ViewDescriptionDialog {
    public description: string;
  constructor(
    public dialogRef: MatDialogRef<ViewDescriptionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
        this.description = data.description;
    }
}