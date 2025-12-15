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
      query: ({ idInstance, instanceUrl, sessionId, orgId, ...body }) => ({
        url: `${MIDDLEWARE_URL}/sendMessage`,
        method: 'POST',
        params: { instanceUrl, sessionId, orgId },
        body,
      }),
    }),
    sendContact: builder.mutation<SendingResponseInterface, SendContactParametersInterface>({
      query: ({ idInstance, instanceUrl, sessionId, orgId, ...body }) => ({
        url: `${MIDDLEWARE_URL}/sendContact`,
        method: 'POST',
        params: { instanceUrl, sessionId, orgId },
        body,
      }),
    }),
    sendLocation: builder.mutation<SendingResponseInterface, SendLocationParametersInterface>({
      query: ({ idInstance, instanceUrl, sessionId, orgId, ...body }) => ({
        url: `${MIDDLEWARE_URL}/sendLocation`,
        method: 'POST',
        params: { instanceUrl, sessionId, orgId },
        body,
      }),
    }),
    sendPoll: builder.mutation<SendingResponseInterface, SendPollParametersInterface>({
      query: ({ idInstance, instanceUrl, sessionId, orgId, ...body }) => ({
        url: `${MIDDLEWARE_URL}/sendPoll`,
        method: 'POST',
        params: { instanceUrl, sessionId, orgId },
        body,
      }),
    }),
    sendFileByUpload: builder.mutation<
      SendFileByUploadResponseInterface,
      SendFileByUploadParametersInterface
    >({
      query: ({ idInstance, instanceUrl, sessionId, orgId, ...body }) => ({
        url: `${MIDDLEWARE_URL}/sendFileByUpload`,
        method: 'POST',
        params: { instanceUrl, sessionId, orgId },
        body: getFormData(body),
        formData: true,
      }),
    }),
    sendInteractiveButtons: builder.mutation<
      SendingResponseInterface,
      SendInteractiveButtonsInterface
    >({
      query: ({ idInstance, instanceUrl, sessionId, orgId, ...body }) => {
        const buttonsWithId = body.buttons.map((button, index) => ({
          ...button,
          buttonId: (index + 1).toString(),
        }));

        return {
          url: `${MIDDLEWARE_URL}/sendInteractiveButtons`,
          method: 'POST',
          params: { instanceUrl, sessionId, orgId },
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
      query: ({ idInstance, instanceUrl, sessionId, orgId, ...body }) => {
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
