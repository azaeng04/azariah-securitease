import { Property } from '@tsed/schema';
import { NativeName } from './NativeName';

export class Name {
  @Property()
  private common: string;
  public getCommon(): string {
    return this.common;
  }

  @Property()
  private official: string;
  public getOfficial(): string {
    return this.official;
  }

  @Property()
  private nativeName?: NativeName;
  public getNativeName(): NativeName | undefined {
    return this.nativeName;
  }
}
