import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  MatDialogModule,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { ApiService } from '../../../api.service';
import { Subcontractor } from '../../../shared/data/project/subcontractors';
import { SharedService } from '../../../shared.service';
import { FeathericonComponent } from '../../../shared/component/feathericon/feathericon.component';
import { SubcontractorsDialogComponent } from '../../subcontractors/subcontractors-dialog/subcontractors-dialog.component';

@Component({
  selector: 'app-subcontractors',
  standalone: true,
  imports: [
    CommonModule,
    FeathericonComponent,
    MatDialogModule,
    RouterModule,
    SubcontractorsDialogComponent,
  ],
  templateUrl: './subcontractors.component.html',
  styleUrls: ['./subcontractors.component.scss'],
})
export class SubcontractorsComponent implements OnInit {
  subcontractorId: string | null;
  subcontractors: Subcontractor[] = [];
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); // Array of letters A-Z
  hasClickedLetter: boolean = false; // Track if a letter has been clicked
  filteredSubcontractors: Subcontractor[] = []; // Subcontractors filtered by the selected letter
  selectedLetter: string = ''; // The currently selected letter
  selectedSubcontractors: Set<string> = new Set();
  selectedSubcontractor: any;
  bidNumber: string[] = [];
  userEmail: string = SharedService.getEmail();
  hasSubcontractors: { [key: string]: boolean } = {}; // Define hasSubcontractors with string keys

  constructor(
    private subcontractorService: ApiService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSubcontractors();
  }

  openDialog(subcontractorId: string): void {
    console.log('Opening dialog for subcontractorId:', subcontractorId); // Debug log

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      subcontractorId: subcontractorId,
    };

    const dialogRef = this.dialog.open(
      SubcontractorsDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog result:', result);
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Refresh the page after the dialog is closed
      window.location.reload();
    });
  }

  getSubcontractors(): void {
    this.subcontractorService.getSubcontractors(this.userEmail).subscribe(
      (subcontractors) => {
        console.log('Subcontractors fetched:', subcontractors); // Add this line
        this.subcontractors = subcontractors;
        this.initializeHasSubcontractors(); // Initialize the hasSubcontractors object
        this.cd.detectChanges();
        this.bidNumber = this.subcontractors.map((subcontractor, index) => {
          if (!subcontractor || subcontractor.bids === undefined) {
            console.log(
              `Subcontractor ${index} does not have bids property, setting bidNumber to 0.`
            );
            return '0';
          } else {
            console.log(
              `Subcontractor ${index} bids set to ${subcontractor.bids}`
            );
            return subcontractor.bids.toString();
          }
        });
      },
      (error: any) => {
        console.error('Error fetching subcontractors:', error);
      }
    );
  }

  initializeHasSubcontractors(): void {
    this.alphabet.forEach((letter) => {
      this.hasSubcontractors[letter] = this.subcontractors.some(
        (subcontractor) => subcontractor.companyName?.startsWith(letter)
      );
    });
  }

  filterByLetter(letter: string): void {
    this.selectedLetter = letter;
    this.filteredSubcontractors = this.subcontractors.filter((subcontractor) =>
      subcontractor.companyName?.startsWith(letter)
    );
    this.hasClickedLetter = true;
  }

  selectSubcontractor(subcontractor: Subcontractor): void {
    this.selectedSubcontractor = subcontractor;
  }

  bulkDeleteSubcontractors() {
    const subcontractorIds = Array.from(this.selectedSubcontractors);
    this.subcontractorService
      .bulkDeleteSubcontractors(this.userEmail, subcontractorIds)
      .subscribe(
        () => {
          this.subcontractors = this.subcontractors.filter(
            (s) => !this.selectedSubcontractors.has(s.id!)
          );
          this.selectedSubcontractors.clear();
          window.location.reload();
        },
        (error) => {
          console.error('Error bulk deleting subcontractors:', error);
        }
      );
  }

  toggleSubcontractorSelection(subcontractorId: string) {
    if (this.selectedSubcontractors.has(subcontractorId)) {
      this.selectedSubcontractors.delete(subcontractorId);
    } else {
      this.selectedSubcontractors.add(subcontractorId);
    }
  }
}
