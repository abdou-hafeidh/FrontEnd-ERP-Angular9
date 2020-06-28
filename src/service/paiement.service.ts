import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paiement } from 'src/app/components/models/paiement';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  constructor(private httpClient: HttpClient) { }

  URL = 'http://localhost:8080/paiement/';

  addPaiement(paiement: Paiement): Observable<any> {
    return this.httpClient.post(`${this.URL}` + 'AddPaiement', paiement);
  }
}
