import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import { BehaviorSubject, Observable, throwError } from "rxjs"
import { catchError, map, tap } from "rxjs/operators"
import  { User, LoginRequest, SignupRequest, AuthResponse } from "../models/user.model"
import  { Router } from "@angular/router"
import {jwtDecode, JwtPayload} from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'?: string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
  name?: string;
}


@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>
  public currentUser: Observable<User | null>
  private isAuthenticated = false;
  private apiUrl = "http://localhost:5074/api" // Replace with your actual API URL

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    const storedUser = sessionStorage.getItem("currentUser")
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null)
    this.currentUser = this.currentUserSubject.asObservable()
    this.checkAuthState();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value
  }

  login(loginRequest: LoginRequest): Observable<User> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/Authorization/Login`, loginRequest).pipe(
      map((response) => {
        // Store user details and jwt token in local storage to keep user logged in
        const user = {
          ...response.user,
          token: response.token,
        }
        const userdetail = this.createUserFromToken(response.token);
        sessionStorage.setItem("currentUser", JSON.stringify(user))
        this.currentUserSubject.next(userdetail)
        return userdetail
      }),
      catchError((error) => {
        return throwError(() => new Error(error.error?.message || "Login failed"))
      }),
    )
  }

  private createUserFromToken(token: string): User {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return {
      id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || undefined,
      name: decoded.name || '',
      email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || '',
      role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']!,
      token: token
    };
  }

  // signup(signupRequest: SignupRequest): Observable<boolean> {
  //   return this.http.post<boolean>(`${this.apiUrl}/Authorization/SignUp`, signupRequest).pipe(
  //     // map((response) => {
  //     //   // Store user details and jwt token in local storage
  //     //   const user = {
  //     //     ...response.user,
  //     //     token: response.token,
  //     //   }
  //     //   console.log(user);
  //     //   sessionStorage.setItem("currentUser", JSON.stringify(user))
  //     //   this.currentUserSubject.next(user)
  //     //   return user
  //     // }),
  //     catchError((error) => {
  //       return throwError(() => new Error(error.error?.message || "Signup failed"))
  //     }),
  //   )
  // }

  signup(signupRequest: SignupRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Authorization/SignUp`, signupRequest).pipe(
      tap(() => {
        console.log("Signup successful. Redirecting to login.");
      }),
      catchError((error) => {
        return throwError(() => new Error(error.error?.message || "Signup failed"));
      })
    );
  }

  logout(): void {
    // Remove user from local storage and set current user to null
    sessionStorage.removeItem("currentUser")
    this.currentUserSubject.next(null)
    this.router.navigate(["/login"])
  }

  private checkAuthState(): void {
    const token = this.getToken();
    if (token) {
      try {
        const user = this.createUserFromToken(token);
        this.currentUserSubject.next(user);
      } catch (e) {
        this.logout();
      }
    }
  } 


  // getUserIdFromToken(): string | null {
  //   const token = this.getToken();
  //   if (!token) return null;
  
  //   try {
  //     // Use type assertion or 'any' to access the custom claim
  //     const decoded = jwtDecode<{ 
  //       [key: string]: any;
  //       "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string 
  //     }>(token);
      
  //     return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
  //   } catch (err) {
  //     console.error("Token decode error:", err);
  //     return null;
  //   }
  // }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const decoded = jwtDecode<{ 
        [key: string]: any;
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string 
      }>(token);
      
      return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
    } catch (err) {
      return null;
    }
  }

  getUserRole(): string | null {
    const userData = JSON.parse(sessionStorage.getItem('currentUser')!);
    const token = userData.token;
    // const token = sessionStorage.getItem('token');
    if (!token) return null;
  
    try {
      const decodedToken = this.decodeToken(token);
      const currentTime = Date.now() / 1000; // in seconds
  
      // Check if token is expired
      if (decodedToken.exp < currentTime) {
        this.logout(); // Automatically logout if token is expired
        return null;
      }
  
      console.log('Decoded token payload:', decodedToken);
      return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ;
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  private decodeToken(token: string): any {
    const parts = token.split('.');
    const payload = atob(parts[1]);
    return JSON.parse(payload);
  }
  

  isLoggedIn(): boolean {
    return !!this.currentUserValue
  }

  getToken(): string | undefined {
    return this.currentUserValue?.token
  }
}
