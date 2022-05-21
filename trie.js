// Copyright 2022 by [Chris Palmer](https://noncombatant.org), and released
// under the terms of the Apache license, version 2.0.

"use strict";

// A simple [trie](https://en.wikipedia.org/wiki/Trie).
class Trie {
  // Creates a new node.
  constructor(value, children) {
    this.value = value
    this.children = children
  }

  // Creates node(s) for `key` in the trie, and gives it the `value`. Returns
  // the node for `key`.
  //
  // `key` must be iterable (e.g. a string of text).
  put(key, value) {
    let t = this
    for (let k of key) {
      if (!t.children) {
        t.children = { [k]: new Trie() }
      } else if (!t.children[k]) {
        t.children[k] = new Trie()
      }
      t = t.children[k]
    }
    t.value = value
    return t
  }

  // Returns the node for `key`, if present, or `undefined`. The returned node
  // might be empty. It might have no value, and/or it might be the root of a
  // sub-trie.
  get(key) {
    let t = this
    for (let k of key) {
      if (!t.children || !t.children[k]) {
        return undefined
      }      
      t = t.children[k]
    }
    return t
  }

  // Returns a `Set` containing the value of `this` (if defined) and the values
  // of all the nodes underneath it (if any).
  values() {
    const s = new Set()
    if (this.value !== undefined) {
      s.add(this.value)
    }
    if (this.children) {
      for (let c in this.children) {
        for (let x of this.children[c].values()) {
          s.add(x)
        }
      }
    }
    return s
  }

  // Returns a JSON string representing all the values returned by `values`.
  toString() {
    return JSON.stringify(Array.from(this.values()))
  }
}
