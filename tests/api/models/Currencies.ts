import { AdditionalProperties, Property } from '@tsed/schema';

export class Currency {
  @Property()
  private name: string;

  @Property()
  private symbol: string;
}

@AdditionalProperties(Currency)
export class Currencies {
  [key: string]: Currency;
}
