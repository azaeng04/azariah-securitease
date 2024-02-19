import { Property } from '@tsed/schema';

export class Flags {
  @Property()
  private png: string;

  @Property()
  private svg: string;

  @Property()
  private alt?: string;
}
