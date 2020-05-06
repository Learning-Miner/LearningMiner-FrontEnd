import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'cm-individual-report',
  templateUrl: './individual-report.component.html',
  styleUrls: ['./individual-report.component.css']
})
export class IndividualReportComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [];

  constructor(
    private service: UserService
  ) {
  }

  ngOnInit() {
    this.service.getStudentReportStudent().subscribe(res => {
      console.log(res[0]);
      this.barChartLabels = res[0].topic_distribution.topic;
      this.barChartPlugins = [{data: res[0].topic_distribution.importances, label: 'Topic Distribution'}];
    }, err => {
      console.log(err);
    });
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
