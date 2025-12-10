import Meta from 'gi://Meta';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

export default class MaximizeMoveExtension extends Extension {
    constructor(metadata) {
        super(metadata);
        this._signals = [];
    }

    enable() {
        try {
            const display = global.display;

            // Track existing windows
            for (const window of display.list_all_windows()) {
                this._trackWindow(window);
            }

            // Track future windows
            const id = display.connect('window-created', (_d, window) => {
                this._trackWindow(window);
            });

            this._signals.push([display, id]);
        } catch (e) {
            logError(e, 'MaximizeMove: enable() failed');
        }
    }

    disable() {
        try {
            for (const [obj, id] of this._signals) {
                try {
                    obj.disconnect(id);
                } catch (_) {
                    // object already destroyed
                }
            }
            this._signals = [];
        } catch (e) {
            logError(e, 'MaximizeMove: disable() failed');
        }
    }

    _trackWindow(window) {
        try {
            if (!window)
                return;

            const h1 = window.connect('notify::maximized-horizontally', () => {
                this._onStateChange(window);
            });

            const h2 = window.connect('notify::maximized-vertically', () => {
                this._onStateChange(window);
            });

            this._signals.push([window, h1]);
            this._signals.push([window, h2]);
        } catch (e) {
            logError(e, 'MaximizeMove: _trackWindow failed');
        }
    }

    _onStateChange(window) {
        try {
            if (!window)
                return;

            // Prevent infinite loop
            if (window._movedOnMaximize)
                return;

            const fullyMaximized =
                window.maximized_horizontally &&
                window.maximized_vertically;

            if (!fullyMaximized) {
                // Reset flag when unmaximized
                window._movedOnMaximize = false;
                return;
            }

            window._movedOnMaximize = true;

            const wm = global.workspace_manager;

            // ALWAYS target a brand-new workspace (end of list)
            const lastIndex = wm.n_workspaces - 1;

            let targetWs = wm.get_workspace_by_index(lastIndex + 1);

            // Dynamic creation
            if (!targetWs) {
                targetWs = wm.append_new_workspace(
                    false,
                    global.get_current_time()
                );
            }

            if (!targetWs)
                return;

            window.change_workspace(targetWs);
            window.maximize(Meta.MaximizeFlags.BOTH);

            // Optional: follow the window
            targetWs.activate(global.get_current_time());
        } catch (e) {
            logError(e, 'MaximizeMove: _onStateChange crashed');
        }
    }
}
