import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { GetWaSettingsResponseInterface, InstancesState, TariffsEnum, TypeInstance } from 'types';

const getInitialStateFromStorage = (): Partial<InstancesState> | null => {
  try {
    const params = new URLSearchParams(window.location.search);

    const idInstance = params.get('idInstance');
    const instanceUrl = params.get('instanceUrl');
    const sessionId = params.get('sessionId');
    const orgId = params.get('orgId');
    // const apiTokenInstance = params.get('apiTokenInstance');
    // const apiUrl = params.get('apiUrl');
    // const mediaUrl = params.get('mediaUrl');

    const initialStateFromStorage = localStorage.getItem('selectedInstance');
    const parsed = initialStateFromStorage
      ? (JSON.parse(initialStateFromStorage) as Partial<InstancesState>)
      : {};

    const selectedInstance =
      idInstance && instanceUrl && sessionId && orgId
        ? {
            idInstance: Number(idInstance),
            instanceUrl,
            sessionId,
            orgId,
          }
        : parsed.selectedInstance ?? undefined;

    return {
      selectedInstance,
      tariff: parsed.tariff,
      isChatWorking: parsed.isChatWorking ?? null,
      typeInstance: parsed.typeInstance ?? 'whatsapp',
      instanceList: parsed.instanceList ?? null,
    };
  } catch {
    return null;
  }
};

const initialState: InstancesState & { waSettings: GetWaSettingsResponseInterface | null } = {
  selectedInstance: {
    idInstance: 0,
    apiTokenInstance: '',
    apiUrl: '',
    mediaUrl: '',
    instanceUrl: '',
    sessionId: '',
    orgId: '',
  },
  tariff: TariffsEnum.Developer,
  isChatWorking: null,
  typeInstance: 'whatsapp',
  instanceList: null,
  isAuthorizingInstance: false,
  waSettings: null,
  ...getInitialStateFromStorage(),
};

export const instancesSlice = createSlice({
  name: 'instancesSlice',
  initialState,
  reducers: {
    setSelectedInstance: (
      state,
      action: PayloadAction<
        InstancesState['selectedInstance'] & {
          tariff: TariffsEnum;
          typeInstance: TypeInstance;
          isChatWorking?: boolean | null;
          // oppId?: string | undefined;
        }
      >
    ) => {
      const { tariff, isChatWorking, typeInstance, ...selectedInstance } = action.payload;
      state.selectedInstance = selectedInstance;
      state.tariff = tariff;

      if (isChatWorking !== undefined) {
        state.isChatWorking = isChatWorking;
      }

      if (typeInstance) {
        state.typeInstance = typeInstance;
      }
    },
    setIsChatWorking: (state, action: PayloadAction<InstancesState['isChatWorking']>) => {
      state.isChatWorking = action.payload;
    },
    setInstanceList: (state, action: PayloadAction<InstancesState['instanceList']>) => {
      state.instanceList = action.payload
        ? action.payload.filter((instance) => !instance.deleted)
        : null;
    },
    setIsAuthorizingInstance: (
      state,
      action: PayloadAction<InstancesState['isAuthorizingInstance']>
    ) => {
      state.isAuthorizingInstance = action.payload;
    },
    setWaSettings: (state, action: PayloadAction<GetWaSettingsResponseInterface | null>) => {
      state.waSettings = action.payload;
    },
  },
});

export const instancesActions = instancesSlice.actions;
export default instancesSlice.reducer;

export const selectInstance = (state: RootState) => state.instancesReducer.selectedInstance;
export const selectInstanceList = (state: RootState) => state.instancesReducer.instanceList;
export const selectTypeInstance = (state: RootState) => state.instancesReducer.typeInstance;
export const selectInstanceTariff = (state: RootState) => state.instancesReducer.tariff;
export const selectIsChatWorking = (state: RootState) => state.instancesReducer.isChatWorking;
export const selectIsAuthorizingInstance = (state: RootState) =>
  state.instancesReducer.isAuthorizingInstance;
export const selectWaSettings = (state: RootState) => state.instancesReducer.waSettings;
