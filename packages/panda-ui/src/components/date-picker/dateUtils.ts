import { t } from '../../locale';

const localConfig = {
  dayAbbreviation: () => t('datePicker.weeksMin'),
  dayList: () => t('datePicker.weeks'),
  monthList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  monthLongList: () => t('datePicker.months'),
};

export const dateTimeFormat = {
  formatDisplay(date: Date) {
    var day = date.getDate();
    return `${localConfig.monthList[date.getMonth()]}-${day > 9 ? day : '0' + day} ${localConfig.dayList()[date.getDay()]}`;
  },
  formatDateDisplay(date: Date) {
    var day = date.getDate();
    return `${localConfig.monthList[date.getMonth()]}-${day > 9 ? day : '0' + day}`;
  },
  formatMonth(date: Date) {
    return `${date.getFullYear()} ${localConfig.monthLongList()[date.getMonth()]}`;
  },
  getWeekDayArray(firstDayOfWeek: number) {
    const beforeArray = [];
    const afterArray = [];
    const dayAbbreviation = localConfig.dayAbbreviation();
    for (let i = 0; i < dayAbbreviation.length; i++) {
      if (i < firstDayOfWeek) {
        afterArray.push(dayAbbreviation[i]);
      } else {
        beforeArray.push(dayAbbreviation[i]);
      }
    }
    return beforeArray.concat(afterArray);
  },
  getMonthList() {
    return localConfig.monthLongList();
  }
};

export function getDaysInMonth(d: Date) {
  const resultDate = getFirstDayOfMonth(d);

  resultDate.setMonth(resultDate.getMonth() + 1);
  resultDate.setDate(resultDate.getDate() - 1);

  return resultDate.getDate();
}

export function getFirstDayOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function getMonthArray(d: Date) {
  const length = 3;
  const months = [];
  let month = [];
  for (let i = 0; i < 12; i++) {
    month.push(new Date(d.getFullYear(), i, 1, d.getHours(), d.getMinutes()));
    if (month.length === length) {
      months.push(month);
      month = [];
    }
  }

  return months;
}

type Week = Array<Date | undefined>;
type WeekArray = Array<Week>;

export function getWeekArray(d: Date, firstDayOfWeek: number) {
  const dayArray: Date[] = [];
  const daysInMonth = getDaysInMonth(d);
  const weekArray: WeekArray = [];
  let week: Week = [];

  for (let i = 1; i <= daysInMonth; i++) {
    dayArray.push(new Date(d.getFullYear(), d.getMonth(), i, d.getHours(), d.getMinutes()));
  }

  const addWeek = (week: Week) => {
    const emptyDays = 7 - week.length;
    for (let i = 0; i < emptyDays; ++i) {
      week[weekArray.length ? 'push' : 'unshift'](undefined);
    }
    weekArray.push(week);
  };

  dayArray.forEach((day) => {
    if (week.length > 0 && day.getDay() === firstDayOfWeek) {
      addWeek(week);
      week = [];
    }
    week.push(day);
    if (dayArray.indexOf(day) === dayArray.length - 1) {
      addWeek(week);
    }
  });

  return weekArray;
}

export function addDays(d: Date, days: number) {
  const newDate = cloneDate(d);
  newDate.setDate(d.getDate() + days);
  return newDate;
}

export function addMonths(d: Date, months: number) {
  const newDate = cloneDate(d);
  newDate.setMonth(d.getMonth() + months);
  return newDate;
}

export function addYears(d: Date, years: number) {
  const newDate = cloneDate(d);
  newDate.setFullYear(d.getFullYear() + years);
  return newDate;
}

export function cloneDate(d: Date) {
  return new Date(d.getTime());
}

export function cloneAsDate(d: Date) {
  const clonedDate = cloneDate(d);
  clonedDate.setHours(0, 0, 0, 0);
  return clonedDate;
}

export function isBeforeDate(d1: Date, d2: Date) {
  const date1 = cloneAsDate(d1);
  const date2 = cloneAsDate(d2);

  return (date1.getTime() < date2.getTime());
}

export function isAfterDate(d1: Date, d2: Date) {
  const date1 = cloneAsDate(d1);
  const date2 = cloneAsDate(d2);

  return (date1.getTime() > date2.getTime());
}

export function isBetweenDates(dateToCheck: Date, startDate: Date, endDate: Date) {
  return (!(isBeforeDate(dateToCheck, startDate)) &&
    !(isAfterDate(dateToCheck, endDate)));
}

export function isEqualDate(d1: Date, d2: Date) {
  return d1 && d2 &&
    (d1.getFullYear() === d2.getFullYear()) &&
    (d1.getMonth() === d2.getMonth()) &&
    (d1.getDate() === d2.getDate());
}

export function monthDiff(d1: Date, d2: Date) {
  let m;
  m = (d1.getFullYear() - d2.getFullYear()) * 12;
  m += d1.getMonth();
  m -= d2.getMonth();
  return m;
}

export function yearDiff(d1: Date, d2: Date) {
  return ~~(monthDiff(d1, d2) / 12);
}

