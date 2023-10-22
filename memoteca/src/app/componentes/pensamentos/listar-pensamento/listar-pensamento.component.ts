import { Component } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

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
  listaFavoritos: Pensamento[] = [];

  constructor(private service: PensamentoService, private router: Router) {}

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

  recarregarComponente() {
    this.favoritos = false;
    this.paginaAtual = 1;
    this.router.navigate([this.router.url]);
  }

  pesquisarPensamentos() {
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((respostaObservable) => {
        this.listaPensamentos = respostaObservable;
        this.listaFavoritos = respostaObservable;
      });
  }

  pesquisarFavoritos() {
    this.favoritos = true;
    this.pesquisarPensamentos();
  }
}
