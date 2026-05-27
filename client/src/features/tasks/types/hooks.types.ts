export type UseIntersectionObserverProps = {
  target: React.RefObject<Element | null>;
  onIntersect: () => void | Promise<unknown>;
  enabled?: boolean;
};
