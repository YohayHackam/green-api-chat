import { useEffect } from 'react';

import { useAppSelector } from './redux.hook';
import { useIsMaxInstance } from './use-is-max-instance';
import { useGetWaSettingsQuery, useGetAccountSettingsQuery } from 'services/green-api/endpoints';
import { selectInstance, selectWaSettings } from 'store/slices/instances.slice';
import { GetWaSettingsResponseInterface } from 'types';

interface UseInstanceSettingsOptions {
  pollingInterval?: number;
}

interface UseInstanceSettingsResult {
  settings: GetWaSettingsResponseInterface | undefined;
  isLoading: boolean;
  error: unknown;
  isMax: boolean;
}

export const useInstanceSettings = ({
  pollingInterval,
}: UseInstanceSettingsOptions = {}): UseInstanceSettingsResult => {
  const isMax = useIsMaxInstance();
  const selectedInstance = useAppSelector(selectInstance);
  const manualWaSettings = useAppSelector(selectWaSettings);

  const skipWa = !selectedInstance?.idInstance ||  isMax;
  const skipAccount =
    !selectedInstance?.idInstance ||  !isMax;

  const {
    data: waSettings,
    isLoading: isWaLoading,
    error: waError,
    refetch: refetchWa,
  } = useGetWaSettingsQuery({ ...selectedInstance }, { skip: skipWa, pollingInterval });

  const {
    data: accountSettings,
    isLoading: isAccountLoading,
    error: accountError,
    refetch: refetchAccount,
  } = useGetAccountSettingsQuery({ ...selectedInstance }, { skip: skipAccount, pollingInterval });

  // Use manual waSettings from Redux as fallback when RTK Query data is not available
  const rtkSettings = isMax ? accountSettings : waSettings;
  const settings = rtkSettings ?? manualWaSettings ?? undefined;
  const isLoading = isMax ? isAccountLoading : isWaLoading;
  const error = isMax ? accountError : waError;
  const refetch = isMax ? refetchAccount : refetchWa;

  useEffect(() => {
    if (error && typeof error === 'object' && 'status' in error) {
      const status = error.status;
      if (status === 429) {
        const timeout = setTimeout(() => {
          refetch();
        }, 3000);
        return () => clearTimeout(timeout);
      }
    }
  }, [error, refetch]);

  return { settings, isLoading, error, isMax };
};
