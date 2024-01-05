# Scoped Find

A VS Code [extension](https://marketplace.visualstudio.com/items?itemName=ulasozguler.scoped-find) to quickly find something within the current scope your cursor is in.

Officially only supports Python but should work with any other well-formatted code.

## Details

The effect is achieved by finding a top-level, non-empty line before and after the current cursor position, selecting it, and triggering the find functionality with "Find in selection" enabled.

The current keybinding is <kbd>Cmd+3</kbd>. Check out the `Find in Scope` action to reassign.
