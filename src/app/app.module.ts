import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Correção aqui

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { BarComponent } from './bar/bar.component';
import { AddModalComponent } from './add-modal/add-modal.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card'; // Correção aqui
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field'; // Correção aqui
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker'; // Correção aqui
import { MatDialogModule } from '@angular/material/dialog'; // Correção aqui
import { MatInputModule } from '@angular/material/input'; // Correção aqui
import { MatButtonModule } from '@angular/material/button'; // Correção aqui
import { MatNativeDateModule } from '@angular/material/core';
import {ToastrModule} from "ngx-toastr";
import { NotificationComponent } from './notification/notification.component';
import {MatIcon} from "@angular/material/icon"; // Adicionado para suporte a datepicker

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    BarComponent,
    AddModalComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    FormsModule,
    MatIcon
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
