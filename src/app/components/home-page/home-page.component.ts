import { Component } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
    constructor(private service:StoreService){}
    
}
