import { AdditionalProperties, Property } from '@tsed/schema';

export class Translation {
  @Property() private official: string;

  @Property() private common: string;
}

@AdditionalProperties(Translation)
export class Translations {
  [key: string]: Translation;
}
