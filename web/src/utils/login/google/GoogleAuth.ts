// GoogleAuth.ts
// Utility to load Google Identity Services and get ID token

export function loadGoogleScript() {
  if (document.getElementById('google-client-script')) return;
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  script.id = 'google-client-script';
  document.body.appendChild(script);
}

export function getGoogleIdToken(clientId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.accounts || !window.google.accounts.id) {
      reject('Google script not loaded');
      return;
    }
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response: any) => {
        if (response.credential) resolve(response.credential);
        else reject('No credential');
      },
    });
    window.google.accounts.id.prompt();
  });
}

declare global {
  interface Window {
    google: any;
  }
}
