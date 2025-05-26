// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // // import { DrugListComponent } from '../../components/drug-list/drug-list.component';
// // // import { NavbarComponent } from '../../components/navbar/navbar.component';
// // // import { FooterComponent } from '../../components/footer/footer.component';
// // // import { CategoryService } from '../../services/category.service';
// // import { Category } from '../../models/category.model';
// // import { FormsModule } from '@angular/forms'; // Add this import
// // import { Router } from '@angular/router';
// // import { CategoryService } from '../../services/category.service';

// // @Component({
// //   selector: 'app-home',
// //   standalone: true,
// //   templateUrl: './home.component.html',
// //   styleUrls: ['./home.component.scss'],
// //   imports: [CommonModule, FormsModule,],
// // })
// // export class HomeComponent implements OnInit {
// //   searchQuery: string = '';
// //   categories: Category[] = [];
// //   searchInputValue: string = '';

// //   // Map category names to Bootstrap Icons
// //   private categoryIcons: { [key: string]: string } = {
// //     'Stomach ache': 'bi-stomach',
// //     'Stomach pain': 'bi-stomach',
// //     'liver': 'bi-organ',
// //     'Pain Reliever': 'bi-pain',
// //     'Headache': 'bi-head-side-virus',
// //     'Antibiotic': 'bi-capsule',
// //     // Add more mappings as needed
// //   };

// //   constructor(private categoryService: CategoryService,
// //     private router: Router

// //   ) {}

// //   ngOnInit(): void {
// //     this.fetchCategories();
// //   }

// //   onSearch(query: string) {
// //     this.searchQuery = query;
// //   }

// //   fetchCategories() {
// //     this.categoryService.getCategories().subscribe({
// //       next: (categories) => {
// //         // Add icons to each category
// //         this.categories = categories.map(category => ({
// //           ...category,
// //           icon: this.categoryIcons[category.categoryName] || 'bi-capsule' // default icon
// //         }));
// //       },
// //       error: (error) => {
// //         console.error('Error fetching categories', error);
// //       }
// //     });
// //   }

// //   onCategoryClick(categoryName: string) {
// //     this.searchQuery = categoryName;
// //   }

// //   viewAllCategories() {
// //     this.searchQuery = '';
// //     // Alternatively, navigate to a dedicated categories page:
// //     // this.router.navigate(['/categories']);
// //   }

// //   // New method to view all medicines
// //   viewAllMedicines() {
// //     this.searchQuery = '';
// //     // Alternatively, navigate to a dedicated medicines page:
// //     // this.router.navigate(['/medicines']);
// //   }

// //   // Helper method to get icon for a category
// //   getCategoryIcon(categoryName: string): string {
// //     return this.categoryIcons[categoryName] || 'bi-capsule';
// //   }
// // }

// // home.component.ts
// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss'],
//   imports: [RouterLink,CommonModule], // Add any necessary imports here
// })
// export class HomeComponent {
//   categories = ['Antibiotics', 'Analgesics', 'Cardiology', 'Dermatology', 'Pediatrics'];

//   featuredMedicines = [
//     {
//       name: 'Paracetamol 500mg',
//       price: 45,
//       image: 'assets/images/paracetamol.jpg'
//     },
//     {
//       name: 'Amoxicillin 250mg',
//       price: 65,
//       image: 'assets/images/amoxicillin.jpg'
//     },
//     {
//       name: 'Aspirin 150mg',
//       price: 70,
//       image: 'assets/images/aspirin.jpg'
//     }
//   ];
// }
// // home.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss'],
//   standalone: true,
//   imports: [CommonModule, RouterLink],
// })
// export class HomeComponent implements OnInit {
//   categories = [
//     'Antibiotics', 
//     'Analgesics', 
//     'Cardiology', 
//     'Dermatology', 
//     'Pediatrics',
//     'Vitamins',
//     'Diabetes Care',
//     'Respiratory'
//   ];

