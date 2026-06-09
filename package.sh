#!/bin/bash

# A simple script to package the extension into the archives folder.
# Usage: ./package.sh <version> <stability>
# Example: ./package.sh 1.2.0 beta

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <version> <stability>"
    echo "Example: $0 1.0 alpha"
    exit 1
fi

VERSION=$1
STABILITY=$2
ARCHIVE_NAME="gemini-chat-nuke-v${VERSION}-${STABILITY}.zip"
ARCHIVE_DIR="archives"

# Read current version from manifest.json
MANIFEST_VERSION=$(grep '"version"' manifest.json | sed -E 's/.*"version": *"([^"]+)".*/\1/')

if [ "$MANIFEST_VERSION" != "$VERSION" ]; then
    echo "Warning: manifest.json version ($MANIFEST_VERSION) does not match the requested version ($VERSION)."
    read -p "Do you want to automatically update manifest.json to version $VERSION? (y/n) " confirm
    echo
    if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
        # Update the version in manifest.json (Cross-platform compatible sed)
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' -E "s/\"version\": *\"[^\"]+\"/\"version\": \"$VERSION\"/" manifest.json
        else
            sed -i -E "s/\"version\": *\"[^\"]+\"/\"version\": \"$VERSION\"/" manifest.json
        fi
        echo "manifest.json updated to version $VERSION."
    else
        echo "Aborted package creation."
        exit 1
    fi
fi

# Ensure archives directory exists
mkdir -p "$ARCHIVE_DIR"

# Remove the old archive if it exists with the same name
if [ -f "$ARCHIVE_DIR/$ARCHIVE_NAME" ]; then
    echo "Removing existing archive: $ARCHIVE_NAME"
    rm "$ARCHIVE_DIR/$ARCHIVE_NAME"
fi

echo "Packaging extension into $ARCHIVE_DIR/$ARCHIVE_NAME..."

# Zip the necessary files, excluding the archives folder, docs, hidden files, the script itself, and GitHub files.
zip -r "$ARCHIVE_DIR/$ARCHIVE_NAME" . -x "archives/*" -x "docs/*" -x ".*" -x "package.sh" -x "README.md" -x "LICENSE" -x "CHANGELOG.md"

echo "Done! Archive created at: $ARCHIVE_DIR/$ARCHIVE_NAME"
