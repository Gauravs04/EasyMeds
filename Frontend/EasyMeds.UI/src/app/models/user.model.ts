export interface User {
  id?: string
  name?: string
  email: string
  role:string
  token?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  name: string
  email: string
  password: string
  role: string
  PhoneNumber: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface CategoryDto {
  categoryId: string;
  categoryName: string;
}
export interface OrderDetails {
  orderId: number;
  status: string;
  orderDate: Date; 
  totalAmount: number;
  transactionId: string;
}

export interface Drug {
  result: result
  drugId: string
  name: string
  description: string
  stock: number
  drugExpiry: Date
  price: number
  categoryId: string
  supplierName?: string
  categoryName?: string
  imageUrl?: string // For displaying drug images
}

export interface result{
  drugId: string
  name: string
  description: string
  stock: number
  drugExpiry: Date
  price: number
  categoryId: string
  supplierName?: string
  categoryName?: string
  supplierId:string
}



export interface CartItem {
  UserId: string
  drug: Drug
  quantity: number
}