import { Product } from 'src/app/shared/models/product.model';

export class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    wishlist: Array<Product>;
}
