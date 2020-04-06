import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cm-individual-report',
  templateUrl: './individual-report.component.html',
  styleUrls: ['./individual-report.component.css']
})
export class IndividualReportComponent implements OnInit {

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
