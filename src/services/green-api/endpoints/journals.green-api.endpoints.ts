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
      query: ({ idInstance, apiTokenInstance, apiUrl, mediaUrl: _, ...body }) => ({
        url: `${MIDDLEWARE_URL}/getChatHistory`,
        method: 'POST',
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
      query: ({ idInstance, apiTokenInstance, apiUrl, minutes }) => ({
        url: `${MIDDLEWARE_URL}/lastIncomingMessages`,
        method: 'GET',
        params: {
          minutes,
        },
      }),
    }),
    lastOutgoingMessages: builder.query<GetChatHistoryResponse, LastMessagesParametersInterface>({
      query: ({ idInstance, apiTokenInstance, apiUrl, minutes }) => ({
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
