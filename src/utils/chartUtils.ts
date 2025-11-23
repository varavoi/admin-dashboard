// Утилиты для преобразования данных между типами графиков

/**
 * Преобразует данные для линейного графика в данные для круговой диаграммы
 */
export const convertToPieData = (lineData: Array<{ name: string; [key: string]: number }>, valueKey: string) => {
  if (!lineData || !Array.isArray(lineData)) return [];
  
  return lineData.map(item => ({
    name: item.name,
    value: item[valueKey] || 0
  }));
};

/**
 * Преобразует данные для круговой диаграммы в данные для линейного графика
 */
export const convertToLineData = (pieData: Array<{ name: string; value: number }>, dataKey: string = 'пользователи') => {
  if (!pieData || !Array.isArray(pieData)) return [];
  
  return pieData.map(item => ({
    name: item.name,
    [dataKey]: item.value
  }));
};

/**
 * Проверяет, подходят ли данные для указанного типа графика
 */
export const isSuitableForChartType = (data: any, chartType: string): boolean => {
  if (!data || !Array.isArray(data) || data.length === 0) return false;
  
  if (chartType === 'pie') {
    // Для круговой диаграммы нужны объекты с name и value
    return data.every(item => item.name !== undefined && item.value !== undefined);
  }
  
  // Для линейных и столбчатых графиков нужны объекты с name и числовыми значениями
  return data.every(item => {
    if (!item.name) return false;
    const numericKeys = Object.keys(item).filter(key => key !== 'name' && typeof item[key] === 'number');
    return numericKeys.length > 0;
  });
};