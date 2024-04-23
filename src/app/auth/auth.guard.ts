import { inject } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
// import { AuthService } from '../core/services';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class authGuard {
  constructor(
    // private authService: AuthService,
    private router: Router,
    // authServices: AuthService,
    private modalService: NgbModal
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {}
}
