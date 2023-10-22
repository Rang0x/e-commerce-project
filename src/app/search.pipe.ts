import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allProducts: Product[], userWord: string): Product[] {
    return allProducts.filter((product) => product.slug.toLowerCase().includes(userWord.toLowerCase()))
  }

}
