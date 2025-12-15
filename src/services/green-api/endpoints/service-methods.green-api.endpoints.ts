import { MIDDLEWARE_URL } from 'configs';
import { greenAPI } from 'services/green-api/green-api.service';
import {
  CheckWhatsappParametersInterface,
  CheckWhatsappResponseInterface,
  EditMessageParameters,
  GetChatInformationParameters,
  GetContactInfoResponseInterface,
  RequestWithChatIdParameters,
  SendFileByUrlParametersInterface,
  SendingResponseInterface,
  UploadFileParametersInterface,
} from 'types';

export const serviceMethodsGreenApiEndpoints = greenAPI.injectEndpoints({
  endpoints: (builder) => ({
    checkWhatsapp: builder.mutation<
      CheckWhatsappResponseInterface,
      CheckWhatsappParametersInterface
    >({
      query: ({idInstance, instanceUrl, sessionId, orgId, ...body }) => ({
        url: `${MIDDLEWARE_URL}/checkWhatsapp`,
        method: 'POST',
        params: { instanceUrl, sessionId, orgId },
        body,
      }),
    }),
    uploadFile: builder.mutation<
      Pick<SendFileByUrlParametersInterface, 'urlFile'>,
      UploadFileParametersInterface
    >({
      query: ({idInstance, instanceUrl, sessionId, orgId, ...body }) => ({
        url: `${MIDDLEWARE_URL}/UploadFile`,
        method: 'POST',
        params: { instanceUrl, sessionId, orgId },
        headers: {
          'content-type': body.file.type,
        },
        body: body.file,
      }),
    }),
    getContactInfo: builder.query<GetContactInfoResponseInterface, RequestWithChatIdParameters>({
      query: ({idInstance, instanceUrl, sessionId, orgId, ...body }) => ({
        url: `${MIDDLEWARE_URL}/getContactInfo`,
        method: 'POST',
        params: { instanceUrl, sessionId, orgId },
        body,
      }),
      keepUnusedDataFor: 1000,
    }),
    deleteMessage: builder.mutation<void, GetChatInformationParameters>({
      query: ({idInstance, instanceUrl, sessionId, orgId, ...body }) => ({
        url: `${MIDDLEWARE_URL}/deleteMessage`,
        method: 'POST',
        params: { instanceUrl, sessionId, orgId },
        body,
      }),
    }),
    editMessage: builder.mutation<
      SendingResponseInterface,
      Omit<EditMessageParameters, 'onlySenderDelete'>
    >({
      query: ({idInstance, instanceUrl, sessionId, orgId, ...body }) => ({
        url: `${MIDDLEWARE_URL}/editMessage`,
        method: 'POST',
        params: { instanceUrl, sessionId, orgId },
        body,
      }),
    }),
  }),
});
