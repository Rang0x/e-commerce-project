import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxLen'
})
export class MaxLenPipe implements PipeTransform {

  transform(value: string): string {
    return value.slice(0,11)
  }

}
