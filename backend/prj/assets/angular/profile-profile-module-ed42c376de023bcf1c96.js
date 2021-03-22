(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["profile-profile-module"],{

/***/ "Q+2J":
/*!**************************************************!*\
  !*** ./src/app/profile/edit/edit.component.scss ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("mat-form-field {\n  width: 300px;\n}\n\n.form-control:focus {\n  background-color: #d1d4ff;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxlZGl0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7QUFDRiIsImZpbGUiOiJlZGl0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LWZvcm0tZmllbGQge1xyXG4gIHdpZHRoOiAzMDBweDtcclxufVxyXG5cclxuLmZvcm0tY29udHJvbDpmb2N1cyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2QxZDRmZjtcclxuXHJcbn1cclxuIl19 */");

/***/ }),

/***/ "aemh":
/*!************************************************!*\
  !*** ./src/app/profile/edit/edit.component.ts ***!
  \************************************************/
/*! exports provided: EditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditComponent", function() { return EditComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_edit_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./edit.component.html */ "amcg");
/* harmony import */ var _edit_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit.component.scss */ "Q+2J");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../api.service */ "yTNM");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../login.service */ "edGd");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");







let EditComponent = class EditComponent {
    constructor(apiService, loginService) {
        this.apiService = apiService;
        this.loginService = loginService;
        this.isAuth = false;
        this.userId = 0;
        this.formSubmitted = false;
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormGroup"]({
            firstName: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            phone: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](),
            address: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]()
        });
        this.loginService.isAuth$.subscribe((res) => {
            this.isAuth = res;
            if (this.isAuth) {
                this.apiService.init().subscribe((data) => {
                    this.userId = data.user.id;
                    this.fillForm(data.user.first_name, data.user.phone, data.user.address);
                });
            }
        });
    }
    fillForm(fName, phn, addr) {
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormGroup"]({
            firstName: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](fName, {
                validators: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].minLength(2)
                ]
            }),
            phone: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](phn, {
                validators: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].minLength(7)
                ]
            }),
            address: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](addr, {
                validators: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].minLength(6)
                ]
            })
        });
    }
    ngOnInit() {
    }
    onSubmit() {
        this.formSubmitted = true;
        this.apiService.changeUserProfile(this.userId, this.form.get('firstName').value, this.form.get('phone').value, this.form.get('address').value).subscribe(() => {
        });
    }
};
EditComponent.ctorParameters = () => [
    { type: _api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"] },
    { type: _login_service__WEBPACK_IMPORTED_MODULE_5__["LoginService"] }
];
EditComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-edit',
        template: _raw_loader_edit_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_edit_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], EditComponent);



/***/ }),

/***/ "amcg":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/profile/edit/edit.component.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div id=\"app-center\" fxFlex=\"100\" fxLayout=\"column\" fxLayoutAlign=\"start center\">\n\n  <ng-container *ngIf=\"!isAuth\"><h1>Вам необходимо авторизоваться</h1></ng-container>\n\n  <ng-container *ngIf=\"isAuth\">\n\n    <ng-container *ngIf=\"formSubmitted\"><h1>Профиль сохранен</h1></ng-container>\n    <ng-container *ngIf=\"!formSubmitted\"><h1>Профиль</h1></ng-container>\n    <br>\n    <form (ngSubmit)=\"onSubmit()\" gdAuto=\"row dense\" gdGap=\"10px\">\n      <mat-form-field appearance=\"outline\">\n        <mat-label>Имя</mat-label>\n        <input matInput type=\"text\" [formControl]=\"form.get('firstName')\" placeholder=\"Имя\"\n               id=\"first-name\" name=\"first-name\" required>\n        <mat-error *ngIf=\"form.get('firstName').invalid\">Пожалуйста, введите имя</mat-error>\n      </mat-form-field>\n      <mat-form-field appearance=\"outline\">\n        <mat-label>Телефон</mat-label>\n        <input matInput type=\"tel\" [formControl]=\"form.get('phone')\"\n               placeholder=\"Телефон\" id=\"phone\" name=\"phone\" required>\n        <mat-error *ngIf=\"form.get('phone').invalid\">Пожалуйста, введите верный номер телефона</mat-error>\n      </mat-form-field>\n      <mat-form-field appearance=\"outline\">\n        <mat-label>Адрес доставки</mat-label>\n        <textarea matInput [matTextareaAutosize]=true [formControl]=\"form.get('address')\" placeholder=\"Адрес\"\n                  id=\"address\" name=\"address\" required></textarea>\n        <mat-error *ngIf=\"form.get('address').invalid\">Пожалуйста, введите адрес</mat-error>\n      </mat-form-field>\n      <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!form.valid || !form.touched\">Сохранить</button>\n    </form>\n  </ng-container>\n</div>\n\n");

/***/ }),

/***/ "cRhG":
/*!*******************************************!*\
  !*** ./src/app/profile/profile.module.ts ***!
  \*******************************************/
/*! exports provided: ProfileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileModule", function() { return ProfileModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _edit_edit_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit/edit.component */ "aemh");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout */ "YUcS");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ "qFsG");









const routes = [
    { path: '', component: _edit_edit_component__WEBPACK_IMPORTED_MODULE_3__["EditComponent"] }
];
let ProfileModule = class ProfileModule {
};
ProfileModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_edit_edit_component__WEBPACK_IMPORTED_MODULE_3__["EditComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__["FlexLayoutModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInputModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"]
        ]
    })
], ProfileModule);



/***/ })

}]);
//# sourceMappingURL=profile-profile-module-ed42c376de023bcf1c96.js.map