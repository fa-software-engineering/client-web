import { usePrimeVue } from 'primevue/config'


export type PrimeVueConfig = ReturnType<typeof usePrimeVue>['config'];

export const primeVueConfig: PrimeVueConfig = {
  ripple: true,
  locale: {
    firstDayOfWeek: 0,
    dateFormat: 'yy.mm.dd',
    monthNames: Array.from({ length: 12 }).map((_, i) =>
      new Date(0, i).toLocaleString('ru-RU', { month: 'long' }),
    ),
    monthNamesShort: Array.from({ length: 12 }).map((_, i) =>
      new Date(0, i).toLocaleString('ru-RU', { month: 'short' }),
    ),
    dayNames: Array.from({ length: 7 }).map((_, i) =>
      new Date(0, 0, 1 + i).toLocaleString('ru-RU', { weekday: 'long' }),
    ),
    dayNamesShort: Array.from({ length: 7 }).map((_, i) =>
      new Date(0, 0, 1 + i).toLocaleString('ru-RU', { weekday: 'short' }),
    ),
    dayNamesMin: Array.from({ length: 7 }).map((_, i) =>
      new Date(0, 0, 1 + i).toLocaleString('ru-RU', { weekday: 'short' }),
    ),
  },
};
