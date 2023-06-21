import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, NavigationEnd } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  protected readonly unsubscribe$ = new Subject<void>();
  href: string;
  routerEvents: any;
  token: any;
  roles: any;
  currentUrl: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {//it gives current page name from current url using NavigationEnd
    // this.routerEvents = this.router.events.subscribe(
    //   (event: any) => {
    //     if (event instanceof NavigationEnd) {
    //       // console.log('URllllllllllllllllll', event.url);
    //       var split = event.url.split('/');
    //       // console.log('spliiiiiiiiiiiit', split);
    //       this.currentUrl = split[2];
    //       // console.log('curreeeeent', this.currentUrl);
    //     }
    //   }
    // )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let type = route.data["type"] as Array<string>
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.roles = this.token.data.user.roles;
    console.log('type------------', type);
    console.log('roles------------', this.roles);
    // console.log('url------------', this.currentUrl);


    // if (this.authService.isUserLoggedIn.value == false) {
    //   this.router.navigate(['auth/login']);
    //   return false;
    // } else {
    //   if (this.roles.includes(type)) {
    //     console.log('inside includes ************************************************ ');
    //     return this.authService.isUserLoggedIn;
    //   }
    // }
    // return this.authService.isUserLoggedIn;
    return true;
  }
}



