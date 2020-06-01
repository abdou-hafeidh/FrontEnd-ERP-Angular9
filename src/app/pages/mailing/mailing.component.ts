import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MailRequest } from 'src/app/components/models/mailRequest';
import { UserService } from 'src/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from 'src/service/login-service.service';

@Component({
  selector: 'app-mailing',
  templateUrl: './mailing.component.html',
  styleUrls: ['./mailing.component.css']
})
export class MailingComponent implements OnInit {
  @Input() user: any;
  mailFormGroup: FormGroup;
  form: MailRequest = new MailRequest();
  public users: any;
  emailUser: any;
  constructor(private _formBuilder: FormBuilder, private userService: UserService, private toastr: ToastrService,
              private loginServiceService: LoginServiceService) {
                this.emailUser = sessionStorage.getItem('email');
    this.mailFormGroup = this._formBuilder.group({
      to: ['', Validators.required],
      subject: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loginServiceService.getUser().subscribe(data => {
      this.users = data ;
       });
  }

  reset() {
    this.form.to = '';
    this.form.subject = '';
    this.form.name = '';
    this.emailUser = '';
  }
  sendEmail() {
    this.form.to = this.emailUser;
    this.form.from = this.users.email;
    this.userService.sendMail(this.form).subscribe(data =>
      this.toastr.success('Email has been sent successfully', 'Success!'),
         error => console.log(error));
  }

}
