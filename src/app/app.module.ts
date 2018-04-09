import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component';
import { IslandsMenuComponent } from './islands-menu/islands-menu.component';
import { IslandsService } from './islands.service';
import { RandomMatrixComponent } from './random-matrix/random-matrix.component';
import { CreateMatrixComponent } from './create-matrix/create-matrix.component';

@NgModule({
  declarations: [
    AppComponent,
    IslandsMenuComponent,
    RandomMatrixComponent,
    CreateMatrixComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [IslandsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
