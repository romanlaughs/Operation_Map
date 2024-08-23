import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Subcontractor } from '../../../shared/data/subcontractors/subcontractor';
import { SubcontractorGroup } from '../../../shared/data/subcontractors/subcontractorgroup';
import { SharedService } from '../../../shared.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  NgbModal,
  NgbModalRef,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Invoice } from '../../../shared/data/invoice/invoice';
import { FeathericonComponent } from '../../../shared/component/feathericon/feathericon.component';

@Component({
  selector: 'app-subcontractors',
  standalone: true,
  imports: [
    CommonModule,
    NgbNavModule,
    ReactiveFormsModule,
    FeathericonComponent,
    RouterModule,
  ],
  templateUrl: './subcontractors.component.html',
  styleUrls: ['./subcontractors.component.scss'],
})
export class SubcontractorsComponent implements OnInit {
  subcontractorForm: FormGroup; // Define the form group
  subcontractorId: string | null;
  subcontractors: Subcontractor[] = [];
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); // Array of letters A-Z
  hasClickedLetter: boolean = false; // Track if a letter has been clicked
  filteredSubcontractors: Subcontractor[] = []; // Subcontractors filtered by the selected letter
  selectedLetter: string = ''; // The currently selected letter
  subcontractorGroups: SubcontractorGroup[] = [];
  selectedSubcontractors: Set<string> = new Set();
  selectedSubcontractor: any;
  bidNumber: string[] = [];
  userEmail: string = SharedService.getEmail();
  currentModalRef: NgbModalRef; // Property to hold current modal reference
  modalRef: NgbModalRef | null = null; // Define modalRef property
  hasSubcontractors: { [key: string]: boolean } = {}; // Define hasSubcontractors with string keys

  constructor(
    private subcontractorService: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.subcontractorForm = this.fb.group({
      subcontractorId: [''],
      companyName: ['', Validators.required],
      contactName: ['', Validators.required],
      pdfUpload: [''],
      address: [''],
      contactPhoneNumber: [''],
      website: [''],
      contactEmail: ['', [Validators.required, Validators.email]],
      ubi: [''],
      license: [''],
      taxId: [''],
      other: [''],
      insuranceCompany: [''],
      insuranceAgent: [''],
      insurancePhone: [''],
      insuranceEmail: [''],
      additionalInsured: [false],
      certificatePDFURL: [''],
      additionalInsurancePDFURL: [''],
    });
  }

  ngOnInit(): void {
    this.getSubcontractors();
    this.getSubcontractorGroups();
    this.subcontractorId = this.route.snapshot.paramMap.get('id');

    if (this.subcontractorId) {
      this.subcontractorService
        .getSubcontractorById(this.userEmail, this.subcontractorId)
        .subscribe((subcontractor) => {
          if (subcontractor) {
            this.subcontractorForm.patchValue(subcontractor);
          }
        });
    }
  }

  // Method to open modal with subcontractor
  openModal(subcontractor: Subcontractor, content: any) {
    this.subcontractorId = subcontractor.id; // Set the subcontractorId
    this.subcontractorForm.patchValue(subcontractor); // Populate form with subcontractor data
    this.modalRef = this.modalService.open(content); // Store the modal reference

    this.modalRef.result.then(
      (result) => {
        console.log('Modal closed with result:', result);
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
      }
    );
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.dismiss('Cross click');
      this.modalRef = null; // Clear reference after closing
    } else {
      console.error('Modal reference is not set.');
    }
  }

  onSubmit(subcontractorId: string, modalRef: NgbModalRef | null): void {
    if (this.subcontractorForm.valid) {
      this.subcontractorService
        .updateSubcontractor(
          this.userEmail,
          subcontractorId,
          this.subcontractorForm.value
        )
        .subscribe(
          () => {
            // Refresh the page by navigating to the same route
            window.location.reload(); // Refresh the page
            if (modalRef) {
              modalRef.dismiss(); // Close the modal
            }
          },
          (error) => {
            console.error('Error updating subcontractor:', error);
          }
        );
    } else {
      this.alertInvalidForm();
      console.log('Form is invalid');
    }
  }

  navigateAfterSubmit(): void {
    this.router.navigate(['/subcontractors-list']);
  }

  alertInvalidForm() {
    const invalidControls = [];
    const controls = this.subcontractorForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalidControls.push(name);
      }
    }
    alert(`The following fields are required: ${invalidControls.join(', ')}`);
  }

  getSubcontractors() {
    this.subcontractorService.getSubcontractors(this.userEmail).subscribe(
      (subcontractors) => {
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

  initializeHasSubcontractors() {
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
    // Additional logic can be added here, e.g., routing to a details page
  }

  getSubcontractorGroups() {
    this.subcontractorService.getSubcontractorGroups(this.userEmail).subscribe(
      (groups: SubcontractorGroup[]) => {
        this.subcontractorGroups = groups;
      },
      (error: any) => {
        console.error('Error fetching subcontractor groups:', error);
      }
    );
  }

  addSubcontractor() {
    this.router.navigate(['/subcontractors-create', { status: 1 }]);
  }

  // Method to delete a subcontractor and close the modal
  deleteSubcontractor(subcontractorId: string, modalRef: NgbModalRef) {
    this.subcontractorService
      .deleteSubcontractor(this.userEmail, subcontractorId)
      .subscribe(
        () => {
          this.subcontractors = this.subcontractors.filter(
            (s) => s.id !== subcontractorId
          );
          window.location.reload(); // Refresh the page
          this.navigateAfterSubmit();
          if (this.modalRef) {
            this.modalRef.dismiss('Cross click');
            this.modalRef = null; // Clear reference after closing
          } else {
            console.error('Modal reference is not set.');
          }
        },
        (error) => {
          console.error('Error deleting subcontractor:', error);
        }
      );
  }

  addToGroup() {
    const subcontractorIds = Array.from(this.selectedSubcontractors);
    if (subcontractorIds.length === 0) {
      console.error('No subcontractors selected.');
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px'; // Adjust width as necessary
    dialogConfig.autoFocus = true;
    dialogConfig.position = { top: '0px', left: '33%' }; // Adjust as needed
  }
}
