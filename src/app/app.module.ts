import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObsFormComponent } from './obs-form/obs-form.component';
import { TtickerComponent } from './tticker/tticker.component';
import { LiveUpdateComponent } from './live-update/live-update.component';
import { HttpClientModule } from '@angular/common/http';
import { AdDemoComponent } from './ad-demo/ad-demo.component';
// import { JwplayerComponent } from './jwplayer/jwplayer/jwplayer.component';
import { JwplayerComponent } from './jwplayer/jwplayer.component';
import { OttComponent } from './ott/ott.component';
import { HeaderComponent } from './header/header.component';
import { FreemiumComponent } from './freemium/freemium.component';
import { RentComponent } from './rent/rent.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { VideoComponent } from './video/video.component';
import { PlayVidComponent } from './play-vid/play-vid.component';
import { RegisterComponent } from './register/register.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { PaymentComponent } from './payment/payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CarouselModule } from 'ngx-bootstrap/carousel';
// import { MulticardCarouselComponent } from './shared/multicard-carousel/multicard-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    // TickerComponent,
    TtickerComponent,
    LiveUpdateComponent,
    ObsFormComponent,
    AdDemoComponent,
    JwplayerComponent,
    OttComponent,
    HeaderComponent,
    FreemiumComponent,
    RentComponent,
    LoginComponent,
    VideoComponent,
    PlayVidComponent,
    RegisterComponent,
    ShowDetailsComponent,
    PaymentComponent,
    // JwplayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
