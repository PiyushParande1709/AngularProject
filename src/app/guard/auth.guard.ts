
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const token=localStorage.getItem('token')!;
  const router = new Router();
  if(token){
    return true;
  }
  else{
    router.navigate(['/login']);
    return false;
  }
};
