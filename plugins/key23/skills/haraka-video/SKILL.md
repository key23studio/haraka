---
name: haraka-video
description: Write a motion video for Haraka (حركة · KEY23), the Arabic motion studio, as a video plan file the user opens at haraka.thekey23.com. Animated titles, offers, quotes, announcements, short promos and explainers made of text, shapes and motion, wide (16:9), tall (9:16) or square. Use when the user asks for a motion video, an animated text, a reel or story of words, «فيديو موشن», «اعمل لي فيديو», «فيديو عرض», «فيديو اقتباس», «إعلان متحرك», «فيديو لحركة», or names Haraka or KEY23. Not for editing an existing camera video (that needs the Haraka program itself).
---

# A motion video for Haraka, written as a plan

You write the whole video as one **plan**: a JSON file that describes its size, length, colours and every element on screen with its time, place, look and motion. The user opens it in **Haraka** (in the browser, free, nothing to install), sees the finished video, changes anything by hand, and exports an MP4.

The user judges what they **see**, not the file. Talk to them about the video, in their language (Arabic if they write Arabic), in short sentences.

## The order of work

1. **Ask only what you cannot know** (one short message, then wait). Skip any question the request already answers:
   - the words: the text of the video. Use the user's words as they wrote them. Never invent a fact, a number, a price, a name, a date or a phone number; if one is missing, ask.
   - the frame: tall 9:16 (`portrait`: Reels, Stories, TikTok, WhatsApp status), wide 16:9 (`landscape`: YouTube, screens, X) or square (`square`: feeds). A platform named decides it; do not ask.
   - colours or a brand, only if the user cares; otherwise choose a calm palette yourself (one background, one accent, white or near-black text).
2. **Write the plan** following «The plan» and «Making it look good» below. **Build it mostly from title designs** (`references/titles.md`): KEY23's own designs, which always look finished; put the user's words in their places. Add your own texts and shapes only around them. The full field list is in `references/plan-format.md`; look at the files in `examples/` the first time.
3. **Check the plan yourself** against «Before you hand it over».
4. **Give a link** that opens the video in Haraka with one tap. If you can run code, make it with this (Python), the plan in `plan`:

   ```python
   import json, zlib, base64
   raw = json.dumps(plan, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
   c = zlib.compressobj(9, zlib.DEFLATED, -15)
   link = "https://haraka.thekey23.com/app/#plan=z." + base64.urlsafe_b64encode(c.compress(raw) + c.flush()).decode().rstrip("=")
   print(link)
   ```

   Give the whole link, exactly as printed, as a link the user can tap («افتح الفيديو في حركة»). The video is inside the link after `#`: it is never sent to a server.
   **Also give the plan as a file** named after the video, ending in `.json` (for example `branch-opening.json`), for when a link is cut. If you cannot run code, give only the file (or, if you cannot make files, the JSON in one code block, to be saved as a `.json` file). Never type a link by hand: it must be made by the code.
5. **Tell the user how to open it**, in their language, in these words or close to them:
   - The link: tap it. Haraka opens with the video ready. Press play.
   - The file: open **haraka.thekey23.com/app**, press **«استيراد مشروع»**, choose the file.
   - Change anything by tapping it; **«تصدير»** makes the MP4.

   If Haraka says the plan has a problem, it names the element and the field. Ask the user to paste that message to you; fix the plan and give the link and file again.
6. Notes from the user: change the plan, keep each element's `name` (it keeps the element the same), and give a new link and the whole file again, with a new number in its name (`branch-opening-2.json`). Say what changed.

## The plan

```json
{
  "name": "…", "format": "portrait", "fps": 30, "duration": 12,
  "bg": { "c1": "#14213D", "c2": "#0B1220", "angle": 160 },
  "theme": { "accent": "#F5B841", "text": "#FFFFFF" },
  "markers": [{ "t": 0, "label": "الافتتاح" }],
  "elements": [ { "type": "text", "name": "Title", "text": "…", "start": 0.3, "end": 4, "x": 50, "y": 40, "size": 9, "weight": 800, "font": "Cairo", "color": "#FFFFFF", "in": "pop", "out": "fade" } ]
}
```

