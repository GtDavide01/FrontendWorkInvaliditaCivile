import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LearningServiceService {

  constructor(private ApiService : ApiService) { }

  // Metodi
  getAllLearning(): Observable<any> {
    return this.ApiService.get('GetAllLearning');
  }

  getLearning(id: number, cognome: string): Observable<any> {
    return this.ApiService.get('GetLearning', { id, cognome });
  }

  getLearningWithPagination(cognome: string, pagination: boolean, page: number, pageSize: number): Observable<any> {
    return this.ApiService.get('GetLearningWithPagination', {
      cognome,
      pagination,
      page,
      pageSize
    });
  }

}
export default LearningServiceService;
