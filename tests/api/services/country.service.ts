import { Country } from "../models/Country";
import { Languages } from "../models/Languages";
import { deserialize } from "@tsed/json-mapper";
export class CountryService {
  private countries: Country[] = [];
  constructor(responseData: any) {
    this.countries = deserialize(responseData, {
      additionalProperties: true,
      type: Country,
    });
  }

  getCountries(): Country[] {
    return this.countries;
  }

  getTotalCountries(): number {
    return this.getCountries().length;
  }

  getCountryByName(countryName: string): Country | undefined {
    return this.getCountries().find(
      (country) => country.getName().getCommon() === countryName
    );
  }

  getCountryOfficialLanguages(countryName: string): Languages | undefined {
    return this.getCountries()
      .find((country) => country.getName().getCommon() === countryName)
      ?.getLanguages();
  }

  countryLanguageExists(language: string, countryName: string): boolean {
    const country = this.getCountryByName(countryName);
    const languages = country?.getLanguages();
    return Object.values(languages ?? "").includes(language);
  }
}
