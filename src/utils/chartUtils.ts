// Утилиты для преобразования данных между типами графиков

// Определим типы для данных
export interface ChartDataItem {
  name: string;
  [key: string]: string | number;
}

export interface PieDataItem {
  name: string;
  value: number;
}


/**
 * Преобразует данные для линейного графика в данные для круговой диаграммы
 */
export const convertToPieData = (
  lineData: ChartDataItem[], 
  valueKey: string
): PieDataItem[] => {
  if (!lineData || !Array.isArray(lineData)) return [];
  
  return lineData.map(item => ({
    name: String(item.name),
    value: Number(item[valueKey]) || 0
  }));
};

/**
 * Преобразует данные для круговой диаграммы в данные для линейного графика
 */
export const convertToLineData = (
  pieData: PieDataItem[], 
  dataKey: string = 'пользователи'
): ChartDataItem[] => {
  if (!pieData || !Array.isArray(pieData)) return [];
  
  return pieData.map(item => ({
    name: item.name,
    [dataKey]: item.value
  }));
};


/**
 * Проверяет, подходят ли данные для указанного типа графика
 */
export const isSuitableForChartType = (
  data: ChartDataItem[] | PieDataItem[] | undefined, 
  chartType: string
): boolean => {
  if (!data || !Array.isArray(data) || data.length === 0) return false;
  
  if (chartType === 'pie') {
    // Для круговой диаграммы нужны объекты с name и value
    return data.every((item: ChartDataItem | PieDataItem) => 
      item.name !== undefined && 
      (item as PieDataItem).value !== undefined
    );
  }
  
  // Для линейных и столбчатых графиков нужны объекты с name и числовыми значениями
  return data.every((item: ChartDataItem | PieDataItem) => {
    if (!item.name) return false;
    const chartItem = item as ChartDataItem;
    const numericKeys = Object.keys(chartItem).filter(key => 
      key !== 'name' && typeof chartItem[key] === 'number'
    );
    return numericKeys.length > 0;
  });
};