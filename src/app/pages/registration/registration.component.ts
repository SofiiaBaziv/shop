import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  modalRef: BsModalRef;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  loginEmail: string;
  loginPassword: string;
  showError: boolean;
  errorMsg: string;

  constructor(
    private modalService: BsModalService,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
    this.showError = false;
    this.errorMsg = '';
  }

  registerUser(): void {
    if (this.isValid()) {
      this.showError = false;
      this.authService.register(this.email, this.password, this.firstName, this.lastName);
      this.modalRef.hide();
      this.email = null;
      this.password = null;
      this.firstName = null;
      this.lastName = null;
    } else {
      this.showError = true;
    }
  }

  isValid(): boolean {
    if (this.firstName == null || this.lastName == null || this.password == null || this.email == null) {
      this.errorMsg = 'Заповніть всі поля';
      return false;
    } else if (this.password && this.password.length < 6) {
      this.errorMsg = 'Мінімальна довжина пароля 6 символів';
      return false;
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)) {
      this.errorMsg = 'Неправильний формат email';
      return false;
    } else {
      return true;
    }
  }

  login(): void {
    this.authService.login(this.loginEmail, this.loginPassword);
  }

}
