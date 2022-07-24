// Copyright 2022 by [Chris Palmer](https://noncombatant.org), and released
// under the terms of the Apache license, version 2.0.

"use strict";

import { log } from "./util.js"

// A complex but realistic use of `Trie`: A searchable database of songs, such
// as a music player might use.
//
// In this demo, string keys map to `Set`s of song objects, and each `Set` may
// contain some of the same songs that other `Set`s do. This necessitates a bit
// of complexity in the insertion logic in `loadSongData`.

// Returns an array of all the distinct words in `string`.
const getWords = function(string) {
  string = decodeURI(string)
  string = string.toLocaleLowerCase()
  return string.split(/\W+/)
}

// `fetch`es data.json, which contains metadata for a list of songs. Then, for
// each textual metadata element, inserts each word into `trie` and sets the
// node’s `value` to a `Set` of matching songs.
//
// Extracting the songs and printing them out is shown in `getButtonOnClick` in
// demo.html.
export const loadSongData = async function(trie) {
  let start = performance.now()
  const response = await fetch("data.json")
  const songs = await response.json()
  let end = performance.now()
  log("loaded in", Math.round(end - start), "ms")

  start = performance.now()
  for (let song of songs) {
    for (let k of ["pathname", "album", "artist", "name", "genre"]) {
      const words = getWords(song[k])
      for (let w of words) {
        let v = trie.get(w)
        if (v !== undefined) {
          if (v.value !== undefined) {
            v.value.add(song)
          } else {
            v.value = new Set([song])
          }
          v = v.value
        } else {
          trie.put(w, new Set([song]))
        }
      }
    }
  }
  end = performance.now()
  log("built trie in", Math.round(end - start), "ms")
}
