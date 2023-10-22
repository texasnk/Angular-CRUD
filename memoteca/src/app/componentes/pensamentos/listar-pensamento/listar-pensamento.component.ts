import { Component } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent {
  listaPensamentos: Pensamento[] = [];
  haMaisPensamentos: boolean = true;
  paginaAtual: number = 1;
  filtro: string = '';
  favoritos: boolean = false;

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((respostaObservable) => {
        this.listaPensamentos = respostaObservable;
      });
  }

  carregarMais() {
    this.service
      .listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((respostaObservable) => {
        if (respostaObservable.length === 0) {
          this.haMaisPensamentos = false;
        } else {
          this.listaPensamentos.push(...respostaObservable);
        }
      });
  }

  pesquisarPensamentos() {
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((respostaObservable) => {
        this.listaPensamentos = respostaObservable;
      });
  }

  pesquisarFavoritos() {
    this.favoritos = true;
    this.pesquisarPensamentos();
  }
}
