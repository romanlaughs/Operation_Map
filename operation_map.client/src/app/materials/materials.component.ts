import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AccountingMaterial } from '../models/accounting-material.model';
import { SharedService } from '../shared.service'

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {
  materials: AccountingMaterial[] = [];
  userEmail: string = SharedService.getEmail();
  projectId: string = '';

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private materialService: ApiService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId') || '';
    if (this.projectId) {
      this.getMaterials();
    }
  }

  getMaterials() {
    this.materialService.getAccountingMaterials(this.userEmail, this.projectId).subscribe(
      (materials) => {
        this.materials = materials;
        console.log('Materials set:', this.materials);
        this.cd.detectChanges();
      },
      (error: any) => {
        console.error('Error fetching materials:', error);
      }
    );
  }

  addMaterial() {
    this.router.navigate(['/material-form', { userEmail: this.userEmail, projectId: this.projectId }]);
  }

  editMaterial(materialId: string) {
    this.router.navigate(['/material-form', { userEmail: this.userEmail, projectId: this.projectId, id: materialId }]);
  }

  deleteMaterial(materialId: string) {
    this.materialService.deleteAccountingMaterial(this.userEmail, this.projectId, materialId).subscribe(
      () => {
        this.materials = this.materials.filter(m => m.id !== materialId);
      },
      (error) => {
        console.error('Error deleting material:', error);
      }
    );
  }

  calculateTotal(material: AccountingMaterial): number {
    let total = material.price || 0;
    total += material.additionalOrder || 0;
    return total;
  }

  calculatePaymentsTotal(material: AccountingMaterial): number {
    if (!material.payments) return 0;
    return material.payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
  }
}
