import { Component } from '@angular/core';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent {
  listaPensamentos = [
    {
      conteudo: 'Comunicação entre componentes',
      autoria: 'Dev',
      modelo: 'modelo2',
    },
    {
      conteudo: 'Comunicação teste',
      autoria: 'Dev 2',
      modelo: 'modelo1',
    }
  ];
}
