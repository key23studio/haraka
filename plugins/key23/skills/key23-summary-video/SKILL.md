---
name: key23-summary-video
description: Make a summary video in KEY23 from a folder of photos and clips plus a text — a weekly report, an event, a campaign, an institution's news — then apply the user's notes and export it. Use when the user gives a Google Drive or local folder of pictures with a text and asks for a video, a weekly summary, «فيديو ملخص», «حصاد الأسبوع», «تدخلات», «فيديو من الصور والنص». Needs the KEY23 connector (tools import_media, build_story, preview…).
---

# A summary video from photos and a text, in KEY23

The user hands you a folder (often one sub-folder per ministry, department or topic) and a text (often a Word file in the folder). You make a finished, official-looking video in KEY23: an opening, one card per news item (photos + the source on a tag + the text + its numbers counting up), section titles, number cards, a closing, with music. Then the user gives notes and you apply them until they are happy, then you export.

The user judges what they **see**. They do not read code or JSON. Talk to them about the video, in their language, in short sentences.

## The order of work

0. Read `standing_rules` first: notes the user gave once for every video. Follow them throughout. When the user gives a general note (about every video, not one moment), keep it with `add_rule` and tell them.
1. **Before importing, ask only what you cannot know** (one short message, then wait):
   - the folder or Drive link, if not given;
   - the frame, because `import_media` needs it: wide 16:9 (YouTube, screens, TV, X), tall 9:16 (Reels, Stories, TikTok, WhatsApp status) or square (feeds). If they named a platform, decide yourself and do not ask;
   - a logo: only one the user gives you (a file in the folder, or one they send). Never take a logo from the web.
