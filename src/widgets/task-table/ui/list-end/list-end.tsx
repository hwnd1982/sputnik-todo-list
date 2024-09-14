import {useEffect, useRef} from 'react';
import { useAppStore } from '../../../../app';

export const EndList = () => {
  const ref = useRef(null);
  const server = useAppStore.getState().server;

  useEffect(() => {
    let observerRefValue: HTMLInputElement | null = null;

    if (ref.current) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (server.state === 'fulfilled') {
            useAppStore.getState().nextPage();
          }
        }
      }, {
        rootMargin: '40px'
      });

      observer.observe(ref.current);
      observerRefValue = ref.current;

      return () => {
        if (observerRefValue) {
          observer.unobserve(observerRefValue);
        }
      };
    }
  }, [ref, server]);

  return (
    <div ref={ref} className='' />
  );
};

