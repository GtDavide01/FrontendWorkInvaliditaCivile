import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Persona } from '../Entities/Persona';

@Injectable({
  providedIn: 'root'
})
export class LearningServiceService {

  constructor(private ApiService : ApiService) { }

  // Metodi
  getAllLearning(): Observable<any> {
    return this.ApiService.get('GetAllLearning');
  }

  getLearning(persona: Persona ): Observable<any> {
    return this.ApiService.get('GetLearning', { id: persona.id, cognome: persona.cognome });
  }

  getLearningWithPagination(persona: Persona,  pagination: boolean, page: number, pageSize: number): Observable<any> {
    return this.ApiService.get('GetLearningWithPagination', {
      persona,
      pagination,
      page,
      pageSize
    });
  }

}
export default LearningServiceService;
