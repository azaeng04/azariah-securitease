import { Property } from '@tsed/schema';

export class Car {
  @Property()
  private signs?: string[];

  @Property()
  private side: string;
}
