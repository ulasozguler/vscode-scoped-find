const assert = require("assert")
const { findTopLevel, isTopLevel } = require("../src/core")

suite("Extension Test Suite", () => {
  test("isTopLevel truthy", () => {
    assert.ok(isTopLevel("# comment"))
    assert.ok(isTopLevel("class Test"))
    assert.ok(isTopLevel("def Test"))
    assert.ok(isTopLevel('"""'))
  })

  test("isTopLevel falsy", () => {
    assert.ok(!isTopLevel(""))
    assert.ok(!isTopLevel(" "))
    assert.ok(!isTopLevel("    "))
    assert.ok(!isTopLevel(" "))
    assert.ok(!isTopLevel("    print('hello')"))
    assert.ok(!isTopLevel("    class InnerClass"))
    assert.ok(!isTopLevel("    def inner_func():"))
  })

  class MockDocument {
    constructor(text) {
      this.lines = text.split("\n")
    }

    lineAt(index) {
      return { text: this.lines[index] }
    }

    get lineCount() {
      return this.lines.length
    }
  }

  test("findTopLevel single function", () => {
    const text = `def func1():
    print("hello")`
    const doc = new MockDocument(text)
    assert.strictEqual(findTopLevel(doc, 0, true), 0, "start line number when cursor is on the first line")
    assert.strictEqual(findTopLevel(doc, 0, false), 2, "end line number when cursor is on the first line")
    assert.strictEqual(findTopLevel(doc, 1, true), 0, "start line number when cursor is on the second line")
    assert.strictEqual(findTopLevel(doc, 1, false), 2, "end line number when cursor is on the second line")
  })

  test("findTopLevel multiple functions", () => {
    const text = `def func1():
    print("hello")

func2():
    print("hello")`
    const doc = new MockDocument(text)
    assert.strictEqual(findTopLevel(doc, 0, true), 0, "start line number when cursor is on the first line")
    assert.strictEqual(findTopLevel(doc, 0, false), 3, "end line number when cursor is on the first line")
    assert.strictEqual(
      findTopLevel(doc, 3, true),
      3,
      "start line number when cursor is on the first line of the second function"
    )
    assert.strictEqual(
      findTopLevel(doc, 3, false),
      5,
      "end line number when cursor is on the first line of the second function"
    )
  })

  test("findTopLevel empty lines in the function", () => {
    const text = `def func1():
    print("hello")

    print("again")

func2():
    print("hello")`
    const doc = new MockDocument(text)
    assert.strictEqual(findTopLevel(doc, 0, true), 0, "start line number when cursor is on the first line")
    assert.strictEqual(findTopLevel(doc, 0, false), 5, "end line number when cursor is on the first line")
    assert.strictEqual(findTopLevel(doc, 2, true), 0, "start line number when cursor is on an empty line")
    assert.strictEqual(findTopLevel(doc, 2, false), 5, "end line number when cursor is on an empty line")
  })
})