2. `import_media` with the folder or link. Read the text it returns — this is the script. If a Drive link fails, ask the user to share the folder as «Anyone with the link», or to download it and give you the folder on their computer. Title and date: take them from the text; ask only if the text has none.
3. `look_at_media`, folder by folder. Look at every picture before you place it.
4. Write the story (rules below) and `build_story`.
5. `preview`. Look at **every** picture yourself, carefully (checklist below). It shows 12 cards at a time: ask for the rest by card ids until you have seen them all. For a card with several photos or a clip, also preview `times` inside the card (`build_story` gives each card's start and end) so you see each photo and the clip's first frame. Fix and rebuild until you find nothing wrong. Fix every warning of the build and every point of the studio's check, or tell the user why one stays.
6. Show the user the pictures from `preview` (or describe them, if you cannot attach) and ask for notes. Say how long the video is (the build gives it in seconds).
7. Notes: see «Applying notes».
8. `export_video` only when the user says it is good. Tell them where the file is and how long it is. Each export is kept: a new one after a note gets the next number (-v2, -v3…), so say which version it is.

## The text: theirs, word for word

- Use the user's sentences as they wrote them. Fix only obvious typing mistakes, and say which.
- **Never invent** a fact, a number, a name, a place, a title or a date. Never round a number. If something is missing, ask.
- Names and titles exactly as written («د. محمد مصطفى», «رئيس الوزراء»).
- Keep the order of the text. When the text is grouped by ministry or topic, keep the groups; when there are several groups, set `section` (the group's name) on the first card of each.
- One news item per card. A card's text reads best at two or three lines (the build warns when it is too long). A longer item is split into two cards at a natural break (a comma, «و», a place name), both with the same tag. The first part goes with the photos it describes, the second with its own photos or clips.
- Two different facts in one paragraph are two lines (`\n`) or two cards — not one long sentence.
- If the user asks to remove words, remove exactly those words and nothing else.

## The tag

- The tag is the source: the ministry, department or body, written as the user writes it («وزارة الزراعة والشركاء», «رئاسة الوزراء»).
- The same body has the same tag on every card. If the user renames it once, rename it everywhere.

## Photos

- **A card's photos must show that card's news.** The sub-folder name is a hint, not proof: look. A photo from another event, another week or another body is wrong even if it sits in the right folder. When unsure which photo matches, ask and show the two options.
- 1–4 photos per card. More photos make each one shorter; keep the best.
- Put first the photo that shows the news itself: the official speaking at the event, the work being done, the thing handed over. Not a crowd, a sign or a logo.
- When the text names a person doing something (opening, speaking, signing), show that person doing it.
- Avoid a photo where a person who is not the subject fills the picture (a close-up of someone in the audience). Prefer a wide shot. If the user asks to "reduce" someone, keep the photo but use a wider one or put it later and shorter — do not remove what they did not ask to remove.
- Evidence photos (seized goods, damage, a finished road) must be readable: use `"layout": "slides"` so each shows whole and full, and a `focus` on the part that matters.
- Avoid photos that are mostly text, posters or screenshots, unless the card is about that poster.
- Upright photos in a wide frame are placed side by side automatically, never alone on black; wide photos in a tall frame are stacked. You do not need to crop anything.
- A photo used on one card should not be used again on another card (the opening may reuse the best ones).
- Clips: give `in` (the second to start from) and `dur`. Skip the clip's own title screens, logos and black frames: check with `preview` and move `in` if the frame is not real footage.

## Numbers

- With `"numbers": "auto"` the numbers in the text count up with the words after them. Check every counted number in the `build_story` answer: the value, and that its words are right («ألف شيقل», «أسرة نازحة»). When the words are wrong or too short, set them: `"numbers": [{ "value": 93, "unit": "أسرة نازحة" }]`.
- A number that is a date, a year, a phone number, an ID, an address or a list position does not count up: set `"numbers": []` for that card if auto picked it.
- At most two counting numbers per card. A paragraph with three or more numbers works better as a number card (`"kind": "stats"`); each tile's `label` is the user's own words for that number, cut from their sentence, not rewritten.
- Every number on screen must come from the user's text, unchanged. Keep decimals (`"decimals": 1` for 5.1).

## Timing, colours, sound

- Do not shorten a card below what its text needs (the build warns). If the user asks for a photo to stay longer, give the card a `duration`, or keep fewer photos.
- Colours: the user's own if they give them; otherwise `green` or `navy` for official and government videos, `blue` for health, education or services, `maroon` or `charcoal` for culture and events. A flag's colours go in `stripe` only for an official video of that country.
- Music: the default suits official summaries; `calm` for sensitive or humanitarian subjects. No voice-over unless the user provides one.

## Looking at the preview: your checklist

For each picture, check and fix before showing the user:
- the photo matches the text, and the important part (faces, the work) is not under the text or the tag;
- no person is cut in half at the edge in a way that looks wrong (change `focus` or the photo);
- the text is complete and readable, the tag is right;
- the counted numbers and their words are right;
- the logo, title and date are right and not cut;
- the studio's check found nothing (margins, reading time, missing files).

Never tell the user something looks right unless you saw it in a preview. If you could not preview, say so.

## Applying notes

- The user often gives notes one at a time. If they say they will send several, answer each briefly («وصل» / "got it") and wait; apply them all together when they say to start, then preview the changed cards.
- To apply: `read_story`, change the story, `build_story` with the whole story again (keep the card ids), `preview` the changed cards (`cards: ["c3", "c4"]`).
- Change only what the note asks. Everything else stays as it was.
- A rebuild replaces the video's layers. If the user changed the video by hand in KEY23, `build_story` refuses and says so: ask the user before rebuilding with `replace_hand_edits`, or work on a copy.
- After applying, tell the user what changed, card by card, in plain words (what they will see), not in technical terms.
- If a note is unclear (which photo? which card?), ask, with the card number and a short description.

## Versions

- Another version (tall for Reels and Stories, without the logo, other colours): `copy_project` (with `format` for another frame: the layout is rebuilt for its shape), then change the copy with `read_story` / `build_story`, `preview` it, and export it. The main version stays as it is.
- After a frame change, preview every card again: a photo that worked wide may not work tall.
- Another kind of file (only when asked): `export_video` with `settings` — a lighter MP4 (`res: 720`), a WebM or GIF, the sound alone (`kind: "audio"`), or PNG images with a see-through background (`kind: "png"`). `saveTo: "downloads"` also puts a copy in the computer's Downloads folder.

## Talking to the user

- Their language. Short sentences. No file names, ids, JSON or code in your messages; say «the third card», «the photo of the minister speaking».
- Report honestly: what you did, what you saw, what you could not check.
