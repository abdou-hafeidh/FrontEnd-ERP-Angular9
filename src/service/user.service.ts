import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MailRequest } from 'src/app/components/models/mailRequest';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpClient: HttpClient) { }

   URL1 = 'http://localhost:8080/user/listUsers';
   URL = 'http://localhost:8080/user/listMember';
   URL_UPDATE = 'http://localhost:8080/user/updateUser';
   URL_BAN = 'http://localhost:8080/user/bannirUser';
   URL_DEBAN = 'http://localhost:8080/user/debannirUser';
   URL_MAIL = 'http://localhost:8080/email/sendingEmail';

   getAllUser(): Observable<any> {
    return this.httpClient.get(this.URL1);
  }

  getUserByCreated() {
    let id = sessionStorage.getItem('id');
    return this.httpClient.get(`${this.URL}/${id}`);
  }


  updateUser(id: String, value: any): Observable<Object> {
    return this.httpClient.put(`${this.URL_UPDATE}/${id}`, value);
  }

  bannirUser(id: String, value: any): Observable<Object> {
    return this.httpClient.put(`${this.URL_BAN}/${id}`, value);
  }

  debannirUser(id: String, value: any): Observable<any> {
    return this.httpClient.put(`${this.URL_DEBAN}/${id}`, value);
  }

  sendMail(mailRequest: MailRequest) {
    return this.httpClient.post(`${this.URL_MAIL}`, mailRequest);
  }

}
