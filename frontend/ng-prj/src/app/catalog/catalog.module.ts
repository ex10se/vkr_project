import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ApiService} from '../api.service';

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
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
  ],
  providers: [
    ApiService,
  ]
})
export class CatalogModule {}
