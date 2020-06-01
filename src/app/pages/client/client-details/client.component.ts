import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/service/client.service';
import { Client } from 'src/app/components/models/client';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  client: any;
  form: Client = new Client();
  formupdate: Client = new Client();
  closeResult = '';
  id: String;
  isdessable = false;
  isButtonVisible = true;
  ControleReception: FormGroup;
  displayedColumns: string[] = ['nom_clt', 'adresse_clt', 'date_nais_clt', 'email_clt', 'portable_clt', 'options'];
  dataSource: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private clientService: ClientService, private modalService: NgbModal,
              private toastr: ToastrService, private spinner: AppComponent, private formBuilder: FormBuilder,
              public dialog: MatDialog) {
                this.ControleReception = this.formBuilder.group({
                  nom_clt: ['', Validators.required],
                  prenom_clt: ['', Validators.required],
                  date_nais_clt: [''],
                  adresse_clt: [''],
                  fix_clt: [''],
                  fax_clt: [''],
                  portable_clt: [''],
                  email_clt: ['']
                },
                );
               }

  ngOnInit(): void {
    this.spinner.spinner();
    this.clientService.getAllClient().subscribe(data => {
      this.client = data;
      this.dataSource = new MatTableDataSource<Client>(this.client);
      this.dataSource.paginator = this.paginator;
      console.log(this.client);

    });
  }

  open(content, updateClient) {
    this.form = updateClient;
    this.id =  updateClient.id;
    this.isButtonVisible = true;
    this.controleReception(updateClient);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateClient(f) {
    this.form.nom_clt = f.value.nom_clt;
    this.form.prenom_clt = f.value.prenom_clt;
    this.form.date_nais_clt = f.value.date_nais_clt;
    this.form.adresse_clt = f.value.adresse_clt;
    this.form.fix_clt = f.value.fix_clt;
    this.form.fax_clt = f.value.fax_clt;
    this.form.portable_clt = f.value.portable_clt;
    this.form.email_clt = f.value.email_clt;
    this.clientService.updateClient(this.id, this.form).subscribe(data =>
      this.toastr.success('Client has been modifier successfully', 'Success!'),
       error => console.log(error));
       this.form = new Client();
  }

  affiche(content, client) {
    this.isButtonVisible = false;
    this.form = client;
    this.controleReception(client);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  controleReception(client) {
    this.ControleReception.setValue({
      nom_clt: client.nom_clt,
      prenom_clt: client.prenom_clt,
      date_nais_clt: client.date_nais_clt,
      adresse_clt: client.adresse_clt,
      fix_clt: client.fix_clt,
      fax_clt: client.fax_clt,
      portable_clt: client.portable_clt,
      email_clt: client.email_clt
    });
  }

  bannirClient(element) {
    this.id = element;
    this.form.id = element;
    this.clientService.bannirClient(this.id, this.form)
    .subscribe(data => {
      this.clientService.getAllClient().subscribe(data => {
        this.client = data;
        this.dataSource = new MatTableDataSource<Client>(this.client);
        this.dataSource.paginator = this.paginator;
      });
      this.toastr.success('Client has been successfully banned', 'Success!');
    },
    error => {
      console.log(error);
   });

  }

  debannirClient(element) {
    this.id = element;
    this.form.id = element;
    this.clientService.debannirClient(this.id, this.form)
    .subscribe(data => {
      this.clientService.getAllClient().subscribe(data => {
        this.client = data;
        this.dataSource = new MatTableDataSource<Client>(this.client);
        this.dataSource.paginator = this.paginator;
      });
      this.toastr.success('Client has been successfully activate', 'Success!');
    },
       error => {
         console.log(error);
      });

  }

}

