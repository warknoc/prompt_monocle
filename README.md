# Prompt Monocle

Zero-telemetry, offline Chrome extension for prompt engineering, constraint reinforcement, and session drift prevention.

---

## Why Prompt Monocle?

Long conversational threads suffer from instruction decay—where models lose formatting rules, persona constraints, or negative guardrails over successive turns.

Prompt Monocle acts as an intentional, air-gapped HUD to track thread depth and stamp persistent system anchors back into your prompt clipboard with one click.

- **Zero Telemetry:** No remote servers, no background network pings, no analytics.
- **Air-Gapped Storage:** Anchors and counters persist strictly in `chrome.storage.local`.
- **Non-Invasive Architecture:** Avoids fragile DOM input hijacking. Generates clean, predictable Markdown stamps ready to paste into any model interface.

---

## Installation (Developer Mode)

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the `prompt_monocle` directory.

---

## License

MIT License. Free for commercial and private use.
