import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss'],
})
export class BaseTableComponent  implements OnChanges {
  @Input() data: any[] = [];
  @Input() pagination: boolean = true;
  @Input() page: number = 0;
  @Input() pageSize: number = 0;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.dataSource.data = changes['data'].currentValue;
      this.displayedColumns = this.getColumnNames();
    }

    if (this.pagination) {
      // Imposta il paginator solo se l'opzione di paginazione è abilitata
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // Imposta manualmente i valori di pageIndex e pageSize solo se non sono stati inizializzati dall'utente
      if (this.paginator && this.page !== undefined && this.pageSize !== undefined) {
        this.paginator.pageIndex = this.page;
        this.paginator.pageSize = this.pageSize;
      }
    } else {
      this.dataSource.paginator = null;
      this.dataSource.sort = this.sort;
    }
  }

  getColumnNames(): string[] {
    if (this.data && this.data.length > 0) {
      return Object.keys(this.data[0]);
    } else {
      return [];
    }
  }

  // Metodo chiamato quando l'utente cambia pagina o dimensione della pagina
  onPageChange(event: PageEvent) {
    // Assegna i nuovi valori di pagina e dimensione della pagina solo se l'opzione di paginazione è abilitata
    if (this.pagination) {
      this.page = event.pageIndex;
      this.pageSize = event.pageSize;
    }
  }
}
