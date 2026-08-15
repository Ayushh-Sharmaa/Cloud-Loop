import { youngTurksContest2026Event } from "./list/young-turks-contest-2026";
import { smartIndiaHackathon2026Event } from "./list/smart-india-hackathon-2026";
import { googleHashcode2026Event } from "./list/google-hashcode-2026";
import { microsoftImagineCup2026Event } from "./list/microsoft-imagine-cup-2026";
import { mlhHackathonSeason2026Event } from "./list/mlh-hackathon-season-2026";
import { awsReinvent2026Event } from "./list/aws-reinvent-student-program-2026";
import { web3BuildersBootcamp2026Event } from "./list/web3-builders-bootcamp-2026";
import { hackerHouseGoa2026Event } from "./list/hacker-house-goa-2026";

import scrapedEvents from "./scraped-events.json";
import { Event } from "../types/Event";

const staticEvents: Event[] = [
  youngTurksContest2026Event,
  hackerHouseGoa2026Event,
  smartIndiaHackathon2026Event,
  googleHashcode2026Event,
  microsoftImagineCup2026Event,
  mlhHackathonSeason2026Event,
  awsReinvent2026Event,
  web3BuildersBootcamp2026Event,
];

// Deduplicate events by id / slug
const eventMap = new Map<string, Event>();
for (const e of staticEvents) {
  eventMap.set(e.id, e);
  if (e.slug) eventMap.set(e.slug, e);
}
for (const e of (scrapedEvents as Event[])) {
  if (!eventMap.has(e.id) && (!e.slug || !eventMap.has(e.slug))) {
    eventMap.set(e.id, e);
  }
}

export const events: Event[] = Array.from(new Set(eventMap.values()));

