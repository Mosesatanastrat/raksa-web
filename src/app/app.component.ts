import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';

// import { AstrologerService, AuthService, UserService } from './core/services';

import {
  Firestore,
  collectionData,
  collection,
  where,
  query,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    // public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    // public userServices: UserService,
    public router: Router,
    // public astroServices: AstrologerService,
    public firestore: Firestore
  ) {}

  title = 'Raksa';
  public isScrolled: boolean;

  public formStep: number = 1;
  public selectedCountry: number = 1;
  public showHeader: boolean = true;
  public showFooter: boolean = true;
  public isAstrologerPage: boolean = false;
  public currentUser = '';
  public userData;
  public chatNotificaitionArray;
  public callNotificaitionArray;
  public showThreeNavs = true;
  public showNotificationNavs = false;

  public otpInputConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
  };

  private async fetchNotificationData() {}
  fetchUserData() {}

  ngOnInit() {}

  login(): void {}

  openProfileModal(): void {}
  openChatNotiifcations() {}
  openCallNotiifcations() {}

  openWalletModal(): void {}

  openTransactionModal(): void {}
  openSessionModal() {}

  async logout() {}
}
