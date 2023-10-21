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

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {
    this.service.listar(this.paginaAtual).subscribe((respostaObservable) => {
      this.listaPensamentos = respostaObservable;
    });
  }

  carregarMais() {
    this.service.listar(++this.paginaAtual).subscribe((respostaObservable) => {
      if (respostaObservable.length === 0) {
        this.haMaisPensamentos = false;
      } else {
        this.listaPensamentos.push(...respostaObservable);
      }
    });
  }
}
