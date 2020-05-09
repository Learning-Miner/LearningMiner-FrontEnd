import {Component, OnInit} from '@angular/core';
import {Label, SingleDataSet} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType, RadialChartOptions} from 'chart.js';
import {UserService} from '../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {BubblePoint} from '../models/bubblePoint';

@Component({
  selector: 'cm-group-report',
  templateUrl: './group-report.component.html',
  styleUrls: ['./group-report.component.css']
})
export class GroupReportComponent implements OnInit {

  baseId = '';

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

  public radarChartLabelsWordCount: Label[] = [];

  public radarChartDataWordCount: ChartDataSets[] = [];

  public polarAreaChartLabels: Label[] = [];
  public polarAreaChartData: SingleDataSet = [];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  public bubbleChartData: ChartDataSets[] = [];

  bubbleData: Array<any> = [];

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
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
            fontSize: 50,
          }
        }
      ],
      xAxes: [
        {
          display: true,
          ticks: {
            fontSize: 50,
          }
        }
      ]
    }
  };

  public chartColors: any[] = [
    {
      backgroundColor: '#FF7360'
    }];

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartDataSimilarity = [];
  public barChartDataTime = [];

  constructor(
    private service: UserService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.baseId = this.route.snapshot.params.baseId;
    this.service.getGroupReport(this.baseId).subscribe(res => {
      console.log(res);
      for (let i = 0; i < res[0].similarity_values.length; i++) {
        this.barChartLabels.push(i);
      }
      this.barChartDataSimilarity = [{data: res[0].similarity_values, label: 'Similarity values'}];
      this.barChartDataTime = [{data: res[0].time_used_values, label: 'Number of concepts values'}];

      this.radarChartLabels = res[0].topics[0].words;
      this.radarChartData = [{data: res[0].topics[0].importances, label: 'Words importances'}];

      this.radarChartLabelsWordCount = res[0].topics[0].words;
      this.radarChartDataWordCount = [{data: res[0].topics[0].counts, label: 'Words count'}];

      this.polarAreaChartLabels = this.barChartLabels;
      this.polarAreaChartData = res[0].num_concepts_values;
      this.bubbleChartData = [{data: this.bubbleData, label: 'Topics importances'}];
    }, err => {
      console.log(err);
    });
  }

}
