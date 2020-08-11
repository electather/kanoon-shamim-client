import 'antd/es/date-picker/style';

import generateCalendar from 'antd/es/calendar/generateCalendar';
import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';

const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);

export default Calendar;
