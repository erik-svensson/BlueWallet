import { CONST } from 'app/consts';
import { formatDate, getTimezoneOffset, isAfter } from 'app/helpers/date';

export const getFormattedAirdropDate = () =>
  `${formatDate(CONST.airdropDate.local(), 'DD/MM/YYYY h a')} ${getTimezoneOffset()}`;

export const isAfterAirdrop = () => isAfter(new Date(), CONST.airdropDate);
