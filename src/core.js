function isTopLevel(lineText) {
  return !(lineText.startsWith(" ") || lineText.startsWith("\t")) && lineText.trim().length !== 0
}

function findTopLevel(document, lineNo, before) {
  // return line no if alreadt on a top level line
  if (before) {
    const cursorLineText = document.lineAt(lineNo).text
    if (isTopLevel(cursorLineText)) return lineNo
  }

  // check lines before or after to find a top level line
  const increment = before ? -1 : 1
  lineNo += increment
  while (lineNo > 0 && lineNo < document.lineCount) {
    const lineText = document.lineAt(lineNo).text
    if (isTopLevel(lineText)) break
    lineNo += increment
  }
  return lineNo
}

module.exports = { findTopLevel, isTopLevel }
