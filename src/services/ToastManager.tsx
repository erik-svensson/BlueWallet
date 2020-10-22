import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';

import { Toast as ToastComponent } from 'app/components/Toast';
import { selectors as toastMessagesSelectors } from 'app/state/toastMessages';

export const ToastManager = () => {
  const toastMessagesList = useSelector(toastMessagesSelectors.toastMessagesList);

  const renderToastComponents = () => {
    const toastMessagesToRender = toastMessagesList.filter(toast => {
      const now = dayjs().unix();
      return (
        dayjs(toast.createdAt)
          .add(toast.secondsAfterHide, 'second')
          .unix() <= now
      );
    });

    return toastMessagesToRender.map(toast => (
      <ToastComponent
        key={toast.createdAt}
        secondsAfterHide={toast.secondsAfterHide}
        title={toast.title}
        description={toast.description}
      />
    ));
  };

  return <>{renderToastComponents()}</>;
};
