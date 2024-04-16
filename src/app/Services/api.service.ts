import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:44375';

  //costruttore che accetta un istanza di hhtpclient che usiamo per effettuare le chiamate
  constructor(private http: HttpClient) {}

  // Metodo per effettuare una chiamata GET generica
  //prende come parametri l'endpot e i parametri della chiamaya
  get(
    endpoint: string,
    params: { [key: string]: any } = {} // Accetta un oggetto di parametri
  ): Observable<any> {
    let queryParams = new HttpParams();

    // Aggiungi tutti i parametri forniti all'oggetto HttpParams
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.set(key, params[key]);
      }
    }

    // Effettua la richiesta HTTP con i parametri
    return this.http.get(`${this.baseUrl}/${endpoint}`, { params: queryParams });
  }

  // Metodo per effettuare una chiamata POST generica
  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data);
  }

  // Metodo per effettuare una chiamata PUT generica
  put(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${endpoint}`, data);
  }

  // Metodo per effettuare una chiamata DELETE generica
  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}`);
  }
}
