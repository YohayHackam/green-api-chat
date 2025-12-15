import { MIDDLEWARE_URL } from 'configs';

import { greenAPI } from 'services/green-api/green-api.service';
import {
  GetChatHistoryParametersInterface,
  GetChatHistoryResponse,
  LastMessagesParametersInterface,
} from 'types';

export const journalsGreenApiEndpoints = greenAPI.injectEndpoints({
  endpoints: (builder) => ({
    getChatHistory: builder.query<GetChatHistoryResponse, GetChatHistoryParametersInterface>({
      query: ({ idInstance, instanceUrl, sessionId, orgId, ...body }) => ({
        url: `${MIDDLEWARE_URL}/getChatHistory`,
        method: 'POST',
        params: { instanceUrl, sessionId, orgId },
        body,
      }),
      transformResponse: (res: GetChatHistoryResponse) =>
        res
          .filter(
            (msg) =>
              msg.typeMessage !== 'reactionMessage' &&
              msg.typeMessage !== 'deletedMessage' &&
              msg.typeMessage !== 'editedMessage'
          )
          .reverse(),
      providesTags: ['chatHistory'],
    }),
    lastIncomingMessages: builder.query<GetChatHistoryResponse, LastMessagesParametersInterface>({
      query: ({ minutes }) => ({
        url: `${MIDDLEWARE_URL}/lastIncomingMessages`,
        method: 'GET',
        params: {
          minutes,
        },
      }),
    }),
    lastOutgoingMessages: builder.query<GetChatHistoryResponse, LastMessagesParametersInterface>({
      query: ({ minutes }) => ({
        url: `${MIDDLEWARE_URL}/lastOutgoingMessages`,
        method: 'GET',
        params: {
          minutes,
        },
      }),
    }),
    lastMessages: builder.query<GetChatHistoryResponse, LastMessagesParametersInterface>({
      query: (params) => ({
        url: '',
        params,
      }),
      providesTags: ['lastMessages'],
    }),
  }),
});
