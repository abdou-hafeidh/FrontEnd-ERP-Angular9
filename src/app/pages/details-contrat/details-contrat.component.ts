import { Component, OnInit, ViewChild } from '@angular/core';
import { ContratService } from 'src/service/contrat.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Contrat } from 'src/app/components/models/contrat';

@Component({
  selector: 'app-details-contrat',
  templateUrl: './details-contrat.component.html',
  styleUrls: ['./details-contrat.component.css']
})

export class DetailsContratComponent implements OnInit {

  cnt: any;
  dateOne: string;
  dateTwo: string;
  resultDate: any;
  tabRestJour: number[] = [];
  constructor(private contratService: ContratService) { }


  ngOnInit(): void {
    this.contratService.getAllContrat().subscribe(data => {
      this.cnt = data;
      this.cnt.forEach(element => {
      let  date1 = Date.parse(element.date_debut_contrat);
      let  date2 = Date.parse(element.date_fin_contrat);
      this.resultDate = (date2 - date1 ) / (24 * 60 * 60 * 1000) ;
      this.tabRestJour.push(this.resultDate);
      });


    });
  }

}
