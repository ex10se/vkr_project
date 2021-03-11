import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import {LoginService} from '../../login.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  isAuth = false;
  userId = 0;
  orders: any = [];
  displayedColumns: string[] = ['position', 'name', 'amount', 'price', 'price_multiple', 'category', 'subcategory'];

  constructor(private apiService: ApiService,
              private loginService: LoginService) {
    this.loginService.isAuth$.subscribe((res: any) => {
      this.isAuth = res;
      if (this.isAuth) {
        this.apiService.init().subscribe((data: any) => {
          this.userId = data.user.id;
          this.apiService.getOrderList(this.userId).subscribe((rez: any) => {
            this.orders = rez;
            this.orders.sort((a: any, b: any) => b.updated_at.localeCompare(a.updated_at));
          });
        });
      }
    });
  }

  ngOnInit(): void {
  }

}
