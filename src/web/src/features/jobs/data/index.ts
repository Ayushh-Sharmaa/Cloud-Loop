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

// Newly Added TechUprise Jobs
import { mastercardAIJob } from "./list/mastercard-ai";
import { zfundsMERNJob } from "./list/zfunds-mern";
import { amazonSDEHydJob } from "./list/amazon-sde-hyd";
import { globalLogicAnalystJob } from "./list/globallogic-analyst";
import { capgeminiBAJob } from "./list/capgemini-ba";
import { visaAnalystJob } from "./list/visa-analyst";
import { logixalGenAIJob } from "./list/logixal-genai";
import { gleanSEJob } from "./list/glean-se";
import { inforBAJob } from "./list/infor-ba";
import { thermoFisherQAJob } from "./list/thermofisher-qa";
import { ibmQEJob } from "./list/ibm-qe";
import { ciscoBAJob } from "./list/cisco-ba";
import { clovityDataAnalystJob } from "./list/clovity-data-analyst";
import { klaSEJob } from "./list/kla-se";
import { zapareTraineeSEJob } from "./list/zapare-trainee-se";
import { amazonCSANoidaJob } from "./list/amazon-csa-noida";
import { leadingBPOChatJob } from "./list/leading-bpo-chat";
import { teleperformanceVoiceJob } from "./list/teleperformance-wfh-voice";
import { policyBazaarCSAJob } from "./list/policybazaar-csa";
import { hsbcBAJob } from "./list/hsbc-ba";
import { notionSDEJob } from "./list/notion-sde";
import { nttDataTraineeJob } from "./list/ntt-data-trainee";
import { networkTraineeJob } from "./list/network-trainee";
import { ciscoEvergreenJob } from "./list/cisco-evergreen";
import { amazonQualityServicesJob } from "./list/amazon-quality-services";
import { siemensDeveloperJob } from "./list/siemens-developer";
import { questGlobalGETJob } from "./list/quest-global-get";
import { netappSEJob } from "./list/netapp-se";
import { pureStorageMTSJob } from "./list/purestorage-mts";
import { microsoftSEJob } from "./list/microsoft-se";
import { naviFrontendJob } from "./list/navi-frontend";
import { wexSDEJob } from "./list/wex-sde";
import { cmeGroupSEJob } from "./list/cme-group-se";
import { dataEminenceReactJob } from "./list/dataeminence-react";

import scrapedJobs from "./scraped-jobs.json";
import { Job } from "../types/Job";

const staticJobs: Job[] = [
  mastercardAIJob,
  zfundsMERNJob,
  amazonSDEHydJob,
  globalLogicAnalystJob,
  capgeminiBAJob,
  visaAnalystJob,
  logixalGenAIJob,
  gleanSEJob,
  inforBAJob,
  thermoFisherQAJob,
  ibmQEJob,
  ciscoBAJob,
  clovityDataAnalystJob,
  klaSEJob,
  zapareTraineeSEJob,
  amazonCSANoidaJob,
  leadingBPOChatJob,
  teleperformanceVoiceJob,
  policyBazaarCSAJob,
  hsbcBAJob,
  notionSDEJob,
  nttDataTraineeJob,
  networkTraineeJob,
  ciscoEvergreenJob,
  amazonQualityServicesJob,
  siemensDeveloperJob,
  questGlobalGETJob,
  netappSEJob,
  pureStorageMTSJob,
  microsoftSEJob,
  naviFrontendJob,
  wexSDEJob,
  cmeGroupSEJob,
  dataEminenceReactJob,

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

// Deduplicate jobs by id / slug
const jobMap = new Map<string, Job>();
for (const j of staticJobs) {
  jobMap.set(j.id, j);
  if (j.slug) jobMap.set(j.slug, j);
}
for (const j of (scrapedJobs as Job[])) {
  if (!jobMap.has(j.id) && (!j.slug || !jobMap.has(j.slug))) {
    jobMap.set(j.id, j);
  }
}

export const jobs: Job[] = Array.from(new Set(jobMap.values()));


