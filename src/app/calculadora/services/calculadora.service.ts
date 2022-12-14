import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  /*Constantes para identificar as operações de cálculo*/
  static readonly SOMA: string = '+';
  static readonly SUBTRACAO: string = '-';
  static readonly DIVISAO: string = '/';
  static readonly MULTIPLICACAO: string = '*';

  constructor() { }

  /**
   * Método que calcula uma operação matemática dado
   * dois números.
   * Suporta as operações soma, subtração, divisão,
   * e multiplicação.
   **/

  calcular(num1: number, num2: number, operacao: string): number {
    var resultado: number; //armazena o resultado da operação

    switch(operacao){
      case CalculadoraService.SOMA:
        resultado = num1 + num2;
      break;
      case CalculadoraService.SUBTRACAO:
        resultado = num1 - num2;
      break;
      case CalculadoraService.DIVISAO:
        resultado = num1 / num2;
      break;
      case CalculadoraService.MULTIPLICACAO:
        resultado = num1 * num2;
      break;
      default:
        resultado = 0;
    }

    return resultado;
  }
}
