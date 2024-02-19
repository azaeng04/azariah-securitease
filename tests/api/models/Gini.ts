import { AdditionalProperties } from '@tsed/schema';

@AdditionalProperties({ type: Number })
export class Gini {
  [key: string]: number;
}
