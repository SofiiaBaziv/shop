import { Product } from './product.model';

export class ProductOrder {
    product: Product;
    count: number;

    constructor(product: Product, count: number) {
        this.product = product;
        this.count = count;
    }
}
