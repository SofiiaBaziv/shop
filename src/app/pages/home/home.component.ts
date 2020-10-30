import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';
import { ProductOrder } from 'src/app/shared/models/product.order.model';
import { CartService } from '../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    images = ['https://firebasestorage.googleapis.com/v0/b/shop-63232.appspot.com/o/images%2F7777.png?alt=media&token=58e4ea15-d324-4d67-bd45-ef9c143f10b3',
        'https://firebasestorage.googleapis.com/v0/b/shop-63232.appspot.com/o/images%2F8888.png?alt=media&token=76aa888a-9a58-4d76-9e38-7ef9314de8da',
        'https://firebasestorage.googleapis.com/v0/b/shop-63232.appspot.com/o/images%2F9999.png?alt=media&token=472a1dd7-f1be-4820-a3e3-19f9801ed375'];
    modalRef: BsModalRef;
    allProducts: Array<Product> = [];
    products: Array<Product> = [];

    constructor(
        private modalService: BsModalService,
        private productService: ProductService,
        private cartService: CartService,
        private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            collection => {
                this.allProducts = collection.map(product => {
                    const data = product.payload.doc.data() as Product;
                    data.id = product.payload.doc.id;
                    return data;
                });
                const indexes = new Set<number>();
                while (indexes.size < 4) {
                    indexes.add(Math.floor(Math.random() * this.allProducts.length));
                }
                const productIndexes = Array.from(indexes);
                for (let i = 0; i < indexes.size; i++) {
                    this.products.push(this.allProducts[productIndexes[i]]);
                }
            }
        );
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, {
            class: 'modal-dialog-centered',
        });
    }

    addToCart(product) {
        const productOrder = new ProductOrder(product, 1);
        this.cartService.addToCart(productOrder);
        this.toastr.success('Продукт успішно додано до корзини', null, {
            positionClass: 'toast-bottom-full-width',
            timeOut: 1500
        });
    }
}
