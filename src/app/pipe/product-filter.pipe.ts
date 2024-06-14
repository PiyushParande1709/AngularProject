import { Pipe, PipeTransform } from '@angular/core';
import { stockGet } from '../models/stockGet.model';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(data: stockGet[], searchText: string): stockGet[] {
    if(!data){
      return[];
    }
    if(!searchText){
      return data;
    }

    searchText=searchText.toLowerCase();

    return data.filter(item=>
      (item.productName.toLowerCase().includes(searchText)||
      item.brand.toLowerCase().includes(searchText)||item.type.toLowerCase().includes(searchText)||item.price.toString().toLowerCase().includes(searchText)
      ||item.discription.toLowerCase().includes(searchText))
    );

  }

}
