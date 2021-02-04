import { Component, OnInit } from '@angular/core';
import { SalesDataService } from '../../services/sales-data.service';
import * as moment from 'moment';

// const SAMPLE_BARCHART_DATA: any[] = [
//   { data: [65, 59, 80, 81, 56, 54, 30], label: 'Q3 Sales'},
//   { data: [25, 39, 60, 91, 36, 54, 50], label: 'Q4 Sales'}
// ];

// const SAMPLE_BARCHART_LABELS: string[] = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  public barChartData: any[];
  public barChartLabels: string[];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  orders: any;
  orderLabels: string[];
  orderData: number;

  constructor(private _salesDataService: SalesDataService) { }

  ngOnInit(): void {
    this._salesDataService.getOrders(1, 100).subscribe
    (res => {
      // console.log(res['page']['data']);
      const localChartData = this.getChartData(res);
      this.barChartLabels = localChartData.map(date => date[0]).reverse();
      this.barChartData = [ {'data' : localChartData.map(order => order[1]) ,
    'label': 'Sales'}];
    })
  }

  getChartData(res: any) {
    this.orders = res['page']['data'];
    const data = this.orders.map(o => o.total);

    const formattedOrders = this.orders.reduce((r, e) => {
      r.push([moment(e.placed).format('YY-MM-DD'), e.total]);
      return r;
    }, []);

    const p = [];

    const chartData = formattedOrders.reduce((r, e) => {
      const key = e[0];
      if (!p[key]) {
        p[key] = e;
        r.push(p[key]);
      } else {
        p[key][1] += e[1];
      }
      return r;
    }, []);

    return chartData;
    
    
    // const myData = [3, 4, 5].reduce((sum, value) => {
    //   return sum + value;
    // }, 0 );

  }

}