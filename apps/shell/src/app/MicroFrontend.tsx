/* eslint-disable @typescript-eslint/ban-ts-comment */
import { globalState } from '@rf2/shared/global-state';
import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { microFrontendsConfig } from '../micro-frontends-config';
import { getMicroFrontend } from './micro-frontend-loader';

interface MicroFrontendPropTypes {
  name: string;
}

const MicroFrontend: React.FC<MicroFrontendPropTypes> = ({ name }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    let cancelLoading = false;
    let loadedModule = null;
    let unListen = null;
    let mounted = false;
    const element = ref.current;

    const config = microFrontendsConfig.find((mfc) => mfc.name === name);
    if (!name) return console.error(`SHELL: Cannot find micro frontend with name ${name}`);

    (async () => {
      try {
        loadedModule = await getMicroFrontend(config);
        if (cancelLoading) return;

        const { onParentNavigate } = loadedModule.mount(element, {
          onNavigate: ({ pathname: nextPathname, state: newState }) => {
            const { pathname } = history.location;
            if (pathname !== nextPathname) {
              history.push(nextPathname, newState);
            }
          },
          initialPath: history.location.pathname,
          initialPathState: history.location.state,
          sharedGlobalState: globalState,
        });

        mounted = true;
        unListen = history.listen(onParentNavigate);
      } catch (error) {
        console.error(`SHELL: Cannot load micro frontend, ${JSON.stringify(config)}, error: ${JSON.stringify(error)}`);
      }
    })();

    return () => {
      cancelLoading = true;

      if (unListen) unListen();
      if (loadedModule && mounted && loadedModule.unmount) loadedModule.unmount(element);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref}></div>;
};

export default MicroFrontend;
