import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { PpviewService } from 'src/services/ppview.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ppviewService: PpviewService,
    private httpClient: HttpClient
  ) {
    // redirect to home if already logged in
    if (this.ppviewService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  // onSubmit() {
  //   console.log('login details', this.loginForm.value);
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   this.loading = true;
  //   this.ppviewService
  //     .login(this.f['userName'].value, this.f['password'].value)
  //     .pipe(first())
  //     .subscribe(
  //       (data) => {
  //         console.log(data);
  //         this.router.navigate([this.returnUrl]);
  //       },
  //       (error) => {
  //         this.ppviewService.error(error);
  //         this.loading = false;
  //       }
  //     );
  // }
  // onSubmit() {
  //   console.log('login details', this.loginForm.value);
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   this.loading = true;
  //   this.httpClient.get<any>('http://localhost:8082/login').subscribe(
  //     (res) => {
  //       const user = res.find((a: any) => {
  //         return (
  //           a.email === this.loginForm.value.email &&
  //           a.password === this.loginForm.value.password
  //         );
  //       });
  //       if (user) {
  //         alert('Login Successful');
  //         this.loginForm.reset();
  //         this.router.navigate(['/freemium']);
  //       } else {
  //         alert('User not found');
  //       }
  //     },
  //     (err) => {
  //       alert('Something went wrong!!');
  //     }
  //   );
  // }

  onSubmit() {
    console.log('login details', this.loginForm.value);
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const apiUrl = 'http://localhost:8082/login';

    // Construct the query parameters
    const params = {
      emailId: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.httpClient.get(apiUrl, { params }).subscribe(
      (response: any) => {
        console.log('Login response:', response);
        this.loginForm.reset();
        this.router.navigate(['/freemium']);
      },
      (error) => {
        console.error('Login error:', error);
      },
      () => {
        this.loading = false;
      }
    );
  }
}
