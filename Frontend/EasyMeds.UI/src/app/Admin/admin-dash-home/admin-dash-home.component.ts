import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CategoryDto, OrderDetails } from '../../models/user.model';
import { Drug } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { DrugService } from '../../services/drug.service';
import _ from 'lodash';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-admin-dash-home',
  imports: [CommonModule,RouterLink],
  templateUrl: './admin-dash-home.component.html',
  styleUrl: './admin-dash-home.component.css'
})
export class AdminDashHomeComponent {
  Order:OrderDetails[]=[];
  FeaturedOrder:OrderDetails[]=[];
  Drugs:Drug[]=[];
  ExpiringDrugs:Drug[]=[]
  Categories:CategoryDto[]=[]

  constructor(
    private orderservice: OrderService,
    private drugservice: DrugService
  ){}

  ngOnInit():void{
    this.orderservice.getOrders().subscribe({
      next:(order)=>{
        this.Order=order
        this.FeaturedOrder=order.slice(0,5)
      },
      error: () => {
        console.error('Failed to load orders');
      }
    })

    this.drugservice.fetchDrugs().subscribe({
      next:(drug)=>{
        this.Drugs=drug
        this.GetExpiringDrugs()
      },
      error:()=>{
        console.error('Failed to load Drugs');
      }
    })

    this.drugservice.getCategories().subscribe({
      next:(response)=>{
        this.Categories=response
      }
    })

    
  }

  GetExpiringDrugs(): void {
    this.ExpiringDrugs = _(this.Drugs)
      .orderBy(['drugExpiry'], ['asc'])
      .take(5)
      .map(drug => {
        const category = this.Categories.find(c => c.categoryId === drug.categoryId);
        return {
          ...drug,
          categoryName: category ? category.categoryName: 'Unknown'
        };
      })
      .value();
  }



}
