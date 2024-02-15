// role.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRole = this.authService.checkUserRole();
    const requiredRoles = route.data['requiredRole'] as string[];
    // console.log('Required Roles:', requiredRoles);
    // console.log('User Role:', userRole);
    if (!requiredRoles || requiredRoles.length === 0) {
      // ถ้าไม่มี requiredRoles หรือ requiredRoles มีค่าว่าง
      
      return true; // ให้ผ่านไปเลย
      
    }

    // console.log('Required Roles:', requiredRoles);
    // console.log('User Role:', userRole);

    const isAdmin = requiredRoles.includes('ADMIN');
    const isUserRoleDefined = userRole !== undefined;
    
    // const isAuthorized = isUserRoleDefined && ((!isAdmin && (userRole === null || requiredRoles.includes(userRole))) || (isAdmin && userRole === 'ADMIN'));
    const isAuthorized = isUserRoleDefined && ((!isAdmin && (userRole === '' || requiredRoles.includes(userRole))) || (isAdmin && userRole === 'ADMIN' && requiredRoles.includes(userRole)));

    if (!isAuthorized) {
      console.log('Role not authorized!');
      // ให้ redirect ไปยังหน้าที่กำหนดหรือหน้าหลัก (ตามที่คุณต้องการ)
      return this.router.parseUrl('/rolepage'); // ให้ redirect ไปยังหน้าหลัก
    } else {
      return true;
    }
  }    
}
