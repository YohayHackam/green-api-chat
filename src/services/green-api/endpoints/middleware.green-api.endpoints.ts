import { MIDDLEWARE_URL } from 'configs';
import { greenAPI } from 'services/green-api/green-api.service';

interface GetGreenCredentialsParams {
  instanceUrl: string;
  sessionId: string;
  orgId: string;
  // ownerId: string;
}

interface GetGreenCredentialsResponse {
  idInstance: number;
  apiTokenInstance: string;
  apiUrl: string;
  mediaUrl: string;
}

export const middlewareGreenApiEndpoints = greenAPI.injectEndpoints({
  endpoints: (builder) => ({
    getGreenCredentials: builder.query<GetGreenCredentialsResponse, GetGreenCredentialsParams>({
      query: ({ instanceUrl, sessionId, orgId }) => ({
        url: `${MIDDLEWARE_URL}/getGreen`,
        params: { instanceUrl, sessionId, orgId },
      }),
    }),
  }),
});
