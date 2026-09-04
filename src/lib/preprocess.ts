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
  rabbis?: ValueItem[];
  decontextualized_reception?: ValueItem[];
  narrative_reception?: ValueItem[];
};

type ThemeLike = {
  passages?: ValueItem[];
};

export function preprocessThemeRecord<T extends ThemeLike>(record: T): T {
  return {
    ...record,
    passages: record.passages ? sortByValueNatural(record.passages) : record.passages,
  };
}

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
    rabbis: record.rabbis ? sortByValueNatural(record.rabbis) : record.rabbis,
    decontextualized_reception: record.decontextualized_reception ? sortByValueNatural(record.decontextualized_reception) : record.decontextualized_reception,
    narrative_reception: record.narrative_reception ? sortByValueNatural(record.narrative_reception) : record.narrative_reception,
  };
}
