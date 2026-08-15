import { teleperformanceInternship } from "./list/teleperformance-data-analytics";
import { qualcommEngineeringInternship } from "./list/qualcomm-engineering-intern";
import { fortiveInternship } from "./list/fortive-intern";
import { statestreetApprenticeInternship } from "./list/statestreet-apprentice";
import { googleApprenticeInternship } from "./list/google-apprentice";
import { gehealthcareInternship } from "./list/gehealthcare-intern";
import { salesforceInternship } from "./list/salesforce-intern";
import { paathzInternship } from "./list/paathz-intern";

import scrapedInternships from "./scraped-internships.json";
import { Internship } from "../types/Internship";

const staticInternships: Internship[] = [
  teleperformanceInternship,
  qualcommEngineeringInternship,
  fortiveInternship,
  statestreetApprenticeInternship,
  googleApprenticeInternship,
  gehealthcareInternship,
  salesforceInternship,
  paathzInternship,
];

// Deduplicate internships by id / slug
const internMap = new Map<string, Internship>();
for (const i of staticInternships) {
  internMap.set(i.id, i);
  if (i.slug) internMap.set(i.slug, i);
}
for (const i of (scrapedInternships as Internship[])) {
  if (!internMap.has(i.id) && (!i.slug || !internMap.has(i.slug))) {
    internMap.set(i.id, i);
  }
}

export const internships: Internship[] = Array.from(new Set(internMap.values()));


