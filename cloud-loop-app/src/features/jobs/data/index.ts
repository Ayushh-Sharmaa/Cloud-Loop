import { payuBAJob } from "./list/payu-ba";
import { ripplingSDEJob } from "./list/rippling-sde";
import { amazonSDEJob } from "./list/amazon-sde";
import { provueBackendJob } from "./list/provue-backend";
import { cencoraSDEJob } from "./list/cencora-sde";
import { medianetAndroidJob } from "./list/medianet-android";
import { confidentialWebJob } from "./list/confidential-web";
import { millerknollAssociateJob } from "./list/millerknoll-associate";
import { dataeminenceUIJob } from "./list/dataeminence-ui";
import { quickreplyForwardJob } from "./list/quickreply-forward";
import { deloitteGraduateJob } from "./list/deloitte-graduate";
import { rockwellQAJob } from "./list/rockwell-qa";
import { hevoSDEJob } from "./list/hevo-sde";
import { adobeMTSJob } from "./list/adobe-mts";
import { clinisysAssociateJob } from "./list/clinisys-associate";
import { nikeSEJob } from "./list/nike-se";
import { gokwikSDEJob } from "./list/gokwik-sde";
import { ciscoTDEJob } from "./list/cisco-tde";
import { ericssonPacketCoreJob } from "./list/ericsson-packet-core";
import { siemensTraineeJob } from "./list/siemens-trainee";
import { guidehouseSEJob } from "./list/guidehouse-se";
import { browserstackSDEJob } from "./list/browserstack-sde";
import { eclerxAnalystJob } from "./list/eclerx-analyst";

import scrapedJobs from "./scraped-jobs.json";
import { Job } from "../types/Job";

const staticJobs: Job[] = [
  ciscoTDEJob,
  ericssonPacketCoreJob,
  siemensTraineeJob,
  guidehouseSEJob,
  browserstackSDEJob,
  eclerxAnalystJob,
  payuBAJob,
  ripplingSDEJob,
  amazonSDEJob,
  provueBackendJob,
  cencoraSDEJob,
  medianetAndroidJob,
  confidentialWebJob,
  millerknollAssociateJob,
  dataeminenceUIJob,
  quickreplyForwardJob,
  deloitteGraduateJob,
  rockwellQAJob,
  hevoSDEJob,
  adobeMTSJob,
  clinisysAssociateJob,
  nikeSEJob,
  gokwikSDEJob,
];

export const jobs: Job[] = [
  ...staticJobs,
  ...(scrapedJobs as Job[]),
];

