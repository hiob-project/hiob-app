import { sortByValueNatural } from "$lib/utils";

type ValueItem = { value: string };

type MidrashLike = {
  mentions?: ValueItem[];
};

type VerseLike = {
  mentions?: ValueItem[];
};

type PassageLike = {
  mention?: ValueItem[];
  midrash?: ValueItem[];
  verses?: ValueItem[];
  quotation_and_speakers?: ValueItem[];
  decontextualized_reception?: ValueItem[];
  narrative_reception?: ValueItem[];
};

export function preprocessMidrashRecord<T extends MidrashLike>(record: T): T {
  return {
    ...record,
    mentions: record.mentions ? sortByValueNatural(record.mentions) : record.mentions,
  };
}

export function preprocessVerseRecord<T extends VerseLike>(record: T): T {
  return {
    ...record,
    mentions: record.mentions ? sortByValueNatural(record.mentions) : record.mentions,
  };
}

export function preprocessPassageRecord<T extends PassageLike>(record: T): T {
  return {
    ...record,
    mention: record.mention ? sortByValueNatural(record.mention) : record.mention,
    midrash: record.midrash ? sortByValueNatural(record.midrash) : record.midrash,
    verses: record.verses ? sortByValueNatural(record.verses) : record.verses,
    quotation_and_speakers: record.quotation_and_speakers
      ? sortByValueNatural(record.quotation_and_speakers)
      : record.quotation_and_speakers,
    decontextualized_reception: record.decontextualized_reception
      ? sortByValueNatural(record.decontextualized_reception)
      : record.decontextualized_reception,
    narrative_reception: record.narrative_reception
      ? sortByValueNatural(record.narrative_reception)
      : record.narrative_reception,
  };
}