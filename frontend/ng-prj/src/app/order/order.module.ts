import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const routes: Routes = [
  {path: '', component: ListComponent}
];

@NgModule({
  declarations: [ListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FlexLayoutModule,
        MatTableModule,
        MatProgressSpinnerModule
    ]
})
export class OrderModule {
}
