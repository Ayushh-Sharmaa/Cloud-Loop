import { smartIndiaHackathon2026Event } from "./list/smart-india-hackathon-2026";
import { googleHashcode2026Event } from "./list/google-hashcode-2026";
import { microsoftImagineCup2026Event } from "./list/microsoft-imagine-cup-2026";
import { mlhHackathonSeason2026Event } from "./list/mlh-hackathon-season-2026";
import { awsReinvent2026Event } from "./list/aws-reinvent-student-program-2026";
import { web3BuildersBootcamp2026Event } from "./list/web3-builders-bootcamp-2026";
import { hackerHouseGoa2026Event } from "./list/hacker-house-goa-2026";

import scrapedEvents from "./scraped-events.json";

interface Event {
  id: string;
  slug: string;
  title: string;
  organizer: string;
  organizerLogo?: string;
  type: string;
  date: string;
  endDate?: string;
  location: string;
  isOnline: boolean;
  banner?: string;
  registrationDeadline: string;
  description: string;
  prize?: string;
  tags: string[];
  registered?: number;
  applyUrl?: string;
}

const staticEvents: Event[] = [
  hackerHouseGoa2026Event,
  smartIndiaHackathon2026Event,
  googleHashcode2026Event,
  microsoftImagineCup2026Event,
  mlhHackathonSeason2026Event,
  awsReinvent2026Event,
  web3BuildersBootcamp2026Event,
];

export const events: Event[] = [
  ...staticEvents,
  ...(scrapedEvents as Event[]),
];
