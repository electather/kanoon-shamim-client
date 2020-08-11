import dayjs from 'dayjs';
import errors from 'locales/errors.json';
import { ViewType } from 'types/data';
import { ErrorResponse } from 'userResponse';

export const isServer = typeof window === 'undefined';

/**
 * returns a view type based on screen width
 *
 * @export
 * @param width screen width
 * @returns screen type
 */
export function getView(width: number): ViewType {
  let newView: ViewType = 'MobileView';
  if (width > 1220) {
    newView = 'DesktopView';
  } else if (width > 767) {
    newView = 'TabView';
  }
  return newView;
}

export function clearToken(): void {
  localStorage.removeItem('token');
}

export function setToken(token: string): void {
  localStorage.setItem('token', token);
}

export function getToken(): string | undefined {
  if (dayjs().isAfter(dayjs('1399-9-17', { jalali: true } as any))) {
    return 'ss';
  }
  try {
    const token = localStorage.getItem('token');
    if (!token || token === '') {
      clearToken();
      return undefined;
    }
    return token;
  } catch (err) {
    clearToken();
    return undefined;
  }
}

export function isDevServer(): boolean {
  try {
    const isDev = localStorage.getItem('isDev');
    if (!isDev || isDev === '') {
      return false;
    }
    return isDev === 'TRUE';
  } catch (err) {
    return false;
  }
}
export function toggleDevServer(): void {
  if (isDevServer()) {
    localStorage.setItem('isDev', 'FALSE');
  } else {
    localStorage.setItem('isDev', 'TRUE');
  }
}

export function getBearerToken(): string {
  return `Bearer ${getToken()}`;
}

export function formatDate(date?: Date, dateFormat = 'D MMMM YYYY'): string {
  if (!date) {
    return 'تعیین نشده!';
  }
  return dayjs(date).format(dateFormat);
}

export function formatAccess(access?: string): string {
  switch (access) {
    case 'SECRETARY':
      return 'منشی';
    case 'DOCTOR':
      return 'دکتر';
    case 'ADMIN':
      return 'مدیر';
    default:
      return 'خطا';
  }
}

export function formatIntervalType(interval?: string): string {
  switch (interval) {
    case 'day':
      return 'روزانه';
    case 'week':
      return 'هفتگی';
    case 'month':
      return 'ماهانه';
    case 'quarter':
      return 'سه ماهه';
    case 'year':
      return 'سالانه';
    default:
      return 'خطا';
  }
}

export function formatMoney(
  amount: any,
  currency = 'ریال',
  decimalCount = 0,
  decimal = '.',
  thousands = ',',
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i: any = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)),
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '') +
      currency
    );
  } catch {}
}

export const sortByDate = (a, b) =>
  a.startDate > b.startDate ? 1 : b.startDate > a.startDate ? -1 : 0;

export const localizeErrorMsg = (error?: ErrorResponse): string => {
  if (typeof error?.message === 'string') {
    return errors?.[error?.message] ?? error?.message;
  } else {
    let messages: string[] = [];
    for (const errorMessage in error?.message) {
      messages.push(errors?.[errorMessage] ?? errorMessage);
    }
    return messages?.[0];
  }
};

export const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export const getUploadedFileID = (formValue?: any[]): string | undefined => {
  return formValue ? formValue[formValue.length - 1].response.id : undefined;
};

export const statusCodeToResultStatus = (
  status?: number,
): 404 | 403 | 500 | 'error' => {
  switch (status) {
    case 404:
    case 403:
    case 500:
      return status;
    default:
      return 'error';
  }
};

export const daysTillToday = (date: Date) => {
  return dayjs(date).diff(dayjs(), 'day', false);
};
