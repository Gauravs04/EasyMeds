import { Injectable, Input, SimpleChanges } from "@angular/core";
import { ApiService } from "./api.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CategoryDto, Drug } from "../models/user.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class DrugService{

  constructor(
    private apiService: ApiService,
  ) {}

  
  getCategories(): Observable<CategoryDto[]> {
    return this.apiService.getCategories()
  }




  // Fetch once
  fetchDrugs(): Observable<Drug[]> {
    return this.apiService.getAllDrugs()
  }



  addDrug(newDrug:any): Observable<Drug>{
    return this.apiService.addDrug(newDrug)
    
  }

  addDrugInInventory(drugobj:any): Observable<Drug>{
    return this.apiService.addDrugInInventory(drugobj)
  }


  updateDrug(drug:any): Observable<Drug>{
    return this.apiService.updateDrug(drug);
  }

  updateDrugInInventory(drug:any): Observable<Drug> {
    return this.apiService.updateDrugInInventory(drug)
  }

  deleteDrug(id: string): any {
    return this.apiService.deleteDrug(id)
  }
}
