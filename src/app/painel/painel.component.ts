import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public instrucao = 'Traduza o texto:';
  public frases: Frase[] = FRASES;
  public resposta = '';
  public rodada = 0;
  public rodadaFrase: Frase;
  public progresso = 0;
  public tentativas = 3;
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.atualizarRodada();
  }

  ngOnDestroy() {
  }

  ngOnInit() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  public verificarResposta(): void {

    if (this.rodadaFrase.frasePtBr === this.resposta) {
      alert('A tradução está correta!');
      // Troca a frase
      this.rodada++;
      //  console.log(this.rodada);

      // Incrementa progresso
      this.progresso = this.progresso + (100 / this.frases.length);

      if (this.rodada === 4) {
        this.encerrarJogo.emit('vitoria');
      }
      // Atualiza a frase
      this.atualizarRodada();
      // console.log(this.rodadaFrase);

    } else {
      alert('A frase está errada!');
      this.tentativas--;
      if (this.tentativas === -1) {
        this.encerrarJogo.emit('derrota');
      }
    }
    // console.log('Verificar resposta: ', this.resposta);
  }

  public atualizarRodada(): void {
    // Atualiza a frase
    this.rodadaFrase = this.frases[this.rodada];
    // limpar a resposta
    this.resposta = '';
  }

}
