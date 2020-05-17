import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ChartDataSets, ChartOptions, ChartType, RadialChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'cm-individual-report',
  templateUrl: './individual-report.component.html',
  styleUrls: ['./individual-report.component.css']
})
export class IndividualReportComponent implements OnInit {

  baseId = '';
  data: any;
  student: any;

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    legend: {
      labels: {
        fontSize: 50
      }
    },
    scale: {
      pointLabels: {
        fontSize: 50
      },
      ticks: {
        fontSize: 50
      },
      gridLines: {
        lineWidth: 10
      },
      angleLines: {
        lineWidth: 10
      }
    },
  };
  public radarChartLabels: Label[] = [];

  public radarChartData: ChartDataSets[] = [];
  public radarChartType: ChartType = 'radar';
  public radarChartLegend = true;

  constructor(
    private service: UserService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.baseId = this.route.snapshot.params.baseId;
    if (localStorage.getItem('rol') === 'Student') {
      this.service.getStudentReportStudent(this.baseId).subscribe(res => {
        console.log(res[0]);
        this.student = res[0];
        this.radarChartLabels = res[0].topic_distribution.topic;
        this.radarChartData = [{data: res[0].topic_distribution.importances, label: 'Topic Distribution'}];
      }, err => {
        console.log(err);
      });
    } else {
      this.service.getStudentReportTeacher(this.baseId, localStorage.getItem('std_id')).subscribe(res => {
        console.log(res[0]);
        this.student = res[0];
        this.radarChartLabels = res[0].topic_distribution.topic;
        this.radarChartData = [{data: res[0].topic_distribution.importances, label: 'Topic Distribution'}];
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
