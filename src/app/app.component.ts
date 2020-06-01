import { Component, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/service/user.service';
import { UserProfile } from './components/models/userProfile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'argon-dashboard-angular';

  constructor(private spin: NgxSpinnerService) {
  }

spinner() {
  this.spin.show();
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spin.hide();
  }, 1000);
}

}


