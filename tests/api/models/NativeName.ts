import { AdditionalProperties, Property } from '@tsed/schema';

export class NativeInformation {
  @Property()
  private official: string;
  public getOfficial(): string {
    return this.official;
  }

  @Property()
  private common: string;
}

@AdditionalProperties(NativeInformation)
export class NativeName {
  [key: string]: NativeInformation;
}
