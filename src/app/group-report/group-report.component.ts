import {Component, OnInit} from '@angular/core';
import {Label, SingleDataSet} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType, RadialChartOptions} from 'chart.js';
import {UserService} from '../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {BubblePoint} from '../models/bubblePoint';
import {Chart} from 'chart.js';

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

  public barChartLabelsHorizontal: Label[] = [];
  public barChartDataHorizontal = [];
  public barChartLegendHorizontal = true;

  public barChartTypeHorizontal: ChartType = 'horizontalBar';

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
          },
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
      backgroundColor: '#25c1cc96'
    }];

  public chartColors2: any[] = [
    {
      backgroundColor: '#f6e3a0'
    }];

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartDataSimilarity = [];
  public barChartDataTime = [];

  public barChartLabelWords = [];
  public barChartDataWords = [];

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

      for (let i = 0; i < res[0].topics.length; i++) {
        if (res[0].topics[i].words.length !== 0) {
          this.barChartLabelWords.push(res[0].topics[i].words);
          this.barChartDataWords.push([
            {data: res[0].topics[i].importances, label: 'Words importances'},
            {data: res[0].topics[i].counts, label: 'Words counts'}]
          );
        }
      }
      console.log(this.barChartDataWords[0]);
      this.radarChartLabels = res[0].topics[0].words;
      this.radarChartData = [{data: res[0].topics[0].importances, label: 'Words importances'}];

      this.radarChartLabelsWordCount = res[0].topics[0].words;
      this.radarChartDataWordCount = [{data: res[0].topics[0].counts, label: 'Words count'}];

      this.barChartLabelsHorizontal = this.barChartLabels;
      this.barChartDataHorizontal = [{data: res[0].num_concepts_values, label: 'Concept numbers'}];
    }, err => {
      console.log(err);
    });
  }

}
