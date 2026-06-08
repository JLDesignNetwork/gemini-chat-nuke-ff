# Gemini Chat Nuke

A Firefox WebExtension (MV3) that injects a UI to bulk delete your Gemini conversations.

## Features

- Injects checkboxes next to your chat history on `gemini.google.com`.
- Select multiple chats to instantly "nuke" them all at once.
- Automated sequential deletion without manual confirmation pop-ups.

## Installation (Unlisted/Development)

1. Download the latest `.zip` from the `archives/` folder (or via Releases).
2. Open Firefox and navigate to `about:addons`.
3. Click the gear icon and select **Install Add-on From File...**
4. Select the `.zip` archive.

## Packaging

If you are modifying the extension locally, you can package a new version with the included script:
```bash
./package.sh <version> <stability>
# Example
./package.sh 1.2 beta
```
This will automatically verify the `manifest.json` version and output a clean `.zip` to the `archives/` directory.

## License

This project is licensed under the MIT License.
