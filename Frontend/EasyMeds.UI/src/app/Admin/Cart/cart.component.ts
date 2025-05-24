import { Component, type OnInit } from "@angular/core"
import  { Router, RouterLink } from "@angular/router"
import { MatSnackBar } from "@angular/material/snack-bar"
import { CartService } from "../../services/cart.service"
import { CartItem } from "../../models/user.model"
import { MatIcon } from "@angular/material/icon"
import { MatTable, MatTableModule } from "@angular/material/table"
import { CommonModule, SlicePipe } from "@angular/common"
import { AuthService } from "../../services/auth.service"


@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
  imports:[MatIcon,MatTable,SlicePipe,CommonModule,MatTableModule,RouterLink]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []
  displayedColumns: string[] = ["image", "name", "price", "quantity", "total", "actions"]
  UserId:string ='';
 

  constructor(
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.UserId=this.authService.getUserIdFromToken()!;
    this.cartService.loadCartFromStorage(this.UserId);
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items.filter(s=>s.UserId==this.UserId)
    });
    // this.cartItems = [
    //   {
    //     drug: {
    //       drugId: '1',
    //       name: "Paracetamol 500mg",
    //       price: 20,
    //       stock: 100,
    //       description: "Pain reliever and fever reducer",
    //       drugExpiry: new Date("2025-12-31"),
    //       categoryId: 'C1',
    //       imageUrl: "D:\Gaurav\Capgemini Project\EasyMeds\Frontend\EasyMeds.UI\public\image.png"
    //     },
    //     quantity: 2
    //   },
    //   {
    //     drug: {
    //       drugId: '2',
    //       name: "Amoxicillin 250mg",
    //       price: 50,
    //       stock: 50,
    //       description: "Antibiotic for bacterial infections",
    //       drugExpiry: new Date("2026-05-15"),
    //       categoryId: 'C2',
    //       imageUrl: "https://via.placeholder.com/60"
    //     },
    //     quantity: 1
    //   }
    // ];
    
  }

  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change

    if (newQuantity <= 0) {
      this.removeItem(item)
      return
    }

    if (newQuantity > item.drug.stock) {
      this.snackBar.open(`Sorry, only ${item.drug.stock} units available in stock.`, "Close", {
        duration: 3000,
      })
      return
    }

    this.cartService.updateQuantity(item.drug.drugId, newQuantity,this.UserId)

  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.drug.drugId,this.UserId)
    this.snackBar.open(`${item.drug.name} removed from cart`, "Close", {
      duration: 3000,
    })
  }

  clearCart(): void {
    this.cartService.clearCart(this.UserId)
    this.snackBar.open("Cart cleared", "Close", {
      duration: 3000,
    })
  }

  getItemTotal(item: CartItem): number {
    return item.drug.price * item.quantity
  }

  getCartTotal(): number {
    return this.cartService.getCartTotal()
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      this.snackBar.open("Your cart is empty", "Close", {
        duration: 3000,
      })
      return
    }

    this.router.navigate(["/checkout"])
  }

  continueShopping(): void {
    this.router.navigate(["/"])
  }
}
