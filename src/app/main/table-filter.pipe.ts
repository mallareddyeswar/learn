import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(items: any, filter: any, defaultFilter: boolean): any {
    if (!filter) {
      return items;
    }

    if (!Array.isArray(items)) {
      return items;
    }

    if (filter && Array.isArray(items)) {
      const filterKeys = Object.keys(filter);

      if (defaultFilter) {
        return items.filter(item =>
            filterKeys.reduce((x, keyName) =>
                // tslint:disable-next-line: triple-equals
                (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == '', true));
      } else {
        return items.filter(item => {
          return filterKeys.some((keyName) => {
            // tslint:disable-next-line: triple-equals
            return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == '';
          });
        });
      }
    }
  }

}