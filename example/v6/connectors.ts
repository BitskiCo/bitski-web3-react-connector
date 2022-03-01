import { InjectedConnector } from '@web3-react/injected-connector';
import { BitskiConnector } from 'bitski-web3-react-connector';

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

export const bitski = new BitskiConnector({
  clientId: 'd551e9cc-d393-40be-b444-8bc7da7a32b0',
  chainId: 1,
  callbackUrl: 'http://localhost:3000/callback.html'
});

