import { XanoClient } from '@xano/js-sdk';

const xano = new XanoClient({
  apiUrl: import.meta.env.VITE_XANO_API_URL,
  apiKey: import.meta.env.VITE_XANO_API_KEY
});

export default xano;