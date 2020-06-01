import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from 'src/service/client.service';
import { Client } from 'src/app/components/models/client';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/service/user.service';
import { LoginServiceService } from 'src/service/login-service.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {

  panelOpenState = false;
  isLinear = true;
  public users: any;
  form: Client = new Client();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  submitted = false;
  isSuccessful = false;
  constructor(private toastr: ToastrService, private _formBuilder: FormBuilder,
              private loginServiceService: LoginServiceService,
               private clientService: ClientService, private route: Router, private spinner: AppComponent) {

                this.firstFormGroup = this._formBuilder.group({
                  nomCtrl: ['', Validators.required],
                  prenomCtrl: ['', Validators.required],
                  dateCtrl: ['', Validators.required],
                  adresseCtrl: ['', Validators.required]
                });
                this.secondFormGroup = this._formBuilder.group({
                  fixCtrl: ['', Validators.required],
                  faxCtrl: ['', Validators.required],
                  telCtrl: ['', Validators.required],
                  emailCtrl: ['', Validators.email]
                });
               }

  ngOnInit(): void {
    this.loginServiceService.getUser().subscribe(data => {
      this.users = data ;
    });
  }


   addClient() {
    this.form.bannir = '1';
     this.form.createdBy = this.users.username;
     this.clientService.addClient(this.form).subscribe( data => {
       this.toastr.success('Client has been created successfully', 'Success!'),
       this.route.navigate(['/client']);
      },
        error => console.log(error)
     );
  }
}
