import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { APP_ROUTING } from './app-routing';
import { AppComponent } from './app.component';
import { APP_MODULES } from '@modules/index';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    BrowserAnimationsModule,
    ... APP_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
