import { Injectable } from "@angular/core"
import  { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router"
import  { AuthService } from "../services/auth.service"

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const currentUser = this.authService.currentUserValue
    if (currentUser?.role=='Admin') {
      // Authorized, so return true
      return true
    }
    console.log("Trying to access:", state.url);
    // Not logged in so redirect to login page with the return url
    this.router.navigateByUrl(`/login?returnUrl=${encodeURIComponent(state.url)}`)
    return false
  }
}
