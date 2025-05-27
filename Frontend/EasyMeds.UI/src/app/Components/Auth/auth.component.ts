// import { Component, OnInit } from "@angular/core"
// import { FormBuilder,  FormGroup, Validators } from "@angular/forms"
// import  { ActivatedRoute, Router } from "@angular/router"
// import { first } from "rxjs/operators"
// import  { AuthService } from "../../services/auth.service"
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: "app-auth",
//   templateUrl: "./auth.component.html",
//   styleUrls: ["./auth.component.scss"],
//   imports: [CommonModule, ReactiveFormsModule],
//   standalone: true
// })
// export class AuthComponent implements OnInit {
//   loginForm!: FormGroup
//   signupForm!: FormGroup
//   loading = false
//   submitted = false
//   error = ""
//   isLoginForm = true
//   returnUrl = "/dashboard"

//   constructor(
//     private formBuilder: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router,
//     private authService: AuthService,
//   ) {
//     // Redirect to home if already logged in
//     if (this.authService.currentUserValue) {
//       this.router.navigate(["/dashboard"])
//     }
//   }

//   ngOnInit() {
//     this.loginForm = this.formBuilder.group({
//       email: ["", [Validators.required, Validators.email]],
//       password: ["", Validators.required],
//     })

//     this.signupForm = this.formBuilder.group({
//       name: ["", Validators.required],
//       email: ["", [Validators.required, Validators.email]],
//       password: ["", [Validators.required, Validators.minLength(6)]],
//     })

//     // Get return url from route parameters or default to '/'
//     this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/dashboard"
//   }

//   // Convenience getters for easy access to form fields
//   get lf() {
//     return this.loginForm.controls
//   }
//   get sf() {
//     return this.signupForm.controls
//   }

//   toggleForm(isLogin: boolean) {
//     this.isLoginForm = isLogin
//     this.error = ""
//   }

//   onLoginSubmit() {
//     this.submitted = true

//     // Stop here if form is invalid
//     if (this.loginForm.invalid) {
//       return
//     }

//     this.loading = true
//     this.authService
//       .login({
//         email: this.lf["email"].value,
//         password: this.lf["password"].value,
//       })
//       .pipe(first())
//       .subscribe({
//         next: () => {
//           this.router.navigate([this.returnUrl])
//         },
//         error: (error) => {
//           this.error = error.message
//           this.loading = false
//         },
//       })
//   }

//   onSignupSubmit() {
//     this.submitted = true

//     // Stop here if form is invalid
//     if (this.signupForm.invalid) {
//       return
//     }

//     this.loading = true
//     this.authService
//       .signup({
//         name: this.sf["name"].value,
//         email: this.sf["email"].value,
//         password: this.sf["password"].value,
//       })
//       .pipe(first())
//       .subscribe({
//         next: () => {
//           this.router.navigate([this.returnUrl])
//         },
//         error: (error) => {
//           this.error = error.message
//           this.loading = false
//         },
//       })
//   }
// }

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  loading = false;
  submitted = false;
  error = "";
  isLoginForm = true;
  returnUrl = "/admin-dash";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate([this.returnUrl]);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });

    this.signupForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      role: ["", Validators.required],
      PhoneNumber:["", Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/admin-dash";
    console.log("Return URL:", this.returnUrl);
  }

  get lf() {
    return this.loginForm.controls;
  }

  get sf() {
    return this.signupForm.controls;
  }

  toggleForm(isLogin: boolean) {
    this.isLoginForm = isLogin;
    this.error = "";
  }

  onLoginSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .login({
        email: this.lf["email"].value,
        password: this.lf["password"].value,
      })
      .pipe(first())
      .subscribe({
        next: () => {
          alert('Login successful!');
  
          const role = this.authService.getUserRole();
          console.log('User role after login:', role);
          
          if (role === 'Supplier') {
            this.router.navigate(['/supplier-dash']);
          } else if (role === 'Admin') {
            this.router.navigate(['/admin-dash/home']); // default: Admin/home
          } else if(role === 'Doctor') {
            this.router.navigate(['/home']); // default: Doctor/home
          }
          this.loading=false;

        },
        error: (error) => {
          this.error = error.message;
          this.loading = false;
        },
      });
  }

  onSignupSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .signup({
        name: this.sf["name"].value,
        email: this.sf["email"].value,
        password: this.sf["password"].value,
        role: this.sf["role"].value,
        PhoneNumber: this.sf["PhoneNumber"].value
      })
      .pipe(first())
      .subscribe({
        next: () => {
          this.isLoginForm=true;
          this.loading=false;
        },
        error: (error) => {
          this.error = error.message;
          this.loading = false;
        },
      });
  }
}