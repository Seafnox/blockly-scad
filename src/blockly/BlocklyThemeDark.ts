import Blockly from 'blockly';

// Temporarily required to ensure there's no conflict with
// Blockly.Themes.Dark
Blockly.registry.unregister('theme', 'dark');

export const blocklyThemeDark = Blockly.Theme.defineTheme('dark', {
  base: Blockly.Themes.Classic,
  name: 'dark',
  componentStyles: {
    workspaceBackgroundColour: '#1e1e1e',
    toolboxBackgroundColour: '#333',
    toolboxForegroundColour: '#ffffff',
    flyoutBackgroundColour: '#252526',
    flyoutForegroundColour: '#cccccc',
    flyoutOpacity: 1,
    scrollbarColour: '#797979',
    insertionMarkerColour: '#ffffff',
    insertionMarkerOpacity: 0.3,
    scrollbarOpacity: 0.4,
    cursorColour: '#d0d0d0',
  },
});

