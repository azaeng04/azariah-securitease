import { AdditionalProperties, Property } from '@tsed/schema';

export class Demonym {
  @Property()
  private f: string;

  @Property()
  private m: string;
}

@AdditionalProperties(Demonym)
export class Demonyms {
  [key: string]: Demonym;
}
