import { useCallback } from 'react';
import type { RazorpayOptions } from '../types/menu';

export const useRazorpay = () => {
  const initializePayment = useCallback((options: RazorpayOptions) => {
    return new Promise((resolve, reject) => {
      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          if (window.Razorpay) {
            const razorpay = new window.Razorpay({
              ...options,
              handler: (response: any) => {
                resolve(response);
                options.handler(response);
              },
              modal: {
                ondismiss: () => {
                  reject(new Error('Payment cancelled'));
                }
              }
            });
            razorpay.open();
          }
        };
        script.onerror = () => {
          reject(new Error('Failed to load Razorpay script'));
        };
        document.body.appendChild(script);
      } else {
        const razorpay = new window.Razorpay({
          ...options,
          handler: (response: any) => {
            resolve(response);
            options.handler(response);
          },
          modal: {
            ondismiss: () => {
              reject(new Error('Payment cancelled'));
            }
          }
        });
        razorpay.open();
      }
    });
  }, []);

  return { initializePayment };
};