import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchOrd'
})
export class SearchOrdPipe implements PipeTransform {

  transform(value: Array<any>, searchParam: string): Array<any> {
    if (!searchParam) {
      return value;
    }
    if (!value) {
      return null;
    }
    return value.filter(this.sortBy(searchParam));
  }
  private sortBy(searchParam: string): (value: any, index: number, array: any[]) => unknown {
    return c => {
      return c.deliveryCity.toLowerCase().includes(searchParam.toLowerCase())
        || c.deliveryAddress.toLowerCase().includes(searchParam.toLowerCase())
        || c.deliveryPhone.toLowerCase().includes(searchParam.toLowerCase());
    };
  }
}