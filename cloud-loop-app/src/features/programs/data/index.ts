import { googleCloudArcadeProgram } from "./list/google-cloud-arcade";
import { microsoftLearnStudentAmbassadorsProgram } from "./list/microsoft-learn-student-ambassadors";
import { girlScriptSummerOfCodeProgram } from "./list/girlscript-summer-of-code";
import { githubCampusExpertProgram } from "./list/github-campus-expert";
import { naukriCampusAmbassadorProgram } from "./list/naukri-campus-ambassador";
import { poppiUniversityAmbassadorProgram } from "./list/poppi-university-ambassador";
import { redBullStudentMarketeerProgram } from "./list/red-bull-student-marketeer";
import { cocaColaCampusAmbassadorProgram } from "./list/coca-cola-campus-ambassador";
import { adobeStudentAmbassadorProgram } from "./list/adobe-student-ambassador";
import { perplexityCampusPartnerProgram } from "./list/perplexity-campus-partner";
import { chatgptCodexCampusProgram } from "./list/chatgpt-codex-campus-program";
import { supabasePartnerProgram } from "./list/supabase-partner-program";
import { supabaseSupaSquadProgram } from "./list/supabase-supasquad-program";
import { kiroCampusAmbassadorProgram } from "./list/kiro-campus-ambassador-program";
import { hackerRankCampusCrewProgram } from "./list/hackerrank-campus-crew";
import { canvaCampusAmbassadorProgram } from "./list/canva-campus-ambassador";
import { awsStudentBuilderCampusLeadersProgram } from "./list/aws-student-builder-campus-leaders";
import { awsStudentBuilderGroupLeadersProgram } from "./list/aws-student-builder-group-leaders";

import scrapedPrograms from "./scraped-programs.json";
import { Program } from "../types/Program";

const otherPrograms: Program[] = [
  microsoftLearnStudentAmbassadorsProgram,
  girlScriptSummerOfCodeProgram,
  githubCampusExpertProgram,
  naukriCampusAmbassadorProgram,
  poppiUniversityAmbassadorProgram,
  redBullStudentMarketeerProgram,
  cocaColaCampusAmbassadorProgram,
  adobeStudentAmbassadorProgram,
  perplexityCampusPartnerProgram,
  chatgptCodexCampusProgram,
  supabasePartnerProgram,
  supabaseSupaSquadProgram,
  kiroCampusAmbassadorProgram,
  hackerRankCampusCrewProgram,
  canvaCampusAmbassadorProgram,
  awsStudentBuilderCampusLeadersProgram,
  awsStudentBuilderGroupLeadersProgram,
].sort((a, b) => {
  const dateA = new Date(a.deadline).getTime();
  const dateB = new Date(b.deadline).getTime();
  return dateA - dateB; // Nearest deadline comes first
});

const staticPrograms: Program[] = [
  googleCloudArcadeProgram,
  ...otherPrograms
];

// Merge static and scraped programs, deduplicating by ID or slug
const programMap = new Map<string, Program>();
for (const p of staticPrograms) {
  programMap.set(p.id, p);
  programMap.set(p.slug, p);
}
for (const p of (scrapedPrograms as Program[])) {
  if (!programMap.has(p.id) && !programMap.has(p.slug)) {
    programMap.set(p.id, p);
  }
}

export const programs: Program[] = Array.from(new Set(programMap.values()));

