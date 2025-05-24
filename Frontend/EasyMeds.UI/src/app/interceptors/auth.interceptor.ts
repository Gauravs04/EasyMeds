// import { Injectable } from '@angular/core';
// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   private readonly apiBaseUrl = 'http://localhost:5074/api';

//   constructor(private authService: AuthService, private router: Router) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.authService.getToken();

//     // Attach token only if the request URL starts with your API URL
//     const isApiRequest = req.url.startsWith(this.apiBaseUrl);
//     const authReq = isApiRequest && token? req.clone({
//           setHeaders: {
//             Authorization: `Bearer ${token}`
//           }
//         })
//       : req;

//     return next.handle(authReq).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 401) {
//           this.authService.logout();
//           this.router.navigate(['/login']); // Adjust path if needed
//         }
//         return throwError(() => error);
//       })
//     );
//   }
// }

// src/app/interceptors/auth.interceptor.ts

import { HttpInterceptorFn } from '@angular/common/http'; // Function-based interceptor API
import { inject } from '@angular/core'; // Inject services in function-based interceptors
import { AuthService } from '../services/auth.service'; // Import AuthService for token management
import { Router } from '@angular/router'; // Import Router for navigation
import { catchError } from 'rxjs/operators'; // To handle errors in interceptors
import { throwError } from 'rxjs'; // To throw errors after handling them

// Function-based interceptor
export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Injecting AuthService
  const router = inject(Router); // Injecting Router

  const token = authService.getToken(); // Get the token from AuthService
  const apiBaseUrl = 'http://localhost:5074/api'; // Define your API base URL

  // Check if the request is an API request and if the token exists
  const isApiRequest = req.url.startsWith(apiBaseUrl);
  const authReq = isApiRequest && token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Set the Authorization header if token exists
        }
      })
    : req;

  // Use next.handle for function-based interceptors
  return next(authReq).pipe(
    catchError((error) => {
      // If we get a 401 Unauthorized, logout the user and navigate to the login page
      if (error.status === 401) {
        authService.logout(); // Call logout in AuthService
        router.navigate(['/login']); // Navigate to login page
      }
      return throwError(() => error); // Return the error after handling it
    })
  );
};
