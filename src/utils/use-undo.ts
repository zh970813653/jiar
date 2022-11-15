import { useState, useCallback } from "react";

export const useUndo = <T>(initialPresent: T) => {
  // 记录过去(历史操作)
  // const [past, setPast] = useState<T[]>([]);
  // // 记录当前的值
  // const [present, setPresent] = useState(initialPresent);
  // // 记录未来的值
  // const [future, setFuture] = useState<T[]>([]);
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const canUndo = !!state.past.length;
  const canRedo = !!state.future.length;

  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (!past.length) {
        return currentState;
      }
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (!future.length) {
        return currentState;
      }
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  // 对于set来说接收一个新的值
  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (newPresent === present) return currentState;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    return {
      past: [],
      present: newPresent,
      future: [],
    }
  }, []);
  return [
    { state },
    { set, reset, undo, redo, canRedo, canUndo },
  ];
};
