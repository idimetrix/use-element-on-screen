import { useEffect, useRef, type RefObject } from "react";

type Callback = (entries: IntersectionObserverEntry[]) => void;

export const useIntersectionObserver = <T extends HTMLElement>(
  callback: Callback,
  options: IntersectionObserverInit = {
    rootMargin: "-20% 0% -75%",
    threshold: 0,
  },
): RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      callback(entries);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, [callback, options]);

  return ref;
};
