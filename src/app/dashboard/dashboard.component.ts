import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'dashboard.component.html' })
export class DashboardComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    users = [];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) {
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
      this.userService.getAll()
          .pipe(first())
          .subscribe(
              data => {
                  console.log("Data here");
                  console.log(data);
                  this.users = data
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
    }

    logoutFunction(){
      console.log("logging out");
      localStorage.removeItem('currentUser');
      this.authenticationService.logout()
      this.router.navigate(['/login']);
      //this.currentUserSubject.next(null);


    }

    newPost(){
      console.log("New post");
      this.router.navigate(['/newpost']);

    }



}
