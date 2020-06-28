import { Component, OnInit } from '@angular/core';
import { Paiement } from 'src/app/components/models/paiement';
import { ToastrService } from 'ngx-toastr';
import { PaiementService } from 'src/service/paiement.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {

  form: Paiement = new Paiement();
  tpaiement: any;
  constructor(private toastr: ToastrService,
              private paiementService: PaiementService) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.form.type_paiement = this.tpaiement;
    this.paiementService.addPaiement(this.form).subscribe(data =>
      this.toastr.success('Paiement has been created successfully', 'Success!'),
       error => console.log(error)
    );
  }

  chooseRoles(event) {
    if (event.target.checked == true) {
      this.tpaiement.push(event.target.value);
    }
  }
}
