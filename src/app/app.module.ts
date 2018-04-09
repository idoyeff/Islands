import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { IslandsMenuComponent } from './islands-menu/islands-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    IslandsMenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
