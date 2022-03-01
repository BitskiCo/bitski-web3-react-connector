import {
  Actions,
  Connector,
} from '@web3-react/types';

const networkToChainId: { [network: string]: number } = {
  mainnet: 1,
  rinkeby: 4,
  polygon: 137,
  mumbai: 80001
};

interface BitskiConnectorArguments {
  clientId: string
  network?: 'mainnet' | 'rinkeby' | 'polygon' | 'mumbai'
  callbackUrl?: string
};

export class Bitski extends Connector {
  private readonly options: BitskiConnectorArguments;

  public bitski: any;

  constructor(actions: Actions, options: BitskiConnectorArguments) {
    super(actions);
    this.options = options;
  }

  public async activate(): Promise<void> {
    return this.initialize();
  }

  private async initialize(): Promise<void> {
    this.actions.startActivation();

    if (!this.bitski) {
      const { Bitski } = await import('bitski')
      this.bitski = new Bitski(
        this.options.clientId,
        this.options.callbackUrl,
      )
    }

    let chainId = 1;

    if (this.options.network) {
      chainId = networkToChainId[this.options.network];
    }

    const network = {
      networkName: this.options.network || 'mainnet',
      chainId,
    }

    this.provider = this.bitski.getProvider(network);
  };
}