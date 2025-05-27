import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Order, OrderDetails} from "../models/user.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class OrderService{

    constructor(private apiservice: ApiService){}
    getOrders() : Observable<Order[]> {
        return this.apiservice.getOrders()
    }

    getOrdersBySupplier(UserId:string): Observable<Order[]>{
        return this.apiservice.getOrdersBySupplier(UserId);
    }

    UpdateOrder(OrderId:string,Status:number): any{
        return this.apiservice.updateOrder(OrderId,Status);
    }
}
