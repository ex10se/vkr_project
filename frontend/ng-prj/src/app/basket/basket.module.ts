import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';

import {RouterModule, Routes} from '@angular/router';
import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CrystalLightboxModule} from '@crystalui/angular-lightbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const routes: Routes = [

  {path: '', component: ListComponent}

];

@NgModule({
  declarations: [ListComponent],
  exports: [
    ListComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCardModule,
        FlexLayoutModule,
        NgbRatingModule,
        MatButtonToggleModule,
        FontAwesomeModule,
        CrystalLightboxModule,
        MatProgressSpinnerModule
    ]
})
export class BasketModule {
}
