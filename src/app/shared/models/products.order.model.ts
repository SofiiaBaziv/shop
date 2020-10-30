import { ProductOrder } from './product.order.model';

export class ProductsOrder {
    id: string;
    products: Array<ProductOrder> = [];
    deliveryCity: string;
    deliveryAddress: string;
    deliveryPhone: string;
    firstName: string;
    lastName: string;

    constructor(
        products: Array<ProductOrder>,
        deliveryCity: string,
        deliveryAddress: string,
        deliveryPhone: string,
        firstName: string,
        lastName: string) {
        this.products = products;
        this.deliveryCity = deliveryCity;
        this.deliveryAddress = deliveryAddress;
        this.deliveryPhone = deliveryPhone;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
