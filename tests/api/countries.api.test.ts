import "@tsed/ajv";
import { PlatformTest } from "@tsed/common";
import { CountryService } from "./services/country.service";
import {
  describe,
  expect,
  test,
  beforeAll,
  beforeEach,
  afterEach,
} from "bun:test";

let responseData: any;
let countriesService: CountryService;
describe("Countries API", () => {
  beforeAll(async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    responseData = await response.json();
    countriesService = new CountryService(responseData);
  });

  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  test("should have a valid schema", async () => {
    const countries = countriesService.getCountries();

    for (const country of countries) {
      const countryNames = country.getName();
      const countryCommonName = countryNames.getCommon();
      const { isValidSchema, errors } = country.validateSchema();

      if (errors) {
        console.log(
          `The following country "${countryCommonName}" has the following errors: ${JSON.stringify(
            errors
          )}`
        );
      }

      expect(errors).toBeNull();
      expect(isValidSchema).toBe(true);
    }
  });

  test("should return 250 countries", async () => {
    const totalCountries = countriesService.getTotalCountries();
    expect(totalCountries).toEqual(250);
    console.log(`Total amount of countries are ${totalCountries}`);
  });

  test("should contain South Africa as a country in the list", async () => {
    const country = countriesService.getCountryByName("South Africa");

    expect(country).toBeDefined();
  });

  test("should contain Sign Language as an official language in South Africa", async () => {
    const southAfricanLanguages =
      countriesService.getCountryOfficialLanguages("South Africa");
    const languages = Object.values(southAfricanLanguages ?? []);

    const hasLanguage = Object.values(languages).includes("Sign Language");

    console.log(
      `Official South African languages ${JSON.stringify(languages.join(", "))}`
    );
    expect(hasLanguage).toBe(true);
  });
});
