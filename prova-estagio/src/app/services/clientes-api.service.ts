import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../components/clientes/Cliente';
import { catchError, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientesApiService {

  private clientesUrl: string = 'http://localhost:3000/clientes';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) { }

  findAllClientes(): Observable<Cliente[]> {
    setTimeout(() => { }, 2000);

    return this.http.get<Cliente[]>(this.clientesUrl).pipe(
      map((res) => {
        this.findAllSuccessMessage("");
        return res;
      }),
      catchError((er) => this.findAllErrorMessage(er)));
  }

  findOneCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.clientesUrl}/${id}`).pipe(
      map((res) => {
        this.findOneCliente(res);
        return res;
      }),
      catchError((er) => this.findOneErrorMessage(er)))
  }

  createCliente(c: Cliente) {
    // simula a geração de um id aleatório,
    // como ocorreria em um projeto real
    // OBS: neste caso há chances de repetição, 
    // então, é algo apenas para fins de simulação
    c.id = Date.now().toPrecision().toString().substring(10);

    return this.http.post<Cliente>(this.clientesUrl, {
      id: c.id,
      nome: c.nome,
      email: c.email,
      telefone: c.telefone
    }).pipe(
      map((res) => {
        setTimeout(() => {
          this.createSuccessMessage(res);
          this.router.navigate(['/clientes']);
        }, 3000);
      }),
      catchError((er) => { this.createErrorMessage(er); return er; })
    ).subscribe();
  }

  updateOneCliente(c: Cliente) {
    return this.http.put(`${this.clientesUrl}/${c.id}`, {
      id: c.id,
      nome: c.nome,
      email: c.email,
      telefone: c.telefone
    }).pipe(
      map((res) => {
        this.updateOneSuccessMessage(res);
        this.router.navigate(['/clientes'])
      }),
      catchError((er) => this.updateOneErrorMessage(er))
    ).subscribe();
  }

  deleteById(id) {
    return this.http.delete(`${this.clientesUrl}/${id}`).pipe(
      map((res) => {
        this.deleteByIdSuccessMessage(res);
        this.router.navigate(['/funcionarios'])
      }),
      catchError((er) => this.deleteByIdErrorMessage(er))
    ).subscribe();
  }

  /* 
   ****************************
   * Mensagens de confirmação *
   ****************************
  */

  // find all
  findAllErrorMessage(e: any): Observable<any> {
    this.exibirMensagem("Erro!", "Ocorreu um erro ao tentar acessar o servidor", "toast-error");
    return EMPTY;
  }

  findAllSuccessMessage(e: any): Observable<any> {
    this.exibirMensagem("Sucesso", "Registros encontrados com sucesso.", "toast-success");
    return EMPTY;
  }
  //create
  createErrorMessage(e: any): Observable<any> {
    this.exibirMensagem("Erro!", "Ocorreu um erro ao enviar o formulário para o servidor.", "toast-error");
    return EMPTY;
  }

  createSuccessMessage(e: any): Observable<any> {
    this.exibirMensagem("Sucesso", "O cadastro foi salvo com êxito!", "toast-success");
    return EMPTY;
  }
  //findone
  findOneSuccessMessage(e: any): Observable<any> {
    this.exibirMensagem("Sucesso", "O cliente foi encontrado com êxito.", "toast-success");
    return EMPTY;
  }

  findOneErrorMessage(e: any): Observable<any> {
    this.exibirMensagem("Erro!", "Id de cliente não encontrado, ou não existente.", "toast-error");
    return EMPTY;
  }
  // update
  updateOneSuccessMessage(e: any) {
    this.exibirMensagem("Sucesso", "O cadastro do cliente foi atualizado com êxito.", "toast-success");
    return EMPTY;
  }

  updateOneErrorMessage(e: any) {
    this.exibirMensagem("Erro!", "Houve um erro ao tentar atualizar o cadastro do cliente.", "toast-error");
    return EMPTY;
  }

  deleteByIdSuccessMessage(e: any) {
    this.exibirMensagem("Sucesso", "O cadastro do cliente foi excluído com êxito.", "toast-success");
    return EMPTY;
  }

  deleteByIdErrorMessage(e: any) {
    this.exibirMensagem("Erro!", "Houve um erro ao tentar excluir o cadastro do cliente.", "toast-error");
    return EMPTY;
  }


  exibirMensagem(titulo: string, mensagem: string, tipo: string) {
    this.toastr.show(mensagem, titulo, { closeButton: true, progressBar: true, timeOut: 4000 }, tipo)
  }
}