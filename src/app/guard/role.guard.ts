
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const roleGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router=new Router();
  const jwtHelper =new JwtHelperService();
  const token=localStorage.getItem('token')!;
  if(token){
    var data= jwtHelper.decodeToken(token);
    const userRole=data.role;
    
    if(userRole && userRole=='ADMIN'){
      return true;
    }
    else return false;
    
  }
  else {
    router.navigate(['/login']);
    return false;
  }
  
};
