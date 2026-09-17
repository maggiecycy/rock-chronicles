import type { Localized } from "@/i18n/config";

export type LinkType = "branched" | "influenced" | "fused";
export type WaveType = "sine" | "square" | "sawtooth" | "triangle";
export type StickyVisual =
  | "thesis"
  | "members"
  | "tracks"
  | "dna"
  | "quote"
  | "scene"
  | "influence"
  | "lineupVersions";

export type { Locale, Localized } from "@/i18n/config";

export interface BandMember {
  name: string;
  role: string;
  years: string;
  /** Link to Person hub when available */
  personSlug?: string;
}

export interface LineupMember {
  name: string;
  role: string;
  personSlug?: string;
}

/** A named “version” of a band (classic / peak / later), not a full churn log. */
export interface LineupVersion {
  id: string;
  label: Localized;
  years: string;
  members: LineupMember[];
  note?: Localized;
  /** Highlight as the default / peak lineup */
  peak?: boolean;
}

export interface PersonTenure {
  /** Optional link into band pages; omit for projects not yet in the chronicle */
  bandSlug?: string;
  bandName: string;
  role: string;
  from: number;
  to?: number | "present";
  note?: Localized;
}

export interface Person {
  name: string;
  slug: string;
  born?: number;
  origin: string;
  roles: string[];
  hub: boolean;
  shortBio: Localized;
  whyHub?: Localized;
  body: Localized;
  tenures: PersonTenure[];
  relatedPeople?: string[];
  /** Optional portrait (from content/media-index.json overlay). */
  image?: EntityImage;
}

export interface EssentialTrack {
  title: string;
  year: number;
  note?: Localized;
}

export interface BandScene {
  year: number;
  track: string;
  membersOnStage: string[];
  genreTags: string[];
  note?: Localized;
  intensity?: 1 | 2 | 3;
}

export interface InterviewQuote {
  text: string;
  speaker: string;
  source: string;
  year?: number;
}

/** Wikimedia / self-hosted editorial image with attribution. */
export interface EntityImage {
  /** Site path under /public, e.g. /media/bands/led-zeppelin.jpg */
  src: string;
  alt: Localized;
  /** Human-readable credit line shown under the image */
  credit: string;
  /** Short license label, e.g. CC BY-SA 4.0 or Public domain */
  license: string;
  /** Commons file page or other provenance URL */
  sourceUrl: string;
}

export interface NarrativeChapter {
  id: string;
  title: Localized;
  body: Localized;
  stickyVisual: StickyVisual;
  sceneIndex?: number;
  quoteIndex?: number;
  soundGenre?: string;
  /**
   * Optional chapter photo shown in the sticky column as narrative scrolls.
   * Does not replace the band hero image.
   */
  stickyImage?: EntityImage;
}

export interface Band {
  name: string;
  slug: string;
  formed: number;
  origin: string;
  primaryEra: string;
  alsoAppearsIn?: string[];
  genres: string[];
  members: BandMember[];
  essentialTracks: EssentialTrack[];
  lyricQuotes: string[];
  relatedBands: string[];
  influenceFrom: string[];
  influenced: string[];
  shortBio: Localized;
  body: Localized;
  accentColor?: string;
  decisive?: boolean;
  /**
   * Optional hero eyebrow. When set, replaces the default
   * “Decisive Band · {era}” line (useful for solo artists filed as band nodes).
   */
  pageEyebrow?: Localized;
  whyMatters?: Localized;
  scenes?: BandScene[];
  interviewQuotes?: InterviewQuote[];
  narrative?: NarrativeChapter[];
  lineupVersions?: LineupVersion[];
  /** Optional hero image (from content/media-index.json overlay). */
  image?: EntityImage;
  /**
   * Fused “firsts” card — not a separate encyclopedia.
   * Landmark debut track + genres this act helped open + note.
   */
  landmark?: {
    debutTrack: { title: string; year: number; note?: Localized };
    pioneeredGenres: string[];
    note?: Localized;
  };
}

export interface Era {
  name: Localized;
  slug: string;
  decade: string;
  years: string;
  order: number;
  summary: Localized;
  sound: Localized;
  anchorBands: string[];
  alsoNotable: string[];
  genres: string[];
  body: Localized;
}

export interface Genre {
  name: string;
  slug: string;
  summary: Localized;
  eraFocus: string;
  representativeBands: string[];
  /** Acts that opened or crystallized this genre (fused landmarks). */
  pioneerBands?: string[];
  body: Localized;
}

export type TropeTone = "lore" | "meme" | "half-true";

export interface TropeExample {
  bandSlug?: string;
  personSlug?: string;
  label: string;
  note?: Localized;
}

export interface Trope {
  slug: string;
  title: Localized;
  summary: Localized;
  body: Localized;
  tone: TropeTone;
  examples: TropeExample[];
}

export interface GuideOutlineItem {
  label: string;
  title: Localized;
  /** Optional blurb (e.g. further-reading notes on a TOC page) */
  summary?: Localized;
  /** When set, links to that guide slug; omit for stub / not written yet */
  slug?: string;
}

export interface GuideOutlineChapter {
  heading: Localized;
  items: GuideOutlineItem[];
}

export interface GuideArticle {
  slug: string;
  order: number;
  title: Localized;
  summary: Localized;
  body: Localized;
  /**
   * Parent syllabus slug. Child sections are hidden from /guide index
   * and listed on the parent TOC page.
   */
  parentSlug?: string;
  /** toc = directory page; article = lecture (default); stub = placeholder */
  kind?: "toc" | "article" | "stub";
  /** Display label like "1.1" on TOC rows */
  sectionLabel?: string;
  /** Heading above live child section links on a TOC page */
  sectionsHeading?: Localized;
  /** Extra chapters/sections listed on a TOC page (often stubs) */
  outline?: GuideOutlineChapter[];
  relatedBandSlugs?: string[];
  relatedGenreSlugs?: string[];
  relatedTropeSlugs?: string[];
}

export interface LiveEvent {
  slug: string;
  title: Localized;
  year: number;
  venue: Localized;
  summary: Localized;
  whyEpic: Localized;
  bandSlugs: string[];
  keyTracks: { title: string; bandSlug?: string; note?: Localized }[];
  /** Legal note: no full concert embeds; editorial description only */
  rightsNote?: Localized;
}

export interface SharedMemberEdge {
  personSlug: string;
  personName: string;
  bandA: string;
  bandB: string;
}

export interface GenreLink {
  from: string;
  to: string;
  type: LinkType;
}

export interface GenreSoundProfile {
  wave: WaveType;
  baseFreq: number;
  bpm: number;
  pattern: number[];
  filterFreq: number;
}
