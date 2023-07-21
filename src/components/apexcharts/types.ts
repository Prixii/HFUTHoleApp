export interface ApexChartsProps {
  options?: string
  injectedCSS?: string
  backgroundColor?: string
}

export interface Message {
  type: 'updateSeries' | 'updateOptions'
  data: Record<string, any>
}

export type ApexAxisChartSeries = {
  name?: string
  type?: string
  color?: string
  group?: string
  data:
    | (number | null)[]
    | {
        x: any
        y: any
        fillColor?: string
        strokeColor?: string
        meta?: any
        goals?: any
        barHeightOffset?: number
        columnWidthOffset?: number
      }[]
    | [number, number | null][]
    | [number, (number | null)[]][]
    | number[][]
}

export interface ApexChartsInstance {
  updateSeries: (newSeries: ApexAxisChartSeries[], animate?: boolean) => void
  updateOptions: (newOptions: any, redrawPaths?: boolean) => void
}
