import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { OrderDetails } from "../models/user.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class OrderService{

    constructor(private apiservice: ApiService){}
    getOrders() : Observable<OrderDetails[]> {
        return this.apiservice.getOrders()
    }
}
