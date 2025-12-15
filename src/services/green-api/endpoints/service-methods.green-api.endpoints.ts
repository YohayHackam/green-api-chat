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
      query: ({ idInstance, apiTokenInstance, apiUrl, mediaUrl: _, ...body }) => ({
        url: `${MIDDLEWARE_URL}/checkWhatsapp`,
        method: 'POST',
        body,
      }),
    }),
    uploadFile: builder.mutation<
      Pick<SendFileByUrlParametersInterface, 'urlFile'>,
      UploadFileParametersInterface
    >({
      query: ({ idInstance, apiTokenInstance, apiUrl, mediaUrl: _, ...body }) => ({
        url: `${MIDDLEWARE_URL}/UploadFile`,
        method: 'POST',
        headers: {
          'content-type': body.file.type,
        },
        body: body.file,
      }),
    }),
    getContactInfo: builder.query<GetContactInfoResponseInterface, RequestWithChatIdParameters>({
      query: ({ idInstance, apiTokenInstance, apiUrl, mediaUrl: _, ...body }) => ({
        url: `${MIDDLEWARE_URL}/getContactInfo`,
        method: 'POST',
        body,
      }),
      keepUnusedDataFor: 1000,
    }),
    deleteMessage: builder.mutation<void, GetChatInformationParameters>({
      query: ({ idInstance, apiTokenInstance, apiUrl, mediaUrl: _, ...body }) => ({
        url: `${MIDDLEWARE_URL}/deleteMessage`,
        method: 'POST',
        body,
      }),
    }),
    editMessage: builder.mutation<
      SendingResponseInterface,
      Omit<EditMessageParameters, 'onlySenderDelete'>
    >({
      query: ({ idInstance, apiTokenInstance, apiUrl, mediaUrl: _, ...body }) => ({
        url: `${MIDDLEWARE_URL}/editMessage`,
        method: 'POST',
        body,
      }),
    }),
  }),
});
