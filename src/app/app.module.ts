import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { SkillsComponent } from './skills/skills.component';
import { SunComponent } from './sun/sun.component';
import { HeaderBgComponent } from './header-bg/header-bg.component';
import { WorkComponent } from './work/work.component';
import { FooterComponent } from './footer/footer.component';
import { OverlayComponent } from './overlay/overlay.component';
import { AboutComponent } from './about/about.component';
import { HireComponent } from './hire/hire.component';
import { CvComponent } from './cv/cv.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    SkillsComponent,
    SunComponent,
    HeaderBgComponent,
    WorkComponent,
    FooterComponent,
    OverlayComponent,
    AboutComponent,
    HireComponent,
    CvComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
