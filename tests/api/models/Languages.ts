import { AdditionalProperties } from '@tsed/schema';

@AdditionalProperties({ type: String })
export class Languages {
  [key: string]: string;
}
