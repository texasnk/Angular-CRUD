import { Router } from '@angular/router';
import { PensamentoService } from '../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component } from '@angular/core';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css'],
})
export class CriarPensamentoComponent {
  pensamento: Pensamento = {
    conteudo: '',
    autoria: '',
    modelo: '',
  };

  constructor(private service: PensamentoService, private router: Router) {}

  ngOnInit(): void {}

  Salvar() {
    this.service.criar(this.pensamento).subscribe(()=>{
      this.router.navigate(['/listarPensamento'])
    });
  }

  Cancelar() {}
}
