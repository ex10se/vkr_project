import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import {LoginService} from '../../login.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  isAuth = false;
  user = {};

  constructor(private apiService: ApiService,
              private loginService: LoginService) {

    this.loginService.isAuth$.subscribe((res: any) => {
      this.isAuth = res;
      if (this.isAuth) {
        this.apiService.init().subscribe((data: any) => {
          this.user = data.user;
        });
      } else {
        this.user = false;
      }
    });


  }

  ngOnInit(): void {
  }

}
