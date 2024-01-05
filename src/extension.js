const { findTopLevel } = require("./core")
const vscode = require("vscode")

async function findInScope() {
  const editor = vscode.window.activeTextEditor
  if (!editor) {
    vscode.window.showInformationMessage("No active editor")
    return
  }
  const document = editor.document
  const cursorLineNo = editor.selection.active.line

  // Finding the starting line and ending line of the scope
  let startLine = findTopLevel(document, cursorLineNo, true)
  let endLine = findTopLevel(document, cursorLineNo, false) - 1

  // Create a new selection from the starting line to the ending line
  const start = new vscode.Position(startLine, 0)
  const end = new vscode.Position(endLine, document.lineAt(endLine).text.length)
  editor.selection = new vscode.Selection(start, end)

  // Open find dialog with "Find in selection" enabled
  await vscode.commands.executeCommand("closeFindWidget")
  await vscode.commands.executeCommand("actions.find")
  await vscode.commands.executeCommand("toggleFindInSelection")
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand("scoped-find.findInScope", findInScope)

  context.subscriptions.push(disposable)
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
