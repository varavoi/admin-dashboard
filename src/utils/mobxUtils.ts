import { toJS } from 'mobx';

/**
 * Преобразует MobX observable в обычный JavaScript объект
 * для совместимости с библиотеками, которые не работают с observable
 */
export const toPlainObject = <T>(obj: T): T => {
  return toJS(obj);
};

/**
 * Создает глубокую копию данных для графиков
 */
export const prepareChartData = (data: any) => {
  if (!data) return null;
  return toPlainObject(data);
};