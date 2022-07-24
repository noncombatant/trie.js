// Copyright 2022 by [Chris Palmer](https://noncombatant.org), and released
// under the terms of the Apache license, version 2.0.

"use strict";

// A simple [trie](https://en.wikipedia.org/wiki/Trie). This trie can map any
// iterable to any type.
class Trie {
  // Creates a new node, the root of a (sub-)trie. The node has 2 properties:
  // `value` (any object), and `children` (an array of nodes).
  constructor(value, children) {
    this.value = value
    this.children = children
  }

  // Creates node(s) for `key` in the trie, and gives it the `value`. Returns
  // the node for `key`.
  //
  // `key` must be iterable (string, array, et c.). `value` can be any object.
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

  // Remove the node for `key` (if present).
  remove(key) {
    let t = this
    for (let i = 0; i < key.length - 1; i++) {
      const k = key[i]
      if (!t.children || !t.children[k]) {
        return
      }
      t = t.children[k]
    }
    if (t.children) {
      delete t.children[key[key.length - 1]]
    }
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
    return JSON.stringify(Array.from(this.values()), null, 2)
  }
}
