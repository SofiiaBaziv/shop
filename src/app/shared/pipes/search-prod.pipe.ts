import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProd'
})
export class SearchProdPipe implements PipeTransform {

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
      return c.category.name.toLowerCase().includes(searchParam.toLowerCase())
        || c.name.toLowerCase().includes(searchParam.toLowerCase())
        || c.mark.toLowerCase().includes(searchParam.toLowerCase());
    };
  }
}