import { Component, OnInit } from '@angular/core';
import { SalesDataService } from 'src/app/services/sales-data.service';
import { Order } from 'src/app/shared/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[];
  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  constructor(private _salesService: SalesDataService) { }

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this._salesService.getOrders(this.page, this.limit)
      .subscribe(res => {
        this.orders = res['page']['data'];
        this.total = res['page'].total;
        this.loading = false;
      })
  }


  goToPrevious(): void {
    // console.log("Previous button clicked");
    if(this.page >= 0){
      this.page--;
      this.getOrders();
    }
  }

  goNext(): void {
    // console.log("Next button clicked");
    if(this.page < this.total){
      this.page++;
      this.getOrders();
    }
  }

  goToPage(n: number): void {
    this.page = n;
    this.getOrders();
  }
}
