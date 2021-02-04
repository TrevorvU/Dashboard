import { Component, OnInit } from '@angular/core';
import { SalesDataService } from 'src/app/services/sales-data.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  salesDataByCustomer: any;
  salesDataByState: any;

  constructor(private _salesDataService: SalesDataService) { }

  ngOnInit(): void {
    this._salesDataService.getOrdersByState().subscribe(res => {
      this.salesDataByState = res;
    });

    this._salesDataService.getOrdersByCustomer(5).subscribe(res => {
      this.salesDataByCustomer = res;
    })
  }


}
