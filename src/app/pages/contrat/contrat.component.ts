import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ClientService } from 'src/service/client.service';
import {map, startWith} from 'rxjs/operators';
import { Client } from 'src/app/components/models/client';
import { ContratService } from 'src/service/contrat.service';
import { Contrat } from 'src/app/components/models/contrat';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContratComponent implements OnInit {

  panelOpenState = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  form: Contrat = new Contrat();
  isLinear = true;
  public client: any;
  filteredOptions: any;
  myControl = new FormControl();
  idClient: any;
  constructor(private _formBuilder: FormBuilder,  private clientService: ClientService,
              private contratService: ContratService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      type_contrat: ['', Validators.required],
      nature_contrat: ['', Validators.required],
      date_debut_contrat: ['', Validators.required],
      date_fin_contrat: ['', Validators.required]
    });
    this.clientService.getAllClient().subscribe(data => {
      this.client = data;

      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nom_clt || value.prenom_clt),
        map(name => name ? this._filter(name) : this.client.slice())
      );
    });
  }

  displayFn(user: Client): string {
    if (user != null) {
      this.idClient = user.id;
    }
    return user && user.nom_clt  || user && user.prenom_clt ? user.nom_clt + ' ' + user.prenom_clt    : '';
  }

  private _filter(name: string): Client[] {
    const filterValue = name.toLowerCase();
    return this.client.filter(option =>
      option.nom_clt.toLowerCase().indexOf(filterValue) === 0 || option.prenom_clt.toLowerCase().indexOf(filterValue) === 0
    );
  }

  addContrat() {
    this.form.nom_client = this.myControl.value.id ;
    this.form.createdBy = sessionStorage.getItem('username');
    this.contratService.addContrat(this.form).subscribe( data => {
      this.toastr.success('Contrat has been created successfully', 'Success!');
      this.router.navigate(['/details-contrat']);
     },
       error => console.log(error)
    );
  }

}
