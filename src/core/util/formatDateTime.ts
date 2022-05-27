import dayjs from 'dayjs';
import {Millisecond} from '../Time';

export default function formatDateTime(d: Date | Millisecond): string {
  return dayjs(d).format('D MMM H:MM hh:mm');
}
