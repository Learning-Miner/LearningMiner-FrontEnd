import { Component, OnInit } from '@angular/core';
import {Color, Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';

@Component({
  selector: 'cm-group-report',
  templateUrl: './group-report.component.html',
  styleUrls: ['./group-report.component.css']
})
export class GroupReportComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  ];

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  public pieChartLabels: string[] = ['Chrome', 'Safari', 'Firefox', 'Internet Explorer', 'Other'];
  public pieChartData: number[] = [40, 20, 20 , 10, 10];
  public pieChartType = 'pie';

  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
