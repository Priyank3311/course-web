import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogActions,MatDialogContent } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-warning-dialog',
  imports: [MatDialogActions,MatDialogContent],
  templateUrl: './warning-dialog.html',
  styleUrl: './warning-dialog.scss'
})
export class WarningDialog {
  constructor(
    public dialogRef: MatDialogRef<WarningDialog>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'warning',
      this.sanitizer.bypassSecurityTrustResourceUrl('./assets/images/warning-icon.svg')
    );
  }
}
