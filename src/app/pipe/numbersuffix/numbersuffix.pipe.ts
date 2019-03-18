import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numbersuffix'
})
export class NumbersuffixPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var exp,
      suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];

    if (Number.isNaN(value)) {
      return null;
    }

    if (value < 1000) {
      return value;
    }

    exp = Math.floor(Math.log(value) / Math.log(1000));
    value
    return (value / Math.pow(1000, exp)).toFixed(args) +" "+ suffixes[exp - 1];
  }

}
