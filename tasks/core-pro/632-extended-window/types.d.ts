declare global {
  interface Window {
    analytics: {
      trackEvent: (eventName: string) => void;
    }
  }
}

export {};
