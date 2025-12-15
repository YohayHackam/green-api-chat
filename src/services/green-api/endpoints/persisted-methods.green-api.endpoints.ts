import { MIDDLEWARE_URL } from 'configs';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  GetAvatarResponseInterface,
  GetGroupDataResponseInterface,
  GroupBaseParametersInterface,
  RequestWithChatIdParameters,
} from 'types';
import { isHydrateAction } from 'utils/hydrate';

export const persistedMethods = createApi({
  reducerPath: 'groupPersistentAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),

  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      if (action.key === reducerPath) {
        return action.payload;
      }

      return action.payload?.[persistedMethods.reducerPath] ?? undefined;
    }
  },
  tagTypes: ['groupData', 'avatar'],

  endpoints: (builder) => ({
    getGroupData: builder.query<GetGroupDataResponseInterface, GroupBaseParametersInterface>({
      query: ({ idInstance, instanceUrl, sessionId, orgId, ...body }) => ({
        url: `${MIDDLEWARE_URL}/getGroupData`,
        method: 'POST',
        params: { instanceUrl, sessionId, orgId },
        body,
      }),
      providesTags: (result, error, { groupId, chatId }) => [
        { type: 'groupData', id: chatId ?? groupId },
      ],
    }),
    getAvatar: builder.query<GetAvatarResponseInterface, RequestWithChatIdParameters>({
      query: ({ idInstance, instanceUrl, sessionId, orgId, ...body }) => ({
        url: `${MIDDLEWARE_URL}/getAvatar`,
        method: 'POST',
        params: { instanceUrl, sessionId, orgId },
        body,
      }),
      providesTags: (result, error, { chatId }) => [{ type: 'avatar', id: chatId }],
    }),
  }),
});
