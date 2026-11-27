# The Haraka plan: every field

A plan is one JSON object. Haraka refuses any field not listed here, and says which one and where.

## The plan

| Field | What it is |
|---|---|
| `name` | The video's name (the user sees it in their projects). |
| `format` | `portrait` (9:16, 1080×1920), `landscape` (16:9, 1920×1080), `square` (1:1) or `feed` (4:5). |
| `fps` | Frames per second: 30 (or 24, 25, 60). |
| `duration` | Length in seconds (more than 0, at most 3600). |
| `bg` | The background: `{ "c1": "#RRGGBB", "c2": "#RRGGBB", "angle": 0–360 }`, a gradient from c1 to c2. Same colour twice for a flat one. |
| `theme` | `{ "accent": "#RRGGBB", "text": "#RRGGBB" }`: the video's accent and text colours (Haraka's templates use them). |
| `markers` | Section marks on the timeline: `[{ "t": seconds, "label": "…" }]`. |
| `art` | Your own drawings for `svg` elements: `{ "key": { "vb": [x, y, w, h], "body": "<svg markup without the <svg> tag>" } }`. Plain shapes and paths only: no scripts, no links, no images. |
| `style` | One look over the whole video (colours, fonts, surface, pace, transitions): `editorial`, `clean`, `news`, `bold`, `cinema`, `tech`, `soft`, `light`, `story`, `paper`, `archive`, `explainer`, `swiss`, `blueprint`, `newsprint`, `doodle`, `glass`. `editorial` also turns photos black and white. The plan's `bg` and `theme` win over it. |
| `music` | Music for the video, though a plan holds no file. `{ "mood": "calm" }`: music made in Haraka in that mood (`calm`, `upbeat`, `cinematic`, `lofi`, `tech`, `news`, `inspire`, `under`, `sharqi`), at the video's length, put in by itself when the video opens (free to use, nothing to download). `{ "ask": true }`: a bar asks the person for their own music file when the video opens; picked, it goes in from 0, cut to the video's length, faded out at the end. Both together: the made music now, and the person may replace it with their own. `fade_out` (seconds, default 2), `duck` (dB the music goes down under speech, default 10; 0 for none), `seed` (another piece in the same mood). |
| `elements` | The list of elements, back to front (at least one). |

(`sound` exists too, but it needs an audio file already in a Haraka project: do not use it in a plan the user opens fresh.)

## An element

Every element:

| Field | What it is |
|---|---|
| `type` | `title` (a title design: only `name`, `design`, `start`, `end`, `texts`; see `titles.md`), `photo3d` (an editorial 3D photo: only `name`, `start`, `end`, `title` (words over it, a `{word}` in the accent, 120 letters at most), `cut` (true: the subject cut out of its background); with no photo in a plan it is a place the user fills when opening the video), `text`, `rect`, `ellipse`, `line`, `svg` (also `drawing`, `image`, `video`: they need files in the project; not in a fresh plan). |
| `name` | A short name, shown on the timeline. Keep it the same when you rebuild the plan: it keeps the element. |
| `start`, `end` | When it is on screen, in seconds of the video. |
| `x`, `y` | Its centre, in % of the frame. |
| `w`, `h` | Its size, in u (a hundredth of the frame's short side). A text sizes itself; give it `width` instead. |
| `rotation` | Degrees. |
| `opacity` | 0–100. |
| `pivot` | The point it turns and scales around, `[x %, y %]` of itself. |
| `in`, `out` | How it comes in and leaves: a name (lists below) or `null` for none. Default: fade in; no exit for what lasts to the end. |
| `keys` | Your own motion: `{ "prop": [[seconds, value, ease], …] }`. Props: `x`, `y`, `w`, `h`, `rotation`, `opacity`, `scale` and the colours `color`, `fill`, `stroke` (`"#RRGGBB"`). Applied before `in`/`out`. |
| `keys_after` | The same, applied after `in`/`out` (they win). |
| `draw` | `[from, to]` seconds: a line or drawing is drawn on over that time. |
| `shadow` | 0–100: a soft shadow under it. |

A `text`:

| Field | What it is |
|---|---|
| `text` | The words. `\n` starts a new line. |
| `size` | The letters' height in u. Tall video: a title 11–14, a line under it 6–7; wide video: a title 8–10, a line 4.5–5.5. |
| `weight` | 400, 600 or 800 (the font's weights). |
| `font` | A font name (list in SKILL.md). |
| `color` | `"#RRGGBB"`. |
| `align` | `center` (default), `right`, `left`. |
| `line_height` | Between lines, e.g. 1.3. |
| `width` | Its widest line, in u: it wraps there. Leave it out for one line as written. |
| `box` | A box behind it: `{ "color": "#RRGGBB", "opacity": 0–100, "pad": u, "radius": u }`. |
| `words` | Word by word: a word animation's name, or `{ "anim": name, "every": seconds between words, "dur": each word's own coming in, "ease": name }`, or `{ "anim": name, "at": [the second each word comes in, one per word] }`. Replaces the fade in. |
| `words_out` | A word animation to leave by. |

A `rect`: `fill`, `radius` (in %: 50 = round ends), `dash`. An `ellipse`: `fill`, `dash`. A `line`: `fill` (its colour), `dash`; its `w` is its length and `h` its thickness. An `svg`: `art` (a key of the plan's `art`).

## Names

- `in` names: fade, rise, drop, pop, zoom, fromRight, fromLeft, fromBottom, fromTop, slideStart, slideEnd, wipe, softWipe, softWipeEnd, iris, grow, stretch, typeOn, glow, spin, spin3d, flip3d, tilt3d, rubber, squash, anticipate, follow, exaggerate, arcRight, arcLeft, edgeUp, edgeDown, edgeRight, edgeLeft, streakRight, streakLeft, lightPen, trackIn, cubeIn, count, chartGrow, draw, drawFill, creditsRoll.
- `out` names: fade, sink, zoom, blur, slide, wipe, softWipe, toRight, toLeft, toBottom, toTop, pushUp, zoomThrough, cubeOut, anticipate, edgeUp, edgeDown, edgeRight, edgeLeft, streakRight, streakLeft, undraw.
- `words` names: rise, drop, blur, pop, spin, letters, lines, wordsRight, wordsLeft, wordsUp, wordsDown, blurRise, blurSlide, converge, typeWords, typewriter, scatter, lettersUp, random, center, wake, tumble, glowType, glowFlash, typeSlide, beat, flicker, scaleFlicker, flipLetters, twist3d, skewIn, glitch, rgbSplit, echo, outlineFill, longShadow, slice, stackLines.
- Eases: linear, smooth, easeIn, easeOut, easeInOut, inQuad, outQuad, inOutQuad, inCubic, outCubic, inOutCubic, inQuart, outQuart, inOutQuart, inExpo, outExpo, inOutExpo, inCirc, outCirc, inOutCirc, inOutSine, inBack, outBack, inOutBack, elastic, bounce, spring, springSoft, springQuick, springHeavy, springPlay, hold.
