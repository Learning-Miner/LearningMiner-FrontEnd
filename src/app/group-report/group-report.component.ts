import {Component, OnInit} from '@angular/core';
import {Color, Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {UserService} from '../services/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'cm-group-report',
  templateUrl: './group-report.component.html',
  styleUrls: ['./group-report.component.css']
})
export class GroupReportComponent implements OnInit {

  baseId = '';

  public bubbleChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      labels: {
        fontSize: 50
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          min: 0,
          max: 1,
          fontSize: 50
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 1,
          fontSize: 50
        }
      }],
    }
  };
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;

  public bubbleChartData: ChartDataSets[] = [
    {
      data: [
        {x: 0.49, y: 0.49, r: 3},
        {x: 0.5, y: 1, r: 3},
        {x: 1, y: 0.5, r: 3},
        {x: 0.8, y: 0.2, r: 3},
        {x: 0.5, y: 0, r: 3},
      ],
      label: 'Investment Equities',
    },
  ];

  public bubbleChartColors: Color[] = [
    {
      backgroundColor: 'pink'
    }
  ];

  constructor(
    private service: UserService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.baseId = this.route.snapshot.params.baseId;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
