import "@tsed/ajv";
import { PlatformTest } from "@tsed/common";
import test, { expect } from "@playwright/test";
import { CountryService } from "./services/country.service";

let responseData: any;
let countriesService: CountryService;
test.describe("Countries API", () => {
  test.beforeAll(async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    responseData = await response.json();
    countriesService = new CountryService(responseData);
  });

  test.beforeEach(PlatformTest.create);
  test.afterEach(PlatformTest.reset);

  test("should have a valid schema", async () => {
    const countries = countriesService.getCountries();

    for (const country of countries) {
      const { isValidSchema, errors } = country.validateSchema();

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
    const languages = Object.values(
      countriesService.getCountryOfficialLanguages("South Africa")
    );

    const hasLanguage = Object.values(languages).includes("Sign Language");

    console.log(
      `Official South African languages ${JSON.stringify(languages.join(", "))}`
    );
    expect(hasLanguage).toBe(true);
  });
});
