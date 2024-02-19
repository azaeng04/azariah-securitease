import { Property } from '@tsed/schema';

export class Maps {
  @Property()
  private googleMaps: string;

  @Property()
  private openStreetMaps: string;
}
