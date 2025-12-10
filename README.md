# macOS Three Finger Window Switch

A GNOME Shell extension that provides macOS-like three-finger gesture window management for Linux.

## Overview

This extension brings the familiar macOS three-finger window switching experience to GNOME Shell on Linux. It allows you to seamlessly maximize windows and move them between workspaces using intuitive gestures or keyboard shortcuts.

## Features

- **Maximize to Workspace**: Automatically maximize windows when moving between workspaces
- **Window Tracking**: Intelligently tracks all open windows and their states
- **Seamless Integration**: Works smoothly with GNOME Shell's native window management

## Installation

1. Clone or download this repository to your GNOME extensions directory:
   ```bash
   git clone https://github.com/GhostlyPresence/macOS-three-finger-window-switch-gnome ~/.local/share/gnome-shell/extensions/macOS-three-finger-window-switch
   ```

2. Restart GNOME Shell:
   - Press `Alt + F2`, type `r`, and press Enter
   - Or log out and log back in

3. Enable the extension using GNOME Extensions app or `gnome-extensions enable macOS-three-finger-window-switch`

## Supported Versions

- GNOME Shell 46+

## Usage

Once installed and enabled, the extension automatically monitors window creation and management. Windows will be maximized and moved between workspaces according to the extension's logic.

## Project Structure

- `extension.js` - Main extension logic and window management implementation
- `metadata.json` - Extension metadata and configuration
- `README.md` - This file

## Development

### Requirements

- GNOME Shell 46+
- gnome-shell-extension-tool (optional, for testing)

### Building and Testing

1. Create a symlink in your extensions directory
2. Restart GNOME Shell
3. Check the journal for errors: `journalctl /usr/bin/gnome-shell -f`

## Troubleshooting

If the extension doesn't work:

1. Check GNOME Shell version: `gnome-shell --version`
2. View error logs: `journalctl /usr/bin/gnome-shell -f -n 50`
3. Disable and re-enable the extension
4. Ensure the extension UUID matches: `macOS-three-finger-window-switch`

## Contributing

Feel free to submit issues and enhancement requests!

## License

Please check the repository for licensing information.

## Author

Manas Sinha 