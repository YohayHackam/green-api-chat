import { MIDDLEWARE_URL } from 'configs';
import { greenAPI } from 'services/green-api/green-api.service';
import {
  GetTemplateByIdParametersInterface,
  GetTemplatesResponseInterface,
  InstanceInterface,
  SendingResponseInterface,
  SendTemplateParameters,
  WabaTemplateResponseInterface,
} from 'types';

export const wabaGreenApiEndpoints = greenAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTemplates: builder.query<GetTemplatesResponseInterface, InstanceInterface>({
      query: ({ idInstance, apiTokenInstance, apiUrl }) => ({
        url: `${MIDDLEWARE_URL}/getTemplates`,
      }),
      providesTags: (result, __, argument) =>
        result
          ? [
              { type: 'wabaTemplates', id: argument.idInstance },
              { type: 'wabaTemplates', id: 'templates' },
            ]
          : [{ type: 'wabaTemplates', id: 'templates' }],
    }),
    getTemplateById: builder.query<
      WabaTemplateResponseInterface,
      GetTemplateByIdParametersInterface
    >({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: ({ idInstance, apiTokenInstance, rtkSessionId, apiUrl, mediaUrl: _, ...body }) => ({
        url: `${MIDDLEWARE_URL}/getTemplateById`,
        method: 'POST',
        body,
      }),
      providesTags: (result, _, arguments_) => {
        if (result) return [{ type: 'wabaTemplates', id: arguments_.templateId }];
        return [{ type: 'waSettings', id: 'WabaTemplate' }];
      },
    }),
    sendTemplate: builder.mutation<SendingResponseInterface, SendTemplateParameters>({
      query: ({ idInstance, apiTokenInstance, apiUrl, mediaUrl: _, ...body }) => ({
        url: `${MIDDLEWARE_URL}/sendTemplate`,
        method: 'POST',
        body,
      }),
    }),
  }),
});
