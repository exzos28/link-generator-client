import React, {useEffect, useState} from 'react';
import {autorun} from 'mobx';
import {observer} from 'mobx-react-lite';
import RootContext from './RootContext';
import {CoreService} from '../Core';
import {Root} from './Root';
import {Service} from '../structure';
import RootService from "./RootService";

export type RootProviderProps = {
  children: React.ReactNode;
};

export default observer((props: RootProviderProps) => {
  const {children} = props;
  const [core] = useState(() => new CoreService());
  useEffect(() => core.subscribe(), [core]);
  const [root, setRoot] = useState<Root & Service>();
  useEffect(
    () =>
      autorun(() => {
        if (core.initialized) {
          setRoot(_root => _root ?? new RootService(core));
        }
      }),
    [core],
  );
  useEffect(() => root?.subscribe(), [root]);
  return root ? (
    <RootContext.Provider value={root}>{children}</RootContext.Provider>
  ) : null;
});
