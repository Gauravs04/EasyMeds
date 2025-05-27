import { Injectable } from "@angular/core"
import  { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router"
import  { AuthService } from "../services/auth.service"

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    const requiredRole = route.data['role'] as string;

    if (currentUser && currentUser.role === requiredRole) {
      return true; 
    }

    console.warn("Unauthorized access to:", state.url);
    this.authService.logout()
    this.router.navigateByUrl(`/login?returnUrl=${encodeURIComponent(state.url)}`);
    return false;
  }
}