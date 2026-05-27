import { useEffect, useRef } from "react";
import type { UseIntersectionObserverProps } from "../types/hooks.types";

export function useIntersectionObserver({
  target,
  onIntersect,
  enabled,
}: UseIntersectionObserverProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isObservingRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const element = target.current;

    if (!element) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry?.isIntersecting && !isObservingRef.current) {
        isObservingRef.current = true;

        Promise.resolve(onIntersect()).finally(() => {
          isObservingRef.current = false;
        });
      }
    });

    observerRef.current.observe(element);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [target, onIntersect, enabled]);
}
