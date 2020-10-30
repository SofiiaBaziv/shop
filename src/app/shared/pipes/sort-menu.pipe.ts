import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortMenu'
})
export class SortMenuPipe implements PipeTransform {

  transform(value: Array<any>, searchParam: string): Array<any> {
    if (!searchParam) {
      return value;
    }
    if (!value) {
      return null;
    }
    return value.filter(this.sortBy(searchParam));
  }

  private sortBy(serchParam: string): (value: any, index: number, array: any[]) => unknown {
    return c => c.category.name.toLowerCase().includes(serchParam.toLowerCase());
  }

}
