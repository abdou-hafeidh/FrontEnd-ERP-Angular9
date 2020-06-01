import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from 'src/app/components/models/client';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) { }

  URL1 = 'http://localhost:8080/client/';

  getAllClient(): Observable<any> {
   return this.httpClient.get(`${this.URL1}` + 'listClient');
 }

 addClient(client: Client): Observable<any> {
   return this.httpClient.post(`${this.URL1}` + 'AddClient', client);
 }

 updateClient(id: String, value: any): Observable<any> {
   return this.httpClient.put(`${this.URL1}` + 'updateClient' + '/' + `${id}`, value);
 }

 bannirClient(id: String, value: any): Observable<Object> {
  return this.httpClient.put(`${this.URL1}` + 'bannirClient' + '/' + `${id}`, value);
}

debannirClient(id: String, value: any): Observable<any> {
  return this.httpClient.put(`${this.URL1}` + 'debannirClient' + '/' + `${id}`, value);
}
}
