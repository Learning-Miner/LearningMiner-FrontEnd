import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'cm-individual-report',
  templateUrl: './individual-report.component.html',
  styleUrls: ['./individual-report.component.css']
})
export class IndividualReportComponent implements OnInit {

  baseId = '';
  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: false,
    legend: {
      labels: {
        fontSize: 50
      }
    },
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            fontSize: 50
          }
        }
      ],
      xAxes: [
        {
          display: true,
          ticks: {
            fontSize: 50
          }
        }
      ]
    }
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];

  constructor(
    private service: UserService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.baseId = this.route.snapshot.params.baseId;
    if (localStorage.getItem('rol') === 'Student') {
      this.service.getStudentReportStudent(this.baseId).subscribe(res => {
        this.barChartLabels = res[0].topic_distribution.topic;
        this.barChartData = [{data: res[0].topic_distribution.importances, label: 'Topic Distribution'}];
      }, err => {
        console.log(err);
      });
    } else {
      this.service.getStudentReportTeacher(this.baseId).subscribe(res => {
        this.barChartLabels = res[0].topic_distribution.topic;
        this.barChartData = [{data: res[0].topic_distribution.importances, label: 'Topic Distribution'}];
      }, err => {
        console.log(err);
      });
    }
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
