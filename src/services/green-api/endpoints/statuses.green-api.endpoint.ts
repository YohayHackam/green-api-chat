import { MIDDLEWARE_URL } from 'configs';
import { greenAPI } from 'services/green-api/green-api.service';
import { SendTextStatusInterface, SendVoiceStatusInterface, SendingResponseInterface } from 'types';

export const statusesGreenApiEndpoints = greenAPI.injectEndpoints({
  endpoints: (builder) => ({
    sendTextStatus: builder.mutation<SendingResponseInterface, SendTextStatusInterface>({
      query: ({ idInstance, instanceUrl, sessionId, orgId, ...body }) => ({
        url: `${MIDDLEWARE_URL}/sendTextStatus`,
        method: 'POST',
        params: { instanceUrl, sessionId, orgId },
        body,
      }),
      invalidatesTags: () => {
        return ['statuses'];
      },
    }),
    sendVoiceStatus: builder.mutation<SendingResponseInterface, SendVoiceStatusInterface>({
      query: ({ idInstance, instanceUrl, sessionId, orgId, ...body }) => ({
        url: `${MIDDLEWARE_URL}/sendVoiceStatus`,
        method: 'POST',
        params: { instanceUrl, sessionId, orgId },
        body,
      }),
      invalidatesTags: () => {
        return ['statuses'];
      },
    }),
    sendMediaStatus: builder.mutation<SendingResponseInterface, SendVoiceStatusInterface>({
      query: ({ idInstance, instanceUrl, sessionId, orgId, ...body }) => ({
        url: `${MIDDLEWARE_URL}/sendMediaStatus`,
        method: 'POST',
        params: { instanceUrl, sessionId, orgId },
        body,
      }),
      invalidatesTags: () => {
        return ['statuses'];
      },
    }),
  }),
});
