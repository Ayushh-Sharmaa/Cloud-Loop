import { statestreetApprenticeInternship } from "./list/statestreet-apprentice";
import { googleApprenticeInternship } from "./list/google-apprentice";
import { gehealthcareInternship } from "./list/gehealthcare-intern";
import { salesforceInternship } from "./list/salesforce-intern";
import { paathzInternship } from "./list/paathz-intern";

import scrapedInternships from "./scraped-internships.json";
import { Internship } from "../types/Internship";

const staticInternships: Internship[] = [
  statestreetApprenticeInternship,
  googleApprenticeInternship,
  gehealthcareInternship,
  salesforceInternship,
  paathzInternship,
];

export const internships: Internship[] = [
  ...staticInternships,
  ...(scrapedInternships as Internship[]),
];

