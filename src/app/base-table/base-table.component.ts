import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss'],
})
export class BaseTableComponent implements OnInit {
  data: any[] = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  //costruttore nel quale inserisco il mio servizo wrapper
  constructor(private apiService: ApiService) {
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngOnInit(): void {
    this.fetchData();
  }

  ngAfterViewInit() {
    // Collega sorting e paginazione al dataSource dopo che sono stati inizializzati
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  //funzioni

  // Funzione per ottenere i nomi delle colonne dei dati
  getColumnNames(): string[] {
    // Verifica se ci sono dati disponibili e ottieni i nomi delle colonne dal primo elemento
    if (this.data.length > 0) {
      return Object.keys(this.data[0]);
    } else {
      return [];
    }
  }
  fetchData(): void {
    const endpoint = '/posts';
    //opzionale (specifica quali parametri passare)
    const params = {};

    //effettuiamo la chiamata get utilizzando il servizio wrapper
    this.apiService.get(endpoint, params).subscribe(
      (response) => {
        this.data = response;
        this.dataSource.data = this.data;
      },
      (error) => {
        console.error('Errore durante il recupero dei dati', error);
      }
    );
  }
}
