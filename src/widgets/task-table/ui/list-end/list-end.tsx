import {useEffect, useRef} from 'react';
import { useAppStore } from '../../../../app';

export const EndList = () => {
  const ref = useRef(null);
  const {server, nextPage} = useAppStore.getState();

  useEffect(() => {
    let observerRefValue: HTMLInputElement | null = null;

    if (ref.current) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (server.state === 'fulfilled') {
            nextPage();
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
  }, [ref, server, nextPage]);

  return (
    <div ref={ref} className='' />
  );
};