- **Units.** `x`, `y`: the element's centre, in % of the frame (50, 50 is the middle). `w`, `h`, `size`, `width`, a box's `pad` and `radius`: in **u**, a hundredth of the frame's short side (10.8 px on a 1080×1920 video). A rect's `radius` is in % (50 = round ends). Times are seconds of the video.
- **Elements are drawn in order**: the first is at the back. Backgrounds and shapes first, texts after them.
- Element types you use here: `title` (a title design: `{ "type": "title", "name": "…", "design": "t-box", "start": 1, "end": 5, "texts": ["…", "…"] }`, designs in `references/titles.md`), `text`, `rect`, `ellipse`, `line`, `svg` (your own drawing, from `art`). Do not use `image`, `video`, `drawing` or `sound`: those need files that are in the user's Haraka project, not in a plan. If the user wants their photo, logo or music, tell them to add it in Haraka after opening the plan («وسائط»).
- `in` / `out`: how an element comes in and leaves (a name from the lists below, or `null` for none). Default: a fade in; nothing leaves at the very end.
- `words`: a text that appears word by word: a word animation's name, or `{ "anim": "rise", "every": 0.25 }` (seconds between words). It replaces the text's `in`.
- `keys`: your own motion, `{ "y": [[0, 60], [1.2, 50, "outCubic"]] }` (seconds, value, ease); colours too (`[[0, "#FFFFFF"], [2, "#F5B841"]]`).
- Give every element a short `name` («العنوان», «السعر»): the user sees it on the timeline.
- Unknown fields are refused. Use only the fields in `references/plan-format.md`.

**Names you can use**

- Fonts: Cairo, Tajawal, Readex Pro, IBM Plex Sans Arabic, Noto Kufi Arabic, Changa, El Messiri, Reem Kufi, Lalezar, Aref Ruqaa, Alexandria, Marhey, Amiri, Markazi Text (Arabic); Inter, Montserrat, Playfair Display, Bebas Neue (Latin).
- `in` names: fade, rise, drop, pop, zoom, fromRight, fromLeft, fromBottom, fromTop, slideStart, slideEnd, wipe, softWipe, iris, grow, stretch, typeOn, glow, spin, flip3d, tilt3d, rubber, squash, arcRight, arcLeft, edgeUp, edgeDown, edgeRight, edgeLeft, streakRight, streakLeft, lightPen, trackIn, count (a number counts up), draw (a line is drawn).
- `out` names: fade, sink, zoom, blur, slide, wipe, softWipe, toRight, toLeft, toBottom, toTop, pushUp, zoomThrough, edgeUp, edgeDown, edgeRight, edgeLeft, streakRight, streakLeft, undraw.
- `words` names: rise, drop, blur, pop, blurRise, blurSlide, wordsRight, wordsLeft, wordsUp, wordsDown, typeWords, typewriter, letters, lettersUp, lines, converge, scatter, center, wake, beat, glowType, typeSlide, skewIn, echo, stackLines.

In Arabic, prefer `fromRight`/`wordsRight` style motion that follows reading (right to left).

## Making it look good

- **Title designs first.** One design per moment carries the words (a kicker and a title, a box, a name strap, a follow ending). Keep each text about as long as the words it replaces. Two designs never on screen at once.
- **One idea per moment.** At most two texts on screen at once (a line and a smaller line under it). A new thing every 2–4 seconds.
- **Reading time.** Each text stays at least 1 s + 0.4 s per word. A whole video: 6–20 s for social media unless the user asks otherwise.
- **Sizes (u). Bigger than you think**: a phone shows the video small. Tall video: one big word 16–22, a title 11–14, a line under it 6–7, small print never under 4.5. Wide video: a title 8–10, a line 4.5–5.5, small print never under 3.5. Give long texts a `width` (in u) so they wrap: 80 on a tall video, 120 on a wide one.
- **Fill the frame.** On a tall video the words sit around the middle (y 35–60 %), not all in the top half. A large soft shape behind them (an `ellipse` in a tone close to the background, `opacity` 50–70) gives depth.
- **Lining up.** `x` is an element's centre. To line texts up on one edge, give them the same `x`, the same `width` and the same `align` (`left` or `right`).
- **Safe area.** Keep every text inside x 8–92 % and y 10–80 % on a tall video (the app's buttons cover the edges and the bottom), y 10–88 % on a wide one.
- **Contrast.** Light text on a dark background or the reverse. Text over the accent colour: give it a `box` in the accent with dark text.
- **One accent colour**, used for the key word, the price, the line under the title. Background: two close dark tones (`bg.c1`, `bg.c2`) for depth.
- **Weights**: 800 for titles, 600 for lines under them.
- **The ending**: the call to action (اطلب الآن، تابعنا، احجز) or the brand name stays on screen at least 2 s, to the end.
- Arabic numerals or Latin digits: as the user wrote them. Phone numbers in a Latin font (Inter) so they read left to right.

## Before you hand it over

- Every element: `start` < `end` ≤ `duration`; the plan's `format` is one of portrait, landscape, square, feed.
- No two texts overlap in place at the same time (compare their `y` and sizes).
- Every word, number, price, date and phone number is the user's own.
- The JSON is valid: double quotes, no trailing commas, no comments.

## What Haraka does with it

The plan becomes a normal Haraka project on the user's own device (in their browser): every element is editable, nothing is sent anywhere, and the export is an MP4 made on their device. Haraka checks the plan before making anything; a field it does not know is named with where it is, and nothing is made until it is fixed.
