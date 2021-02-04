import { Component, Input, OnInit } from '@angular/core';
import _ from 'lodash';
import { THEME_COLORS } from "../../shared/theme.colors";

const theme = 'Bright'

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {


  @Input() inputData: any;
  @Input() limit: number;

  pieChartData: number[];
  pieChartLabels: string[];
  colors: any[] = [
    {
      // backgroundColor: ['#26547x', '#ff6b6b', '#ffd166'],
      backgroundColor: this.themeColors(theme), 
      borderColor: '#111'
    }
  ];

  pieChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
    this.parseChartData(this.inputData, this.limit)
  }


  parseChartData(res: any, limit?: number) {
    const allData = res.slice(0, limit);
      //This is to map our data from the api in an agnostic way in sted of x => x['name] / x['state']
      this.pieChartData = allData.map(x => x[Object.keys(x)[1]] );
      this.pieChartLabels = allData.map(x => x[Object.keys(x)[0]] );
  }

  themeColors(setName: string): string[] {
    const color = THEME_COLORS.slice(0)
      .find(set => set.name === setName).colorSet;

      return color
  }

}
