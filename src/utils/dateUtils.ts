import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, startOfYear, endOfYear, subQuarters, subYears, subMonths } from 'date-fns';

export const calculateDateRange = (range: string) => {
  const today = new Date();
  let fromDate: Date;
  let toDate: Date;

  switch (range) {
    case 'today':
      fromDate = today;
      toDate = today;
      break;

    case 'yesterday':
      fromDate = subDays(today, 1);
      toDate = subDays(today, 1);
      break;

    case 'this_week':
      fromDate = startOfWeek(today, { weekStartsOn: 1 });
      toDate = endOfWeek(today, { weekStartsOn: 1 });
      break;

    case 'this_month':
      fromDate = startOfMonth(today);
      toDate = endOfMonth(today);
      break;

    case 'last_month':
      fromDate = startOfMonth(subMonths(today, 1));
      toDate = endOfMonth(subMonths(today, 1));
      break;

    case 'this_quarter':
      fromDate = startOfQuarter(today);
      toDate = endOfQuarter(today);
      break;

    case 'this_year':
      fromDate = startOfYear(today);
      toDate = endOfYear(today);
      break;

    case 'last_quarter':
      fromDate = startOfQuarter(subQuarters(today, 1));
      toDate = endOfQuarter(subQuarters(today, 1));
      break;

    case 'last_year':
      fromDate = startOfYear(subYears(today, 1));
      toDate = endOfYear(subYears(today, 1));
      break;

    default:
      fromDate = startOfMonth(today);
      toDate = endOfMonth(today);
  }

  return {
    fromDate: format(fromDate, 'yyyy-MM-dd'),
    toDate: format(toDate, 'yyyy-MM-dd')
  };
};