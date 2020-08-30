import { Component, OnInit } from '@angular/core';
import { Paiement } from 'src/app/components/models/paiement';
import { ToastrService } from 'ngx-toastr';
import { PaiementService } from 'src/service/paiement.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {

  form: Paiement = new Paiement();
  tpaiement: any;
  formGroup: FormGroup;
  submitted = false;
  constructor(private toastr: ToastrService,
    private paiementService: PaiementService,
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formGroup = this._formBuilder.group({
      date_paiement: ['', Validators.required],
      montant: ['', Validators.required],
      designation: ['', Validators.required],
      type_paiement: ['', Validators.required]
    });
  }

  onSubmit() {
    this.form.type_paiement = this.tpaiement;
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    this.paiementService.addPaiement(this.form).subscribe(data =>
      this.toastr.success('Paiement has been created successfully', 'Success!'),
      error => console.log(error)
    );
  }
  // convenience getter for easy access to form fields
  get f() { return this.formGroup.controls; }

  chooseRoles(event) {
    if (event.target.checked === true) {
      this.tpaiement.push(event.target.value);
    }
  }

  onReset() {
    this.submitted = false;
    this.formGroup.reset();
  }

}
