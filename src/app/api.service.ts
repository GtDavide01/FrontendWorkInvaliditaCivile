import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  //costruttore che accetta un istanza di hhtpclient che usiamo per effettuare le chiamate
  constructor(private http: HttpClient) { }

  // Metodo per effettuare una chiamata GET generica
  //prende come parametri l'endpot e i parametri della chiamaya
  get(endpoint: string, params?: { [param: string]: string | string[] }): Observable<any> {
    let queryParams = new HttpParams();

    // Imposta eventuali parametri nella query string
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          if (Array.isArray(params[key])) {
            // Cast esplicito di params[key] a string[]
            (params[key] as string[]).forEach(value => {
              queryParams = queryParams.append(key, value);
            });
          }
        }
      });
    }

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
