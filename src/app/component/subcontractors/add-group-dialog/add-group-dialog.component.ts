import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FeathericonComponent } from '../../../shared/component/feathericon/feathericon.component';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';

@Component({
  selector: 'app-add-group-dialog',
  standalone: true,
  imports: [
    CommonModule,
    NgbNavModule,
    ReactiveFormsModule,
    FeathericonComponent,
  ],
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.scss'],
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
    'Consultant',
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
      newGroupType: [''],
    });
  }

  ngOnInit(): void {}

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
