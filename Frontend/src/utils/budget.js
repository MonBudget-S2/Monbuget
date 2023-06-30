import { Block, CheckCircle, HourglassEmpty } from '@mui/icons-material';

const currentDate = new Date();

export const getDateStatus = (startDate, endDate) => {
  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  if (currentDate < parsedStartDate) {
    return 'Inactif';
  } else if (currentDate <= parsedEndDate) {
    return 'Actif';
  } else {
    return 'Terminé';
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'Inactif':
      return 'error';
    case 'Actif':
      return 'warning';
    case 'Terminé':
      return 'success';
    default:
      return 'default';
  }
};

export const getStatusIcon = (status) => {
  switch (status) {
    case 'Inactif':
      return <Block />;
    case 'Actif':
      return <HourglassEmpty />;
    case 'Terminé':
      return <CheckCircle />;
    default:
      return null;
  }
};
