import { useRef } from "react";
import { useAsyncEffect } from 'use-async-effect';

export default function usePoller(fn, delay, extraWatch) {
  const savedCallback = useRef();
  // Remember the latest fn.
  useAsyncEffect(() => {
    savedCallback.current = fn;
  }, [fn]);
  // Set up the interval.
  // eslint-disable-next-line consistent-return
  useAsyncEffect(() => {
    console.log("tick")
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
  // run at start too
  useAsyncEffect(() => {
    fn();
  },[ extraWatch ]);
}
