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
  displayedColumns: string[] = [];
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
    const endpoint = 'GetLearning';
    let id = 1;
    let cognome = "Rossi";

    this.apiService.get(endpoint, id, cognome).subscribe(
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
          this.data = [];
          this.dataSource.data = this.data;
          this.displayedColumns = [];
        }
      },
      (error) => {
        console.error('Errore durante il recupero dei dati', error);
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
}
