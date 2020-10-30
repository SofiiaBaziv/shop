import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Category } from '../../shared/models/category.model';
import { CategoryService } from '../../shared/services/category.service';
import { Router } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  category: Category = new Category();
  categories: Array<Category> = [];
  modalRef: BsModalRef;
  categorytForEdit: Category;
  categoryIdForDelete: string;
  searchCategory: string;
  order: string;
  reverse = false;

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private categoryService: CategoryService,
    private orderPipe: OrderPipe) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      collection => {
        this.categories = collection.map(category => {
          const data = category.payload.doc.data() as Category;
          data.id = category.payload.doc.id;
          return data;
        });
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addCategory() {
    this.modalRef.hide();
    this.categoryService.createCategory(this.category);
    this.category = new Category();
  }

  editCategoryModal(template: TemplateRef<any>, product: Category): void {
    this.modalRef = this.modalService.show(template);
    this.categorytForEdit = JSON.parse(JSON.stringify(product));
  }

  editCategory(): void {
    this.categoryService.updateCategory(this.categorytForEdit);
    this.getCategories();
    this.modalRef.hide();
  }

  deleteCategoryModal(template: TemplateRef<any>, category: Category) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
    this.categoryIdForDelete = category.id;
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.categoryIdForDelete);
    this.modalRef.hide();
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

}
