import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment.prod';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CategoryDto } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,private authService: AuthService) {}

  someMethod(): string | null {
    const userId = this.authService.getUserIdFromToken();
    return userId;
    // Use userId in your request or logic
  }


  // Generic GET request
  // get<T>(endpoint: string): Observable<T> {
  //   return this.http.get<T>(`${this.apiUrl}/Drug/view-drugs`);
  // }

  // // Generic POST request
  // post<T>(endpoint: string, data: any): Observable<T> {
  //   return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data);
  // }

  // // Generic PUT request
  // put<T>(endpoint: string, data: any): Observable<T> {
  //   return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data);
  // }

  // // Generic DELETE request
  // delete<T>(endpoint: string): Observable<T> {
  //   return this.http.delete<T>(`${this.apiUrl}/${endpoint}`);
  // }

  // ✅ Replaced filtered fetch with full drug list for frontend filtering
  getAllDrugs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Drug/view-drugs`);
  }

  // ✅ Add new drug
  addDrug(drug: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Drug/add-drugs`, drug);
  }

  addDrugInInventory(drug: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Inventory`, drug);
  }

  // ✅ Update existing drug
  updateDrug(drug: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Drug/edit-drug`, drug);
  }

  updateDrugInInventory(drug: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Inventory`, drug);
  }

  // ✅ Delete drug
  deleteDrug(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Drug/Delete-Drug/${id}`);
  }

  getCategories() {
    return this.http.get<CategoryDto[]>(`${this.apiUrl}/Category/Get-Category`);
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Orders`);
  }
}
