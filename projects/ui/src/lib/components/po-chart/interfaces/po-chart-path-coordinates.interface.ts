/**
 * @docsPrivate
 *
 * @usedBy PoChartComponent
 *
 * @description
 *
 * Interface que define o objeto com as coordenadas das linhas do gráfico (chart-path).
 */
export interface PoChartPathCoordinates {
  /** Define as coordenadas da série. */
  coordinates: string;

  /** A série para a qual correspondem as coordenadas. */
  label?: string;

  /** O texto de exibição no tooltip. */
  tooltipLabel?: string;

  /** Valor da série. */
  data?: number;
}
