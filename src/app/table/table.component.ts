import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { NotificationComponent } from '../notification/notification.component';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  filteredDataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = ['id', 'nome', 'sexo', 'altura', 'peso', 'dataNascimento', 'action'];
  searchValue: string = '';

  private overlayRef: OverlayRef | null = null;

  constructor(
    private serviceService: ProjectService,
    public dialog: MatDialog,
    private overlay: Overlay
  ) {}

  openDialog(data?: any): void {
    const dialogRef = this.dialog.open(AddModalComponent, {
      width: '300px',
      height: '530px',
      data: data
    });

    dialogRef.componentInstance.pessoaAdicionadaOuEditada.subscribe(result => {
      this.loadPessoas();
    });
  }

  ngOnInit(): void {
    this.loadPessoas();
    this.applyFilter();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.filteredDataSource;
  }

  public loadPessoas(): void {
    this.serviceService.retornaTodasPessoas().subscribe(data => {
      this.dataSource.data = data;
      this.applyFilter();
    }, error => {
      console.error('Erro ao carregar pessoas:', error);
    });
  }

  deletePessoa(id: number): void {
    this.serviceService.excluirPessoa(id).subscribe(() => {
      this.loadPessoas();
      this.showNotification('Pessoa excluída com sucesso.');
    }, error => {
      console.error('Erro ao excluir pessoa:', error);
      this.showNotification('Erro ao excluir pessoa.');
    });
  }

  mostrarPesoIdeal(id: number, event: MouseEvent): void {
    this.serviceService.mostrarPesoIdeal(id).subscribe((response: string) => {
      this.showNotification(response, event);
    }, (error) => {
      console.error("Erro ao buscar o peso ideal:", error);
      this.showNotification("Erro ao buscar o peso ideal.", event);
    });
  }

  applyFilter(): void {
    const filterValue = this.searchValue.trim().toLowerCase();
    this.filteredDataSource.data = this.dataSource.data.filter((item: any) => {
      return Object.values(item).some((value: any) =>
        value.toString().toLowerCase().includes(filterValue)
      );
    });
  }

  private showNotification(message: string, event?: MouseEvent): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(event ? { x: event.clientX, y: event.clientY } : { x: 0, y: 0 })
      .withPositions([{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -10
      }]);

    this.overlayRef = this.overlay.create({ positionStrategy });

    const notificationPortal = new ComponentPortal(NotificationComponent);
    const notificationComponentRef = this.overlayRef.attach(notificationPortal);
    notificationComponentRef.instance.message = message;

    setTimeout(() => this.overlayRef?.dispose(), 6000);
  }
}
