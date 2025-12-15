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
      query: ({ idInstance, instanceUrl, sessionId, orgId }) => ({
        url: `${MIDDLEWARE_URL}/getTemplates`,
        params: { instanceUrl, sessionId, orgId },

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
      query: ({ idInstance, instanceUrl, sessionId, orgId, rtkSessionId, ...body }) => ({
        url: `${MIDDLEWARE_URL}/getTemplateById`,
        method: 'POST',
        params: { instanceUrl, sessionId, orgId },
        body,
      }),
      providesTags: (result, _, arguments_) => {
        if (result) return [{ type: 'wabaTemplates', id: arguments_.templateId }];
        return [{ type: 'waSettings', id: 'WabaTemplate' }];
      },
    }),
    sendTemplate: builder.mutation<SendingResponseInterface, SendTemplateParameters>({
      query: ({ idInstance, instanceUrl, sessionId, orgId, ...body }) => ({
        url: `${MIDDLEWARE_URL}/sendTemplate`,
        params: { instanceUrl, sessionId, orgId },
        method: 'POST',
        body,
      }),
    }),
  }),
});
