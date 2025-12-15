import { MIDDLEWARE_URL } from 'configs';

import { greenAPI } from 'services/green-api/green-api.service';
import { instancesActions } from 'store/slices/instances.slice';
import {
  CheckWhatsappParametersInterface,
  GetQRResponseInterface,
  GetStateInstanceResponseInterface,
  GetWaSettingsResponseInterface,
  InstanceInterface,
  LogoutResponseInterface,
  SendMaxAuthCodeParametersInterface,
  StartAuthorizationResponseInterface,
} from 'types';

export const accountGreenApiEndpoints = greenAPI.injectEndpoints({
  endpoints: (builder) => ({
    getWaSettings: builder.query<
      GetWaSettingsResponseInterface,
      InstanceInterface & { rtkWaSettingsSessionKey?: number }
    >({
      query: () => ({
        url: `${MIDDLEWARE_URL}/getWaSettings`,
      }),
      keepUnusedDataFor: 1000,
      providesTags: (result, _, arguments_) => {
        if (result) return [{ type: 'waSettings', id: arguments_.idInstance }, 'lastMessages'];
        return [{ type: 'waSettings', id: 'waAccountSettings' }, 'lastMessages'];
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(instancesActions.setWaSettings(data));
        } catch {
          // ignore errors
        }
      },
    }),
    getAccountSettings: builder.query<
      GetWaSettingsResponseInterface,
      InstanceInterface & { rtkWaSettingsSessionKey?: number }
    >({
      query: () => ({
        url: `${MIDDLEWARE_URL}/getAccountSettings`,
      }),
      keepUnusedDataFor: 1000,
      providesTags: (result, _, arguments_) => {
        if (result) return [{ type: 'waSettings', id: arguments_.idInstance }, 'lastMessages'];
        return [{ type: 'waSettings', id: 'waAccountSettings' }, 'lastMessages'];
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(instancesActions.setWaSettings(data));
        } catch {
          // ignore errors
        }
      },
    }),
    getStateInstance: builder.query<GetStateInstanceResponseInterface, InstanceInterface>({
      query: () => ({
        url: `${MIDDLEWARE_URL}/getStateInstance`,
      }),
    }),
    getAuthorizationCode: builder.mutation<
      GetQRResponseInterface,
      CheckWhatsappParametersInterface
    >({
      query: ({ idInstance, ...body }) => ({
        url: `${MIDDLEWARE_URL}/getAuthorizationCode`,
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<LogoutResponseInterface, InstanceInterface>({
      query: () => ({
        url: `${MIDDLEWARE_URL}/logout`,
      }),
      invalidatesTags: (_, __, arguments_) => {
        return [{ type: 'waSettings', id: arguments_.idInstance }];
      },
    }),
    startAuthorization: builder.mutation<
      StartAuthorizationResponseInterface,
      CheckWhatsappParametersInterface
    >({
      query: ({ idInstance, ...body }) => ({
        url: `${MIDDLEWARE_URL}/startAuthorization`,
        method: 'POST',
        body,
      }),
    }),
    sendAuthorizationCode: builder.mutation<
      StartAuthorizationResponseInterface,
      SendMaxAuthCodeParametersInterface
    >({
      query: ({ idInstance, ...body }) => ({
        url: `${MIDDLEWARE_URL}/sendAuthorizationCode`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_, __, arguments_) => {
        return [{ type: 'waSettings', id: arguments_.idInstance }];
      },
    }),
  }),
});
