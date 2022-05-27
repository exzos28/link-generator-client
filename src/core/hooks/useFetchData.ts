import {useCallback, useEffect, useState} from 'react';
import {observable, runInAction} from 'mobx';
import {Either} from '../fp';

export type UseFetchDataHookParams<R, E> = {
    request: () => Promise<Either<R, E>>;
}

export default function useFetchData<R, E>({request}: UseFetchDataHookParams<R, E>) {
    const [errorBox] = useState(() => observable.box<E | undefined>());
    const getError = useCallback(() => errorBox.get(), [errorBox]);
    const [resultBox] = useState(() => observable.box<R | undefined>());
    const getResult = useCallback(() => resultBox.get(), [resultBox]);
    const [loadingBox] = useState(() => observable.box(false));
    const getLoading = useCallback(() => loadingBox.get(), [loadingBox]);
    const reload = useCallback(async () => {
        runInAction(() => loadingBox.set(true));
        runInAction(() => resultBox.set(undefined));
        runInAction(() => errorBox.set(undefined));
        const result = await request();
        if (result.success) {
            runInAction(() => resultBox.set(result.right));
        } else {
            runInAction(() => errorBox.set(result.left));
        }
        runInAction(() => loadingBox.set(false));
    }, [request, resultBox, errorBox, loadingBox]);
    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        reload();
    }, [reload]);
    return {getError, getResult, getLoading, reload};
}