//   featuredMedicines = [
//     {
//       name: 'Paracetamol 500mg',
//       price: 45,
//       image: 'assets/images/paracetamol.jpg',
//       rating: 4.5
//     },
//     {
//       name: 'Amoxicillin 250mg',
//       price: 65,
//       image: 'assets/images/amoxicillin.jpg',
//       rating: 4.8
//     },
//     {
//       name: 'Aspirin 150mg',
//       price: 70,
//       image: 'assets/images/aspirin.jpg',
//       rating: 4.2
//     },
//     {
//       name: 'Cetirizine 10mg',
//       price: 55,
//       image: 'assets/images/cetirizine.jpg',
//       rating: 4.6
//     }
//   ];

//   testimonials = [
//     {
//       name: 'Priya Sharma',
//       location: 'Delhi',
//       text: 'EasyMeds has been a lifesaver for my regular medication needs. The delivery is always on time and the prices are reasonable.',
//       rating: 5
//     },
//     {
//       name: 'Rahul Patel',
//       location: 'Mumbai',
//       text: 'The consultation service is excellent. I was able to get professional advice without leaving my home during the pandemic.',
//       rating: 4.5
//     }
//   ];

//   // Map category names to Bootstrap Icons
//   private categoryIcons: { [key: string]: string } = {
//     'Antibiotics': 'bi-capsule',
//     'Analgesics': 'bi-bandaid',
//     'Cardiology': 'bi-heart-pulse',
//     'Dermatology': 'bi-shield',
//     'Pediatrics': 'bi-emoji-smile',
//     'Vitamins': 'bi-droplet',
//     'Diabetes Care': 'bi-activity',
//     'Respiratory': 'bi-lungs'
//   };

//   constructor() {}

//   ngOnInit(): void {
//     // Any initialization logic
//   }

//   // Helper method to get icon for a category
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service'; // Add this import
import { CategoryDto } from '../../models/user.model'; // Add this import
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule],
})
export class HomeComponent implements OnInit {
  // ... existing category and testimonial data
  
  drugs: any[] = [];
  filteredDrugs: any[] = [];
  searchQuery: string = '';
  categories: CategoryDto[] = [];

  constructor(
      private apiService: ApiService,
      private cartService: CartService,
      public authService: AuthService,
      private router: Router) {} // Inject ApiService

  ngOnInit(): void {
    this.fetchDrugs();
    this.fetchCategories();
  }

  fetchDrugs() {
    this.apiService.getAllDrugs().subscribe({
      next: (response) => {
        this.drugs = response;
        this.filteredDrugs = response.slice(0, 8); // Show first 8 drugs initially
      },
      error: (err) => console.error('Error fetching drugs:', err)
    });
  }

  fetchCategories() {
    this.apiService.getCategories().subscribe({
      next: (categories) => this.categories = categories,
      error: (err) => console.error('Error fetching categories:', err)
    });
  }

  addToCart(drug: any): void {
    this.cartService.addToCart(drug);
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.categoryId === categoryId);
    return category ? category.categoryName : 'Uncategorized';
  }
  // getCategoryIcon(categoryName: string): string {
  //   return this.categoryIcons[categoryName] || 'bi-capsule';
  // }

  applySearch() {
    const term = this.searchQuery.toLowerCase().trim();
    
    if (!term) {
      this.filteredDrugs = this.drugs.slice(0, 8);
      return;
    }

    this.filteredDrugs = this.drugs.filter(drug =>
      drug.name.toLowerCase().includes(term) ||
      (drug.description && drug.description.toLowerCase().includes(term)) ||
      this.getCategoryName(drug.categoryId).toLowerCase().includes(term)
    ).slice(0, 8); // Show first 8 matches
  }

  handleAuthAction(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
      this.router.navigate(['/login']); // Redirect to login page after logout
    } else {
      this.router.navigate(['/login']); // Redirect to login page
    }
  }

  getbyCategory(categoryName :string ): void{
    this.searchQuery=categoryName
    this.applySearch()
  }
}