import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { PpviewService } from 'src/services/ppview.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private ppviewService: PpviewService
  ) {}
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      emailId: ['', Validators.required],
      employeeId: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log('signup details', this.registerForm);

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.ppviewService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log('signup data', data);
          this.router.navigate(['/login']);
          this.ppviewService.success('Registration successful', true);
        },
        (error) => {
          this.ppviewService.error(error);
          this.loading = false;
        }
      );
  }
  // signUp() {
  //   console.log('Signup details', this.signupForm.value);
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.signupForm.invalid) {
  //     return;
  //   }

  //   this.loading = true;
  //   this.ppviewService
  //     .register(this.signupForm.value)
  //     .pipe(first())
  //     .subscribe(
  //       (data) => {
  //         this.ppviewService.success('Registration successful', true);
  //         console.log(data);
  //         this.router.navigate(['/login']);
  //       },
  //       (error) => {
  //         this.ppviewService.error(error);
  //         this.loading = false;
  //       }
  //     );
  //   // this.httpClient
  //   //   .post<any>('http://localhost:8082/users', this.signupForm.value)
  //   //   .subscribe(
  //   //     (res) => {
  //   //       alert('Signup Successful');
  //   //       this.signupForm.reset();
  //   //       setTimeout(() => {
  //   //         this.router.navigate(['login']);
  //   //       }, 3000);
  //   //     },
  //   //     (err) => {
  //   //       alert('Something went wrong!!');
  //   //     }
  //   //   );
  // }
}
