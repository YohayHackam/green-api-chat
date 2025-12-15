import { MIDDLEWARE_URL } from 'configs';
import { greenAPI } from 'services/green-api/green-api.service';
import {
  InstanceInterface,
  ReceiveNotificationResponseInterface,
  DeleteNotificationParameters,
  ResultResponseInterface,
  DownloadFileResponseInterface,
  GetChatInformationParameters,
} from 'types';

export const receivingGreenApiEndpoints = greenAPI.injectEndpoints({
  endpoints: (builder) => ({
    receiveNotification: builder.query<ReceiveNotificationResponseInterface, InstanceInterface>({
      query: () => ({
        url: `${MIDDLEWARE_URL}/receiveNotification`,
      }),
    }),
    deleteNotification: builder.mutation<ResultResponseInterface, DeleteNotificationParameters>({
      query: ({ receiptId }) => ({
        url: `${MIDDLEWARE_URL}/deleteNotification/${receiptId}`,
        method: 'DELETE',
      }),
    }),
    downloadFile: builder.mutation<DownloadFileResponseInterface, GetChatInformationParameters>({
      query: ({idInstance, ...body }) => ({
        url: `${MIDDLEWARE_URL}/downloadFile`,
        method: 'POST',
        body,
      }),
    }),
  }),
});
