import { Property } from '@tsed/schema';

export class Idd {
  @Property()
  private root?: string;

  @Property()
  private suffixes?: string[];
}
