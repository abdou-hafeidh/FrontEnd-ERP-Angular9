import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { UserService } from 'src/service/user.service';
import { ClientService } from 'src/service/client.service';
import { ContratService } from 'src/service/contrat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public usr: any;
  public cntr: any;
  public clt: any;
  public montant: any = 0;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  constructor(private userService: UserService,
              private clientService: ClientService,
              private contratService: ContratService) { }

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });

    this.userService.getAllUser().subscribe(data => {
      this.usr = data.numberOfElements;
    });

    this.clientService.getAllClient().subscribe(data => {
      this.clt = data.length;
    });

    this.contratService.getAllContrat().subscribe(data => {
      this.cntr = data;
      console.log(this.cntr);
       for (let i = 0; i <= this.cntr.length; i++) {
         this.montant += parseFloat(this.cntr[i].montant);
         console.log(this.montant);

       }
    });
  }

  public updateOptions()  {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
