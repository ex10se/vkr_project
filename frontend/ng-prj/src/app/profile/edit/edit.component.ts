import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import {LoginService} from '../../login.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  isAuth = false;
  userId = 0;
  formSubmitted = false;
  form: any = new FormGroup({
    firstName: new FormControl(),
    phone: new FormControl(),
    address: new FormControl()
  });

  constructor(private apiService: ApiService,
              private loginService: LoginService) {

    this.loginService.isAuth$.subscribe((res: any) => {
      this.isAuth = res;
      if (this.isAuth) {
        this.apiService.init().subscribe((data: any) => {
          this.userId = data.user.id;
          this.fillForm(data.user.first_name, data.user.phone, data.user.address);
        });
      }
    });
  }

  fillForm(fName: string, phn: string, addr: string): void {
    this.form = new FormGroup({
      firstName: new FormControl(fName, {
        validators: [
          Validators.required,
          Validators.minLength(2)
        ]
      }),
      phone: new FormControl(phn, {
        validators: [
          Validators.required,
          Validators.minLength(7)]
      }),
      address: new FormControl(addr, {
        validators: [
          Validators.required,
          Validators.minLength(6)]
      })
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.formSubmitted = true;
    this.apiService.changeUserProfile(this.userId, this.form.get('firstName').value, this.form.get('phone').value,
      this.form.get('address').value).subscribe(() => {
    });
  }
}
