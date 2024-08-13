import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-budget-dialog',
  template: `
    <h1 mat-dialog-title>Set Budgets</h1>
    <div mat-dialog-content>
      <div *ngFor="let item of data.items">
        <label>{{ item.name }}</label>
        <input type="number" [(ngModel)]="item.budget" placeholder="{{ item.budget }}" />
      </div>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button (click)="onSave()">Save</button>
    </div>
  `,
})
export class BudgetDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BudgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onSave(): void {
    this.dialogRef.close(this.data.items);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
