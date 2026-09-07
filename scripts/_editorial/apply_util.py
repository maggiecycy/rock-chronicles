#!/usr/bin/env python3
"""Helpers to patch bilingual editorial fields in band/people JSON."""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
BANDS = ROOT / "content" / "bands"
PEOPLE = ROOT / "content" / "people"


def bi(en: str, zh: str) -> dict[str, str]:
    return {"en": en, "zh": zh}


def load(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def save(path: Path, data: dict[str, Any]) -> None:
    path.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def patch_band_basic(
    slug: str,
    *,
    why_matters: tuple[str, str],
    short_bio: tuple[str, str],
    body: tuple[str, str],
) -> None:
    path = BANDS / f"{slug}.json"
    data = load(path)
    data["whyMatters"] = bi(*why_matters)
    data["shortBio"] = bi(*short_bio)
    data["body"] = bi(*body)
    save(path, data)


def patch_band_notes(
    slug: str,
    *,
    scene_notes: list[tuple[str, str]] | None = None,
    landmark_note: tuple[str, str] | None = None,
    landmark_debut_note: tuple[str, str] | None = None,
    lineup_notes: dict[str, tuple[str, str]] | None = None,
) -> None:
    path = BANDS / f"{slug}.json"
    data = load(path)
    if scene_notes and data.get("scenes"):
        for i, note in enumerate(scene_notes):
            if i < len(data["scenes"]):
                data["scenes"][i]["note"] = bi(*note)
    if landmark_note and data.get("landmark"):
        data["landmark"]["note"] = bi(*landmark_note)
    if landmark_debut_note and data.get("landmark", {}).get("debutTrack"):
        data["landmark"]["debutTrack"]["note"] = bi(*landmark_debut_note)
    if lineup_notes and data.get("lineupVersions"):
        for ver in data["lineupVersions"]:
            if ver["id"] in lineup_notes:
                ver["note"] = bi(*lineup_notes[ver["id"]])
    save(path, data)


def patch_narrative(
    slug: str,
    chapters: dict[str, dict[str, tuple[str, str]]],
) -> None:
    """chapters: id -> {title: (en,zh), body: (en,zh)}"""
    path = BANDS / f"{slug}.json"
    data = load(path)
    for ch in data.get("narrative") or []:
        patch = chapters.get(ch["id"])
        if not patch:
            continue
        if "title" in patch:
            ch["title"] = bi(*patch["title"])
        if "body" in patch:
            ch["body"] = bi(*patch["body"])
    save(path, data)


def patch_person(
    slug: str,
    *,
    short_bio: tuple[str, str],
    why_hub: tuple[str, str],
    body: tuple[str, str],
    tenure_notes: dict[str, tuple[str, str]] | None = None,
) -> None:
    path = PEOPLE / f"{slug}.json"
    data = load(path)
    data["shortBio"] = bi(*short_bio)
    data["whyHub"] = bi(*why_hub)
    data["body"] = bi(*body)
    if tenure_notes:
        for t in data.get("tenures") or []:
            key = t.get("bandSlug") or t.get("bandName")
            if key in tenure_notes and "note" in t:
                t["note"] = bi(*tenure_notes[key])
            elif key in tenure_notes:
                # only patch existing notes
                pass
        # also match by bandSlug for notes that exist
        for t in data.get("tenures") or []:
            key = t.get("bandSlug")
            if key and key in tenure_notes and t.get("note") is not None:
                t["note"] = bi(*tenure_notes[key])
    save(path, data)


def patch_person_tenure_notes(slug: str, notes: dict[str, tuple[str, str]]) -> None:
    path = PEOPLE / f"{slug}.json"
    data = load(path)
    for t in data.get("tenures") or []:
        key = t.get("bandSlug")
        if key in notes and t.get("note") is not None:
            t["note"] = bi(*notes[key])
    save(path, data)
