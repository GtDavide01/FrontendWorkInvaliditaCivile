import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss'],
})
export class BaseTableComponent implements OnInit {
  data: any[] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  id: number | undefined;
  cognome: string | undefined;
  isLoading: boolean = false;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private apiService: ApiService) {
    this.dataSource = new MatTableDataSource<any>([]);
  }


  ngOnInit(): void {
    this.fetchData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  fetchData(): void {
    this.isLoading = false;
    const endpoint = 'GetAllLearning';

    this.apiService.get(endpoint, this.id, this.cognome).subscribe(
      (response) => {
        if (Array.isArray(response)) {
          this.data = response;
          this.dataSource.data = this.data;
          this.displayedColumns = this.getColumnNames();
        } else {
          console.error(
            'La risposta della chiamata API non è un array',
            response
          );
          // Se la risposta non è un array, pulisci i dati e reimposta la tabella
          this.clearData();
        }
      },
      (error) => {
        console.error('Errore durante il recupero dei dati', error);
        this.isLoading = true;
      }
    );
  }
  fetchDataParams(): void{
    this.isLoading = false;
    const endpoint = 'GetLearning';

    this.apiService.get(endpoint, this.id, this.cognome).subscribe(
      (response) => {
        if (Array.isArray(response)) {
          this.data = response;
          this.dataSource.data = this.data;
          this.displayedColumns = this.getColumnNames();
        } else {
          console.error(
            'La risposta della chiamata API non è un array',
            response
          );
          // Se la risposta non è un array, pulisci i dati e reimposta la tabella
          this.clearData();
        }
      },
      (error) => {
        console.error('Errore durante il recupero dei dati', error);
        this.isLoading = true;
      }
    );
  }


  getColumnNames(): string[] {
    if (this.data.length > 0) {
      return Object.keys(this.data[0]);
    } else {
      return [];
    }
  }

  clearData(): void {
    this.data = [];
    this.dataSource.data = this.data;
    this.displayedColumns = [];
  }
}
