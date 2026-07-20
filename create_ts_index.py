import json
import os

from typesense.exceptions import ObjectNotFound
from acdh_cfts_pyutils import TYPESENSE_CLIENT as client
from tqdm import tqdm


DATA_DIR = os.path.join("src", "lib", "data")
COLLECTION = "hiob"
NON_CONTENT_KEYS = {"id", "hiob_id", "order"}


def iter_records(data):
    """Support both list and dict JSON shapes."""
    return data if isinstance(data, list) else data.values()


def has_meaningful_value(value):
    """Return True when a value is not empty, including nested Baserow structures."""
    if value is None:
        return False
    if isinstance(value, str):
        return bool(value.strip())
    if isinstance(value, list):
        return any(has_meaningful_value(item) for item in value)
    if isinstance(value, dict):
        return any(key not in NON_CONTENT_KEYS and has_meaningful_value(item) for key, item in value.items())
    return True


def has_indexable_content(item):
    """Skip empty rows that contain no meaningful content."""
    return any(key not in NON_CONTENT_KEYS and has_meaningful_value(value) for key, value in item.items())

try:
    client.collections[COLLECTION].delete()
except ObjectNotFound:
    pass

client.collections.create({
    "name": COLLECTION,
        "metadata": {
        "owners": ["Peter Andorfer", "Kinga Sramó"],
        "description": "https://github.com/hiob-project/hiob-app",
        "service_ids": [28045],
    },
    "fields": [
        {"name": "id",       "type": "string"},
        {"name": "type",     "type": "string", "facet": True},   # "verse" | "passage" | "midrash"
        {"name": "hiob_id",  "type": "string"},

        # verses + midrash
        {"name": "mentions", "type": "string[]", "optional": True, "facet": True},

        # verses only
        {"name": "verse", "type": "string",   "optional": True},

        # midrash only
        {"name": "name", "type": "string",   "optional": True},

        # passages only
        {"name": "mention", "type": "string",   "optional": True, "facet": True},
        {"name": "midrash", "type": "string[]", "optional": True, "facet": True},
        {"name": "passages", "type": "string",   "optional": True},
        {"name": "verses", "type": "string[]", "optional": True, "facet": True},
        {"name": "quote", "type": "string",   "optional": True},
        {"name": "abstract", "type": "string",   "optional": True},
        {"name": "decontextualized_reception","type": "string[]", "optional": True, "facet": True},
        {"name": "narrative_reception", "type": "string[]", "optional": True, "facet": True},
        {"name": "points_of_note", "type": "string",   "optional": True},
        {"name": "classic_parallels", "type": "string",   "optional": True},
        {"name": "quotation_and_speakers", "type": "string[]", "optional": True, "facet": True},
    ],
})

# Verses
with open(os.path.join(DATA_DIR, "verses.json"), encoding="utf-8") as fp:
    verses_data = json.load(fp)

verses_records = [
    {
        "id": f"verse-{item['id']}",
        "type": "verse",
        "hiob_id": item.get("hiob_id", ""),
        "verse": item.get("verse", ""),
        "mentions": [m["value"] for m in item.get("mentions", [])],
    }
    for item in tqdm(iter_records(verses_data), desc="verses")
    if has_indexable_content(item)
]

skipped_verses = sum(1 for item in iter_records(verses_data) if not has_indexable_content(item))

result = client.collections[COLLECTION].documents.import_(verses_records)
print(result)
print(f"skipped {skipped_verses} empty verses rows")
print("done indexing verses")

# Passages

with open(os.path.join(DATA_DIR, "passages.json"), encoding="utf-8") as fp:
    passages_data = json.load(fp)

passages_records = [
    {
        "id": f"passage-{item['id']}",
        "type": "passage",
        "hiob_id": item.get("hiob_id", ""),
        "mention": item["mention"][0]["value"] if item.get("mention") else "",
        "midrash": [m["value"] for m in item.get("midrash", [])],
        "passages": item.get("passages", "") or "",
        "verses": [v["value"] for v in item.get("verses", [])],
        "quote": item.get("quote", "") or "",
        "abstract": item.get("abstract", "") or "",
        "decontextualized_reception": [dr["value"] for dr in item.get("decontextualized_reception", [])],
        "narrative_reception": [nr["value"] for nr in item.get("narrative_reception", [])],
        "points_of_note": item.get("points_of_note", "") or "",
        "classic_parallels": item.get("classic_parallels", "") or "",
        "quotation_and_speakers": [qs["value"] for qs in item.get("quotation_and_speakers", [])],
    }
    for item in tqdm(iter_records(passages_data), desc="passages")
    if has_indexable_content(item)
]

skipped_passages = sum(1 for item in iter_records(passages_data) if not has_indexable_content(item))

result = client.collections[COLLECTION].documents.import_(passages_records)
print(result)
print(f"skipped {skipped_passages} empty passages rows")
print("done indexing passages")

# Midrash

with open(os.path.join(DATA_DIR, "midrash.json"), encoding="utf-8") as fp:
    midrash_data = json.load(fp)

midrash_records = [
    {
        "id": f"midrash-{item['id']}",
        "type": "midrash",
        "hiob_id": item.get("hiob_id", ""),
        "name": item.get("name", ""),
        "mentions": [m["value"] for m in item.get("mentions", [])],
    }
    for item in tqdm(iter_records(midrash_data), desc="midrash")
    if has_indexable_content(item)
]

skipped_midrash = sum(1 for item in iter_records(midrash_data) if not has_indexable_content(item))

result = client.collections[COLLECTION].documents.import_(midrash_records)
print(result)
print(f"skipped {skipped_midrash} empty midrash rows")
print("done indexing midrash")

print(f"\nAll records imported into collection '{COLLECTION}'")