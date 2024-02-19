import "@tsed/ajv";
import { Currencies } from "./Currencies";
import { Demonyms } from "./Demonyms";
import { Languages } from "./Languages";
import { Name } from "./Name";
import { Translations } from "./Translations";
import { AdditionalProperties, Property, Required, getJsonSchema } from "@tsed/schema";
import { Maps } from "./Maps";
import { Gini } from "./Gini";
import { Car } from "./Car";
import { Flags } from "./Flags";
import { CoatOfArms } from "./CoatOfArms";
import { CapitalInfo } from "./CapitalInfo";
import { PostalCode } from "./PostalCode";
import { Idd } from "./Idd";
import { PlatformTest } from "@tsed/common";
import Ajv from "ajv";

@AdditionalProperties(Name)
export class Country {
  @Property(Name)
  private name: Name;
  public getName(): Name {
    return this.name;
  }

  @Property()
  private tld?: string[];

  @Property()
  private cca2: string;

  @Property()
  private ccn3?: string;

  @Property()
  private cca3: string;

  @Property()
  private cioc?: string;

  @Property()
  private independent?: boolean;

  @Property()
  private status: string;

  @Property()
  private unMember: boolean;

  @Property()
  private currencies?: Currencies;

  @Property()
  private idd: Idd;

  @Property()
  private capital?: string[];

  @Property()
  private altSpellings: string[];

  @Property()
  private region: string;

  @Property()
  private subregion?: string;

  @Property(Languages)
  private languages?: Languages;
  public getLanguages(): Languages {
    return this.languages;
  }

  @Property()
  private translations: Translations;

  @Property()
  
  private latlng: number[];

  @Property()
  private landlocked: boolean;

  @Property()
  private area: number;

  @Property()
  private demonyms?: Demonyms;

  @Property()
  
  private flag: string;

  @Property()
  private maps: Maps;

  @Property()
  
  private population: number;

  @Property()
  private gini?: Gini;

  @Property()
  private fifa?: string;

  @Property()
  private car: Car;

  @Property()
  private timezones: string[];

  @Property()
  private continents: string[];

  @Property()
  
  private flags: Flags;

  @Property()
  
  private coatOfArms: CoatOfArms;

  @Property()
  private startOfWeek: string;

  @Property()
  
  private capitalInfo: CapitalInfo;

  @Property()
  private postalCode?: PostalCode;

  @Property()
  private borders?: string[];

  public validateSchema(): { isValidSchema: boolean; errors: any } {
    const ajv = PlatformTest.get<Ajv>(Ajv);
    const schema = getJsonSchema(Country);

    const validate = ajv.compile(schema);

    return {
      isValidSchema: validate(this),
      errors: validate.errors,
    };
  }
}
