import { Pipe, PipeTransform } from '@angular/core';
import { orderGet } from '../models/orderGet.model';

@Pipe({
  name: 'orderFilter'
})
export class OrderFilterPipe implements PipeTransform {
  transform(data: orderGet[], searchText: string): orderGet[] {
    if(!data){
      return[];
    }
    if(!searchText){
      return data;
    }

    searchText=searchText.toLowerCase();

    return data.filter(item=>
      (item.productName.toLowerCase().includes(searchText)||
      item.brand.toLowerCase().includes(searchText)||item.fullName.toLowerCase().includes(searchText)||item.orderDate.toString().toLowerCase().includes(searchText)
      ||item.status.toLowerCase().includes(searchText)||item.orderNumber.toLowerCase().includes(searchText))
    );

  }
 
}
