import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

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
      return c.email.toLowerCase().includes(searchParam.toLowerCase())
        || c.firstName.toLowerCase().includes(searchParam.toLowerCase())
        || c.lastName.toLowerCase().includes(searchParam.toLowerCase());
    };
  }
}