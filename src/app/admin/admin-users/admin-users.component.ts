import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: Array<User> = [];
  modalRef: BsModalRef;
  userForEdit: User;
  userIdForDelete: string;
  searchUser: string;
  order: string;
  reverse = false;

  constructor(private modalService: BsModalService,
    private userService: UserService,
    private orderPipe: OrderPipe) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      collection => {
        this.users = collection.map(product => {
          const data = product.payload.doc.data() as User;
          data.id = product.payload.doc.id;
          return data;
        });
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  editUserModal(template: TemplateRef<any>, user: User): void {
    this.modalRef = this.modalService.show(template);
    this.userForEdit = JSON.parse(JSON.stringify(user));
  }

  editUser(): void {
    this.userService.updateUser(this.userForEdit);
    this.getUsers();
    this.modalRef.hide();
  }

  deleteUserModal(template: TemplateRef<any>, user: User) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
    this.userIdForDelete = user.id;
  }

  deleteUser() {
    this.userService.deleteUser(this.userIdForDelete);
    this.modalRef.hide();
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

}
