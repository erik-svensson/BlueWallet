import { CONST } from 'app/consts';
import { formatDate, getTimezoneOffset } from 'app/helpers/date';

export const getFormattedAirdropDate = () =>
  `${formatDate(CONST.airdropDate.local(), 'DD/MM/YYYY h a')} ${getTimezoneOffset()}`;
