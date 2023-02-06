import { useCallback } from 'react';
import { useSafeState } from '.';
function useBooleanState(initialState) {
    const [state, setState] = useSafeState(initialState);
    const onSetTrue = useCallback(() => setState(true), []);
    const onSetFalse = useCallback(() => setState(false), []);
    return [state, onSetTrue, onSetFalse];
}
export default useBooleanState;
//# sourceMappingURL=useBooleanState.js.map