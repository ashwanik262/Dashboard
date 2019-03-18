import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { NumbersuffixPipe } from '../pipe/numbersuffix/numbersuffix.pipe';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoundProgressModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage,NumbersuffixPipe]
})
export class HomePageModule {}
