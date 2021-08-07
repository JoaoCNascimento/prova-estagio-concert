import { Injectable } from '@angular/core';
import { Funcionario } from '../components/funcionarios/Funcionario';
import { HttpClient } from '@angular/common/http';
import { map, catchError, take, tap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosApiService {

  private funcionariosUrl: string = 'http://localhost:3000/funcionarios';

  constructor(
    private http: HttpClient,
    private toaster: ToastrService,
    private router: Router
  ) { }

  findAllFuncionarios(): Observable<Funcionario[]> {
    setTimeout(() => { }, 2000);

    return this.http.get<Funcionario[]>(this.funcionariosUrl).pipe(
      map(res => {
        this.findAllSuccessMessage("");
        return res;
      }),
      catchError(err => this.findAllErrorMessage(err))
    );
  }

  findOneFuncionario(id): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.funcionariosUrl}/${id}`).pipe(
      map(res => {
        this.findOneSuccessMessage(res);
        return res;
      }),
      catchError(er => this.findOneErrorMessage(er))
    );
  }

  // lê os ids dos objetos e retorna um id novo
  // para evitar repeticao
  // OBS: fiz essa façanha apenas para fins de funcionamento adequado
  // do JSON server XD

  createFuncionario(f: Funcionario) {
    // simula a geração de um id aleatório,
    // como ocorreria em um projeto real
    // OBS: neste caso há chances de repetição, 
    // então, é algo apenas para fins de simulação
    f.id = Date.now().toPrecision().toString().substring(10);

    return this.http.post<Funcionario>(this.funcionariosUrl, {
      id: f.id,
      nome: f.nome,
      email: f.email,
      nascimento: f.nascimento,
      sexo: f.sexo,
      senioridade: f.senioridade,
      areaDeAtuacao: f.areaDeAtuacao
    }).pipe(
      map(res => {
        setTimeout(() => {
          this.createSuccessMessage(res);
          this.router.navigate(['/funcionarios']);
        }, 3000)
      }),
      catchError(er => this.createErrorMessage(er))
    ).subscribe();
  }

  updateOneFuncionario(f: Funcionario) {
    return this.http.put<Funcionario>(`${this.funcionariosUrl}/${f.id}`, {
      id: f.id,
      nome: f.nome,
      email: f.email,
      nascimento: f.nascimento,
      sexo: f.sexo,
      senioridade: f.senioridade,
      areaDeAtuacao: f.areaDeAtuacao
    }).pipe(
      map((res) => {
        this.updateOneSuccessMessage(res);
        this.router.navigate(['/funcionarios'])
      }),
      catchError((er) => this.updateOneErrorMessage(er))
    ).subscribe();
  }

  deleteById(id) {
    return this.http.delete<Funcionario>(`${this.funcionariosUrl}/${id}`).pipe(
      map((res) => {
        this.deleteByIdSuccessMessage(res);
        this.router.navigate(['/funcionarios'])
      }),
      catchError((er) => this.deleteByIdErrorMessage(er))
    ).subscribe()
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
    this.exibirMensagem("Sucesso", "O funcionário foi encontrado com êxito.", "toast-success");
    return EMPTY;
  }

  findOneErrorMessage(e: any): Observable<any> {
    this.exibirMensagem("Erro!", "Id de funcionário não encontrado, ou não existente.", "toast-error");
    return EMPTY;
  }

  //update
  updateOneSuccessMessage(e: any) {
    this.exibirMensagem("Sucesso", "O cadastro do funcionário foi atualizado com êxito.", "toast-success");
    return EMPTY;
  }

  updateOneErrorMessage(e: any) {
    this.exibirMensagem("Erro!", "Houve um erro ao tentar atualizar o cadastro do funcionário.", "toast-error");
    return EMPTY;
  }

  // delete
  deleteByIdSuccessMessage(e: any) {
    this.exibirMensagem("Sucesso", "O cadastro do funcionário foi excluído com êxito.", "toast-success");
    return EMPTY;
  }

  deleteByIdErrorMessage(e: any) {
    this.exibirMensagem("Erro!", "Houve um erro ao tentar excluir o cadastro do funcionário.", "toast-error");
    return EMPTY;
  }


  exibirMensagem(titulo: string, mensagem: string, tipo: string) {
    this.toaster.show(mensagem, titulo, { closeButton: true, progressBar: true, timeOut: 4000 }, tipo)
  }
}
