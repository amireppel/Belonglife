import { useMemo } from 'react';
import { DisplaySetUpProps, } from '../types/countries';

const useDisplayListCountries = ({
  localData: { isLocalLoaded, localList },
  remoteData: { isRemoteError, isRemoteLoaded, remoteList },
  filter,
}: DisplaySetUpProps) => {
  const isError = isRemoteError;
  const isfinaliesd = !isError && isLocalLoaded && isRemoteLoaded;
  const displayList = useMemo(() => {
    let tempRemoteList = remoteList;
    if (isLocalLoaded && isRemoteLoaded) {
      tempRemoteList = remoteList.filter((remoteItem) =>
        !localList.some((localItem) => remoteItem.name.common === localItem.name.common));
    }
    return localList.concat(tempRemoteList);

  }, [isLocalLoaded, isRemoteLoaded, localList, remoteList, filter])

  return { isfinaliesd, isError, displayList };
};

export default useDisplayListCountries;