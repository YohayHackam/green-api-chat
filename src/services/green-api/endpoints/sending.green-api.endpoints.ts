import { MIDDLEWARE_URL } from 'configs';

import { greenAPI } from 'services/green-api/green-api.service';
import {
  SendMessageParametersInterface,
  SendingResponseInterface,
  SendFileByUploadResponseInterface,
  SendFileByUploadParametersInterface,
  SendContactParametersInterface,
  SendLocationParametersInterface,
  SendPollParametersInterface,
  SendInteractiveButtonsInterface,
} from 'types';
import { getFormData } from 'utils';

export const sendingGreenApiEndpoints = greenAPI.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<SendingResponseInterface, SendMessageParametersInterface>({
      query: ({ idInstance, apiTokenInstance, apiUrl, mediaUrl: _, ...body }) => ({
        url: `${MIDDLEWARE_URL}/sendMessage`,
        method: 'POST',
        body,
      }),
    }),
    sendContact: builder.mutation<SendingResponseInterface, SendContactParametersInterface>({
      query: ({ idInstance, apiTokenInstance, apiUrl, mediaUrl: _, ...body }) => ({
        url: `${MIDDLEWARE_URL}/sendContact`,
        method: 'POST',
        body,
      }),
    }),
    sendLocation: builder.mutation<SendingResponseInterface, SendLocationParametersInterface>({
      query: ({ idInstance, apiTokenInstance, apiUrl, mediaUrl: _, ...body }) => ({
        url: `${MIDDLEWARE_URL}/sendLocation`,
        method: 'POST',
        body,
      }),
    }),
    sendPoll: builder.mutation<SendingResponseInterface, SendPollParametersInterface>({
      query: ({ idInstance, apiTokenInstance, apiUrl, mediaUrl: _, ...body }) => ({
        url: `${MIDDLEWARE_URL}/sendPoll`,
        method: 'POST',
        body,
      }),
    }),
    sendFileByUpload: builder.mutation<
      SendFileByUploadResponseInterface,
      SendFileByUploadParametersInterface
    >({
      query: ({ idInstance, apiTokenInstance, mediaUrl, apiUrl: _, ...body }) => ({
        url: `${MIDDLEWARE_URL}/sendFileByUpload`,
        method: 'POST',
        body: getFormData(body),
        formData: true,
      }),
    }),
    sendInteractiveButtons: builder.mutation<
      SendingResponseInterface,
      SendInteractiveButtonsInterface
    >({
      query: ({ idInstance, apiTokenInstance, apiUrl, mediaUrl: _, ...body }) => {
        const buttonsWithId = body.buttons.map((button, index) => ({
          ...button,
          buttonId: (index + 1).toString(),
        }));

        return {
          url: `${MIDDLEWARE_URL}/sendInteractiveButtons`,
          method: 'POST',
          body: {
            ...body,
            buttons: buttonsWithId,
          },
        };
      },
    }),
    sendInteractiveButtonsReply: builder.mutation<
      SendingResponseInterface,
      SendInteractiveButtonsInterface
    >({
      query: ({ idInstance, apiTokenInstance, apiUrl, mediaUrl: _, ...body }) => {
        const buttonsWithId = body.buttons.map((button, index) => ({
          ...button,
          buttonId: (index + 1).toString(),
        }));

        return {
          url: `${MIDDLEWARE_URL}/sendInteractiveButtonsReply`,
          method: 'POST',
          body: {
            ...body,
            buttons: buttonsWithId,
          },
        };
      },
    }),
  }),
});
