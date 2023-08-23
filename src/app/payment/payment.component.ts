import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @ViewChild('f') f!: NgForm;
  routingState!: any;
  selectedPayVideo!: any;
  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.routingState = this.router.getCurrentNavigation()?.extras?.state;
  }
  paymentSuccessful = false;
  form = {
    cardnumber: '',
    cardholdername: '',
    cvv: '',
    expiration: '',
  };
  ngOnInit() {
    this.selectedPayVideo = this.routingState['selVideo'];
    console.log('Selected video in paymenmt comp ', this.selectedPayVideo);
  }

  onSubmit() {
    console.log('filled value', this.form);
    console.log('filled:', JSON.stringify(this.form, null, 2));
    // Simulate successful payment submission
    // You can make API calls here for actual payment processing

    // For demonstration purposes, set paymentSuccessful to true
    this.paymentSuccessful = true;
    this.cdr.detectChanges();
    this.f.reset();
    const apiUrl = 'http://localhost:8082/purchaseContent';
    const params = {
      userId: '1',
      videoId: this.selectedPayVideo.videoId,
    };

    this.http.post(apiUrl, null, { params }).subscribe(
      (response) => {
        console.log('API Response:', response);
        // Handle success response if needed
        this.router.navigate(['/rent'], {
          state: { paymentSuccessful: this.paymentSuccessful },
        });
      },
      (error) => {
        console.error('API Error:', error);
        // Handle error if needed
      }
    );
  }
}
