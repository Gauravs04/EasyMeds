// import { CommonModule } from "@angular/common";
// import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
// import { FormsModule } from "@angular/forms";
// import { ApiService } from "../../services/api.service";
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { CategoryDto } from "../../models/user.model";

// @Component({
//   selector: 'app-manage-drugs',
//   imports: [CommonModule, FormsModule],
//   standalone: true,
//   templateUrl: './inventory.component.html',
//   styleUrl: './inventory.component.css'
// })
// export class ManageDrugsComponent implements OnInit, OnChanges {
//   @Input() searchQuery: string = '';

//   allDrugs: any[] = [];  // ⬅️ Store all drugs fetched from backend
//   drugs: any[] = [];     // ⬅️ This will be the filtered list
//   categories: CategoryDto[] = [];
//   totalCount: number = 0;
//   showAddForm = false;
//   editMode = false;
//   editingDrugId: string | null = null;

//   newDrug: any = {
//     name: '',
//     stock: undefined,
//     description: '',
//     price: undefined,
//     drugExpiry: null,
//     categoryId:null,
//     SupplierId:''
//   };
//   SupplierId: string | null ='';
//   num:string='';

//   constructor(
//     private apiService: ApiService,
//     private snackBar: MatSnackBar
//   ) {}


//   ngOnInit(): void {
//     this.fetchDrugs(); // Get all drugs initially
//     this.getCategories();
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['searchQuery'] && !changes['searchQuery'].firstChange) {
//       this.applyFrontendFilter();
//     }
//   }
  
//   getCategories(): void {
//     this.apiService.getCategories().subscribe({
//       next: (categories) => {
//         this.categories = categories;
//       },
//       error: (err) => {
//         console.error('Error fetching categories:', err);
//         this.snackBar.open('Failed to load categories', 'Close', { duration: 3000 });
//       }
//     });
//   }

//   getCategoryName(categoryId: string): string {
//     const category = this.categories.find(c => c.categoryId === categoryId);
//     return category ? category.categoryName : 'Uncategorized';
//   }


//   // ✅ Fetch once
//   fetchDrugs(): void {
//     this.apiService.getAllDrugs().subscribe({
//       next: response => {
//         this.allDrugs = response;
//         this.applyFrontendFilter();
//       },
//       error: err => {
//         console.error('Error fetching drugs:', err);
//       }
//     });
//   }

//   // ✅ Local filtering using searchQuery
//   applyFrontendFilter(): void {
//     const term = this.searchQuery.toLowerCase().trim();
//     if (!term) {
//       this.drugs = [...this.allDrugs];
//     } else {
//       this.drugs = this.allDrugs.filter(drug =>
//         drug.name.toLowerCase().includes(term)
//       );
//     }
//     this.totalCount = this.drugs.length;
//   }

//   addDrug(): void {
    
//     const userId = this.apiService.someMethod();
//     this.newDrug.SupplierId = userId;
//     if (!this.newDrug.name || !this.newDrug.price || this.newDrug.stock==undefined || this.newDrug.stock==0 || !this.newDrug.categoryId || !this.newDrug.SupplierId || !this.newDrug.drugExpiry) {
//       this.snackBar.open('Please fill in all required fields.', 'Close', { duration: 3000 });
//       return;
//     }

//     this.apiService.addDrug(this.newDrug).subscribe({
//       next: (response) => {
//         // console.log(response);
//         this.snackBar.open('Drug added successfully!', 'Close', { duration: 3000 });
//         this.fetchDrugs();
//         this.newDrug = { name: '', description: '', price: 0 ,stock:0,drugExpiry:null,categoryId: null};
//         this.showAddForm = false;
//         const drugobj: any={
//           drugId: response.result.drugId,
//           name: response.result.name,
//           description: response.result.description,
//           stock: response.result.stock,
//           drugExpiry: response.result.drugExpiry,
//           price: response.result.price,
//           categoryId: response.result.categoryId,
//           supplierId: response.result.supplierId
//         };
//         this.apiService.addDrugInInventory(drugobj).subscribe();
//       },
//       error: err => {
//         console.error('Add drug failed:', err);
//         this.snackBar.open('Failed to add drug.', 'Close', { duration: 3000 });
//       }
//     });
//   }

//   editDrug(drug: any): void {
//     // console.log(drug);
//     this.SupplierId = this.apiService.someMethod();
//     // this.newDrug.userId = userId;
//     this.newDrug = {
//       drugId:drug.drugId,
//       name: drug.name,
//       description: drug.description,
//       price: drug.price,
//       stock: drug.stock,
//       drugExpiry:drug.drugExpiry,
//       categoryId:drug.categoryId,
//       SupplierId:this.SupplierId
//     };
//     this.editMode = true;
//     this.editingDrugId = drug.drugId;
//     this.showAddForm = true;
//   }

//   updateDrug(): void {
//     if (!this.editingDrugId) return;
//     let drug=this.newDrug;
//     // console.log(drug);
//     this.apiService.updateDrug(drug).subscribe({
//       next: () => {
//         this.snackBar.open('Drug updated successfully!', 'Close', { duration: 3000 });
//         this.fetchDrugs();
//         this.cancelForm();
        
//         this.apiService.updateDrugInInventory(drug).subscribe();
//       },
//       error: err => {
//         console.error('Update failed:', err);
//         this.snackBar.open('Failed to update drug.', 'Close', { duration: 3000 });
//       }
//     });
//   }

//   deleteDrug(id: string): void {
//     if (confirm('Are you sure you want to delete this drug?')) {
//       this.apiService.deleteDrug(id).subscribe({
//         next: () => {
//           this.snackBar.open('Drug deleted.', 'Close', { duration: 3000 });
//           this.allDrugs = this.allDrugs.filter(d => d.drugId !== id);
//           this.applyFrontendFilter(); // Reapply filter after deletion
//         },
//         error: err => {
//           console.error('Delete failed:', err);
//         }
//       });
//     }
//   }

//   cancelForm(): void {
//     this.showAddForm = false;
//     this.editMode = false;
//     this.editingDrugId = null;
//     this.newDrug = { name: '', description: '', price: null,stock:null,drugExpiry:null,categoryId: null,SupplierId:''};
//   }

  
// }

import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryDto } from "../../models/user.model";
import { MatIconModule } from '@angular/material/icon';
import { DrugService } from "../../services/drug.service";

