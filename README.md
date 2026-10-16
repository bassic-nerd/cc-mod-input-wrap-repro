# cc-mod-input-wrap-repro

A `Pane` with one focused `Input`. Once the typed value wraps past one row, the field paints row 1, a short fragment ending in `…`, and then blank rows, with the caret on an empty last row.

## Environment

- Claude Code 2.1.300 (still present in 2.1.302), terminal surface
- macOS; seen in Zed's integrated terminal
- Mod API: `ui.render` hook drawing a `Pane` with the `Input` element

## Install and run

From a terminal session, at the prompt:

```
/plugin install cc-mod-input-wrap-repro --marketplace bassic-nerd/cc-mod-input-wrap-repro
```

Answer `y` to add the marketplace, then pick a scope. Or load it straight from a clone, for one session:

```
git clone https://github.com/bassic-nerd/cc-mod-input-wrap-repro
claude --plugin-dir ./cc-mod-input-wrap-repro
```

Then run the slash command `/input-wrap`. It opens a pane and gives it the keyboard.

The whole mod is one file, [`hooks/register.tsx`](hooks/register.tsx).

## Repro steps

1. Run `/input-wrap`. The pane has one focused `Input` (placeholder `describe`) and about 15 free rows below it.
2. Type about 150 characters (for example, a pasted paragraph), enough to wrap onto 3 rows at a pane roughly 82 columns wide.
3. Look at the field. Press Enter at the end: the real length is logged, to show the text is all there.

## Expected

The focused field shows every wrapped row of its value, or at least the rows around the caret.

## Actual

- Row 1 paints.
- Row 2 shows a short fragment ending in `…`.
- Row 3 onward is blank.
- The caret sits on the true last row, on an empty line.
- The field still has focus (the ` ⏎ submit` hint shows) and typing keeps going into the value, so no text is lost. It just cannot be seen. The layout reserves the right number of rows; only the painted text is cut.

## Notes

The `Input` is drawn with a constant empty `value`, an `autoFocus` and a no-op `onInput`, so nothing in the mod redraws while you type. The fault is in how the focused field is painted.


## Checks

```
claude plugin validate .
claude plugin test .
```

```
tsc --noEmit -p .
```

(the last needs the API types in `.claude-plugin/types/`, which Claude Code lays beside a mod it loads from a folder.)

License: MIT.
