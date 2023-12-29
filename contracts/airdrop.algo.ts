import { Contract } from '@algorandfoundation/tealscript';

// eslint-disable-next-line no-unused-vars
class Airdrop extends Contract {
  public airdropValue = GlobalStateKey<number>();
  public subscribersList = GlobalStateKey<Account[]>();

  // Define a airdrop value on creatin
  createApplication(airdropValue: number): void {
    this.subscribersList.value = [];
    this.airdropValue.value = 1000;
  }

  //Get the airdrop value
  getAirdropValue(): number {
    return this.airdropValue.value;
  }

  //Get airdropSubscribers
  getAirdropSubscribers(): Account[] {
    return this.subscribersList.value;
  }

  public subscribeToList(): Account[] {
    this.subscribersList.value.push(this.app.address);
    return this.subscribersList.value;
  }
}
