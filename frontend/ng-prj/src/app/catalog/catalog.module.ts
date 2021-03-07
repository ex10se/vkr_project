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

import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'cat/:catId', component: ListComponent},
  {path: 'subcat/:SubCatId', component: ListComponent},
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
    NgbRatingModule,
  ],
  exports: [
    ListComponent
  ],
  providers: [
    ApiService,
  ]
})
export class CatalogModule {
}
