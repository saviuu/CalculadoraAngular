import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from '../services';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  private _numero1: string;
  private _numero2: string;
  private _resultado: number;
  private _operacao: string;

  constructor(private _calculadoraService: CalculadoraService){}

  ngOnInit() {
    this.limpar();
  }

  /**
   * Inicializa todos os operadores para os valores padrão.
   *
   * @return void
   */
  limpar(): void {
    this._numero1 = '0';
    this._numero2 = null;
    this._resultado = null;
    this._operacao = null;
  }

   /**
   * Adiciona o número selecionado para o cálculo posteriormente.
   *
   * @param string numero
   * @return void
   */

  adicionarNumero(numero: string): void {
    this._operacao === null
    ? this._numero1 = this.concatenarNumero(this._numero1, numero)
    : this._numero2 = this.concatenarNumero(this._numero2, numero)
  }

  /**
   * Returna o valor concatenado. Trata o separador decimal.
   *
   * @param string numAtual
   * @param string numConcat
   * @return string
   */

  concatenarNumero(numAtual: string, numConcat: string): string {
    // caso contenha apenas '0' ou null, reinicia o valor
    if(numAtual === '0' || numAtual === null) numAtual = '';

    // primeiro dígito é '.', concatena '0' antes do ponto
    if(numConcat === '.' && numAtual === '') return '0.';

     // caso '.' digitado e já contenha um '.', apenas retorna
    if(numConcat === '.' && numAtual.indexOf('.') > -1) return numAtual;

    return numAtual + numConcat;
  }

  /**
   * Executa lógica quando um operador for selecionado.
   * Caso já possua uma operação selecionada, executa a
   * operação anterior, e define a nova operação.
   *
   * @param string operacao
   * @return void
   */

  definirOperacao(operacao: string): void {
     //Apenas define a operação caso não exista uma.
     if(this._operacao === null){
      this._operacao = operacao;
      return;
     }

     /* caso operação definida e número 2 selecionado,
       efetua o cálculo da operação */
     if(this._numero2 !== null){
      this._resultado = this._calculadoraService.calcular(
        parseFloat(this._numero1),
        parseFloat(this._numero2),
        this._operacao);
      this._operacao = operacao;
      this._numero1 = this._resultado.toString();
      this._numero2 = null;
      this._resultado = null;
     }
  }

   /**
   * Efetua o cálculo de uma operação.
   *
   * @return void
   */
  calcular(): void {
    if(this._numero2 === null) return;

    this._resultado = this._calculadoraService.calcular(
      parseFloat(this._numero1),
      parseFloat(this._numero2),
      this._operacao);
  }

  /**
   * Retorna o valor a ser exibido na tela da calculadora.
   *
   * @return string
   */
  get display(): string {
    if(this._resultado !== null) return this._resultado.toString();

    if(this._numero2 !== null) return this._numero2;

    return this._numero1;
  }


}
