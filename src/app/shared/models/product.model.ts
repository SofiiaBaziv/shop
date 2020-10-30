import { Category } from './category.model';
import { Discount } from './discount.model';

export class Product {
    id: string;
    name: string;
    mark: string;
    date: string;
    country: string;
    price: number;
    weight: string;
    image: string;
    category: Category;
    discount: Discount;
}
