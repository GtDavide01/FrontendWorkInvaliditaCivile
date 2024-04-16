import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Persona } from 'src/app/Entities/Persona';
import LearningServiceService from 'src/app/Services/learning-service.service';

@Component({
  selector: 'app-learning-component',
  templateUrl: './learning-component.component.html',
  styleUrls: ['./learning-component.component.scss'],
})
export class LearningComponentComponent implements OnInit {
  data: any[] = [];
  isLoading: boolean = true;
  searchForm!: FormGroup;
  persona = new Persona(0, ''); // Inizializza una nuova istanza di Persona
  cognomePag!: string;
  pagination: boolean = true;
  page: number = 1;
  pageSize: number = 10;

  constructor(private learningService: LearningServiceService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true;
    this.learningService.getAllLearning().subscribe(
      (response) => {
        if (Array.isArray(response)) {
          this.data = response;
          this.isLoading = false;
        } else {
          console.error(
            'La risposta della chiamata API non è un array',
            response
          );
          this.isLoading = false;
        }
      },
      (error) => {
        console.error('Errore durante il recupero dei dati', error);
        this.isLoading = false;
      }
    );
  }

  search() {
    this.isLoading = true;
    this.learningService.getLearning(this.persona).subscribe(
      (response) => {
        if (Array.isArray(response)) {
          this.data = response;
          this.isLoading = false;
        } else {
          console.error(
            'la ripsosta della chiamata API non è un array',
            response
          );
          this.isLoading = false;
        }
      },
      (error) => {
        console.error('Errore durante il recupero dei dati', error);
        this.isLoading = false;
      }
    );
  }

  searchWithPagination() {
    this.isLoading = true;
    this.learningService.getLearningWithPagination(this.persona, this.pagination, this.page, this.pageSize).subscribe(
      (response) => {
        if (Array.isArray(response)) {
          this.data = response;
          this.isLoading = false;
        } else {
          console.error(
            'la ripsosta della chiamata API non è un array',
            response
          );
          this.isLoading = false;
        }
      },
      (error) => {
        console.error('Errore durante il recupero dei dati', error);
        this.isLoading = false;
      }
    );
  }
}
