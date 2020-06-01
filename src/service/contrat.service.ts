import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contrat } from 'src/app/components/models/contrat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  constructor(private httpClient: HttpClient) { }

  URL = 'http://localhost:8080/contrat/';

  addContrat(contrat: Contrat): Observable<any> {
    return this.httpClient.post(`${this.URL}` + 'AddContrat', contrat);
  }

  getAllContrat(): Observable<any> {
    return this.httpClient.get(`${this.URL}` + 'ListContrat');
  }
}
