import { Property } from '@tsed/schema';

export class PostalCode {
  @Property()
  private format: string;

  @Property()
  private regex?: string;
}
