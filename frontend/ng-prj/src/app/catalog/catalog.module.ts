import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {RouterModule, Routes} from '@angular/router';
import {ApiService} from '../api.service';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatBadgeModule} from '@angular/material/badge';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {CrystalLightboxModule} from '@crystalui/angular-lightbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'popular', component: ListComponent},
  {path: 'recommended', component: ListComponent},
  {path: 'cat/:catId', component: ListComponent},
  {path: 'subcat/:SubCatId', component: ListComponent}
];

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatInputModule,
    NgbRatingModule,
    FontAwesomeModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    CrystalLightboxModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule
  ],
  exports: [
    ListComponent
  ],
  providers: [
    ApiService
  ]
})
export class CatalogModule {
}
