import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://127.0.0.1:8080/system/';

  constructor(private http: HttpClient) {}

  retornaTodasPessoas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}listar-pessoas`)
  }

  retornarPessoa(id:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}listar-pessoa/${id}`)
  }

  adicionarPessoa(pessoa: any): Observable<any> {
    const url = `${this.apiUrl}adicionar-pessoa`;
    return this.http.post<any>(url, pessoa, { headers: { 'Content-Type': 'application/json' } });
  }

  editarPessoa(id: number, pessoa: any): Observable<any> {
    const url = `${this.apiUrl}atualizar-pessoa/${id}`;
    return this.http.patch<any>(url, pessoa, { headers: { 'Content-Type': 'application/json' } });
  }

  excluirPessoa(id: number): Observable<void> {
    const url = `${this.apiUrl}remover-pessoa/${id}`;
    return this.http.delete<void>(url, { headers: { 'Content-Type': 'application/json' } });
  }

  mostrarPesoIdeal(id: number): Observable<string> {
    const url = `${this.apiUrl}peso-ideal/${id}`;
    return this.http.get(url, { responseType: 'text' }).pipe();
  }
}
