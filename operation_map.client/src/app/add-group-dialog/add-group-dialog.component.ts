import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-add-group-dialog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.css']
})
export class AddGroupDialogComponent implements OnInit {
  groupForm: FormGroup;
  groupTypes: string[] = [
    'Architect',
    'Structural Engineer',
    'Civil Engineer',
    'Soil Engineer (Geotech)',
    'Environmental Engineer',
    'Surveyor',
    'Arborist',
    'Consultant'
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {
    this.groupForm = this.fb.group({
      groupName: ['', Validators.required],
      groupCity: [''],
      groupType: ['', Validators.required],
      newGroupType: ['']
    });
  }

  ngOnInit(): void { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAddGroup(): void {
    const formValue = this.groupForm.value;
    if (formValue.groupType === 'addNewType' && formValue.newGroupType) {
      this.groupTypes.push(formValue.newGroupType);
      formValue.groupType = formValue.newGroupType;
    }
    this.dialogRef.close(formValue);
  }

  onGroupTypeChange(event: any): void {
    if (event.value === 'addNewType') {
      this.openNewGroupTypeDialog();
    }
  }

  openNewGroupTypeDialog(): void {
    const newType = prompt('Enter new group type:');
    if (newType) {
      this.groupTypes.push(newType);
      this.groupForm.patchValue({ groupType: newType });
    }
  }
}
