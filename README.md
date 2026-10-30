# QuizIBA — Vocabulary Practice

A buildless vocabulary learning app with Word Smart study collections, original practice sentences, flashcards, quizzes, and local progress tracking.

## Features

- 60 starter entries and 1,679 imported Word Smart source records (1,678 usable for practice).
- Original example sentences for every usable Word Smart entry.
- 5, 10, 20, 50, 100, or 200-question quizzes.
- Large previous/next chevrons and preserved scroll position.
- Saved answers and automatic quiz resume after reopening the same browser.
- New, Learning, Learned, and Starred filters, manual levels, and a progress dashboard.
- Light and neutral charcoal dark themes.
- Custom word import and JSON backup/restore.

Progress is stored in browser localStorage, not an online account. Export a backup before clearing browser data or switching devices.

## Run locally

No installation or build step is required. With Python 3 installed:

```sh
python3 -m http.server 8080 --directory dist
```

Open http://localhost:8080. Static hosting should serve the contents of `dist/`.

## Verification

With Node.js installed, run from the repository root:

```sh
node tests/progress.cjs
node tests/navigation.cjs
```

## Files

- `dist/index.html`: layout and styles.
- `dist/app.js`: application behavior and starter words.
- `dist/word-smart.js`: imported entries and example sentences.
- `content/examples.json`: original example sentence source mapping.
- `tests/`: checks for progress, quiz sizes, navigation, and resume.

## Content notes

The Word Smart collections were imported from user-supplied study PDFs. Definitions may contain errors inherited from those lists. One malformed record, Word Smart 2 entry 89, is retained for clarification and excluded from practice. Two obvious source spelling errors are corrected with notes in the app.

This is an independent study tool, unaffiliated with Word Smart or its publisher. Original practice sentences are provided alongside the imported definitions. No license for third-party source material is asserted by this repository.