@Component({
  selector: 'app-manage-drugs',
  imports: [CommonModule, FormsModule, MatIconModule],
  standalone: true,
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class ManageDrugsComponent implements OnInit, OnChanges {
  @Input() searchQuery: string = '';

  allDrugs: any[] = [];  // Store all drugs fetched from backend
  drugs: any[] = [];     // This will be the filtered list
  categories: CategoryDto[] = [];
  totalCount: number = 0;
  showAddForm = false;
  editMode = false;
  editingDrugId: string | null = null;

  newDrug: any = {
    name: '',
    stock: undefined,
    description: '',
    price: undefined,
    drugExpiry: null,
    categoryId: null,
    SupplierId: ''
  };
  // SupplierId: string | null = '';
  num: string = '';

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private drugservice: DrugService
  ) {}

  ngOnInit(): void {
    this.fetchDrugs(); // Get all drugs initially
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery'] && !changes['searchQuery'].firstChange) {
      this.applyFrontendFilter();
    }
  }
  
  getCategories(): void {
    this.drugservice.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.snackBar.open('Failed to load categories', 'Close', { 
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.categoryId === categoryId);
    return category ? category.categoryName : 'Uncategorized';
  }

  isExpiringSoon(expiryDate: Date): boolean {
    if (!expiryDate) return false;
    
    const expiry = new Date(expiryDate);
    const today = new Date();
    
    // Calculate difference in days
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    
    // Return true if expiry is within 30 days
    return diffDays >= 0 && diffDays <= 30;
  }

  // Fetch once
  fetchDrugs(): void {
    this.drugservice.fetchDrugs().subscribe({
      next: response => {
        this.allDrugs = response;
        this.applyFrontendFilter();
      },
      error: err => {
        console.error('Error fetching drugs:', err);
        this.snackBar.open('Error loading inventory data. Please try again.', 'Close', {
          duration: 4000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  // Local filtering using searchQuery
  applyFrontendFilter(): void {
    const term = this.searchQuery?.toLowerCase().trim() || '';
    if (!term) {
      this.drugs = [...this.allDrugs];
    } else {
      this.drugs = this.allDrugs.filter(drug =>
        drug.name.toLowerCase().includes(term) || 
        (drug.description && drug.description.toLowerCase().includes(term)) ||
        (this.getCategoryName(drug.categoryId).toLowerCase().includes(term))
      );
    }
    this.totalCount = this.drugs.length;
  }

  addDrug(): void {
    const userId = this.apiService.someMethod();
    this.newDrug.SupplierId = userId;
    
    if (!this.newDrug.name || !this.newDrug.price || this.newDrug.stock == undefined || 
        this.newDrug.stock == 0 || !this.newDrug.categoryId || 
        !this.newDrug.SupplierId || !this.newDrug.drugExpiry) {
      this.snackBar.open('Please fill in all required fields.', 'Close', { 
        duration: 3000,
        panelClass: ['warning-snackbar']
      });
      return;
    }

    this.drugservice.addDrug(this.newDrug).subscribe({
      next: (response) => {
        this.snackBar.open('Medication added successfully!', 'Close', { 
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.fetchDrugs();
        this.newDrug = { 
          name: '', 
          description: '', 
          price: null, 
          stock: null, 
          drugExpiry: null, 
          categoryId: null,
          SupplierId: ''
        };
        this.showAddForm = false;
        
        const drugobj: any = {
          drugId: response.result.drugId,
          name: response.result.name,
          description: response.result.description,
          stock: response.result.stock,
          drugExpiry: response.result.drugExpiry,
          price: response.result.price,
          categoryId: response.result.categoryId,
          supplierId: response.result.supplierId
        };
        this.drugservice.addDrugInInventory(drugobj).subscribe();
      },
      error: err => {
        console.error('Add drug failed:', err);
        this.snackBar.open('Failed to add medication.', 'Close', { 
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  editDrug(drug: any): void {
    // this.SupplierId = this.apiService.someMethod();
    this.newDrug = {
      drugId: drug.drugId,
      name: drug.name,
      description: drug.description,
      price: drug.price,
      stock: drug.stock,
      drugExpiry: drug.drugExpiry,
      categoryId: drug.categoryId,
      SupplierId: drug.SupplierId
    };
    this.editMode = true;
    this.editingDrugId = drug.drugId;
    this.showAddForm = true;
    
    // Scroll to form
    setTimeout(() => {
      document.querySelector('.form-box')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  updateDrug(): void {
    if (!this.editingDrugId) return;
    let drug = this.newDrug;
    
    this.drugservice.updateDrug(drug).subscribe({
      next: () => {
        this.snackBar.open('Medication updated successfully!', 'Close', { 
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.fetchDrugs();
        this.cancelForm();
        
        this.drugservice.updateDrugInInventory(drug).subscribe();
      },
      error: err => {
        console.error('Update failed:', err);
        this.snackBar.open('Failed to update medication.', 'Close', { 
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  deleteDrug(id: string): any {
    if (confirm('Are you sure you want to delete this medication?')) {
      this.drugservice.deleteDrug(id).subscribe({
        next: () => {
          this.snackBar.open('Medication deleted successfully.', 'Close', { 
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.allDrugs = this.allDrugs.filter(d => d.drugId !== id);
          this.applyFrontendFilter(); // Reapply filter after deletion
        },
        error: (err: any) => {
          console.error('Delete failed:', err);
          this.snackBar.open('Failed to delete medication.', 'Close', { 
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  cancelForm(): void {
    this.showAddForm = false;
    this.editMode = false;
    this.editingDrugId = null;
    this.newDrug = { 
      name: '', 
      description: '', 
      price: null, 
      stock: null, 
      drugExpiry: null, 
      categoryId: null,
      SupplierId: ''
    };
  }
}