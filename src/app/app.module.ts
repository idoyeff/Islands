import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { IslandsMenuComponent } from './islands-menu/islands-menu.component';
import { RandomMatrixComponent } from './random-matrix/random-matrix.component';
import { CreateMatrixComponent } from './create-matrix/create-matrix.component';

import { IslandsService } from './islands.service';

@NgModule({
  declarations: [
    AppComponent,
    IslandsMenuComponent,
    RandomMatrixComponent,
    CreateMatrixComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'menu',
        component: IslandsMenuComponent
      },
      {
        path: 'random',
        component: RandomMatrixComponent
      },
      {
        path: 'create',
        component: CreateMatrixComponent
      }
    ])
  ],
  providers: [IslandsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
