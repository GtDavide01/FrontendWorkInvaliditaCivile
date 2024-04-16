import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  id!: number;
  cognome!: string;
  cognomePag!: string;
  pagination!: boolean;
  page!: number;
  pageSize!: number;

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
    this.learningService.getLearning(this.id, this.cognome).subscribe(
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
    this.learningService.getLearningWithPagination(this.cognomePag, this.pagination, this.page, this.pageSize).subscribe(
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
