import {useCallback} from 'react';

export default function useOpenBlankWindow() {
    return useCallback((pathname: string) => {
        window.open(
            `${window.location.origin}${pathname}`,
            '_blank',
        );
    }, [])
}
