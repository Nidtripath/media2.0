import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObsFormComponent } from '../app/obs-form/obs-form.component';
import { LiveUpdateComponent } from './live-update/live-update.component';
import { HeaderComponent } from './header/header.component';
import { FreemiumComponent } from './freemium/freemium.component';
import { RentComponent } from './rent/rent.component';
import { PlayVidComponent } from '../app/play-vid/play-vid.component';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: 'obs-form', component: ObsFormComponent },
  { path: 'freemium', component: FreemiumComponent },
  { path: 'rent', component: RentComponent },
  { path: 'vid-play', component: PlayVidComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'show-detail', component: ShowDetailsComponent },
  { path: 'payment', component: PaymentComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // { path: 'videoPlayer', component: VideoPlayerComponent}
  // { path: '', component: LiveUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
