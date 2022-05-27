import {useCallback, useState} from 'react';

export default (initialState = false): [boolean, () => void, () => void] => {
  const [flag, setFlag] = useState(initialState);
  const enable = useCallback(() => setFlag(true), []);
  const disable = useCallback(() => setFlag(false), []);
  return [flag, enable, disable];
};
