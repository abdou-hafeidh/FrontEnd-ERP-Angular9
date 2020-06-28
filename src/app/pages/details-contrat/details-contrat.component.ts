import { Component, OnInit, ViewChild } from '@angular/core';
import { ContratService } from 'src/service/contrat.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Contrat } from 'src/app/components/models/contrat';
import { DatePipe } from '@angular/common';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-details-contrat',
  templateUrl: './details-contrat.component.html',
  styleUrls: ['./details-contrat.component.css']
})

export class DetailsContratComponent implements OnInit {

  cnt: any;
  dateOne: string;
  dateTwo: string;
  dts: any = new Date();
  resultDate: any;
  tabRestJour: number[] = [];

  constructor(private contratService: ContratService,
              private datepipe: DatePipe,
              private spinner: AppComponent) { }


  ngOnInit(): void {
    this.spinner.spinner();
    this.contratService.getAllContrat().subscribe(data => {
      this.cnt = data;
      this.cnt.forEach(element => {
      let  date1 = Date.parse(this.datepipe.transform(this.dts, 'yyyy-MM-dd'));
      let  date2 = Date.parse(this.datepipe.transform(element.date_fin_contrat, 'yyyy-MM-dd'));
      this.resultDate = (date2 - date1 ) / (24 * 60 * 60 * 1000) ;
      this.tabRestJour.push(this.resultDate);


      });
    });
  }


}
