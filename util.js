// Copyright 2022 by [Chris Palmer](https://noncombatant.org)
// SPDX-License-Identifier: Apache-2.0

"use strict";

export const log = function() {
  results.innerText = Array.from(arguments).join(" ")
  console.log(...arguments)
}

export const setsEqual = function(set1, set2) {
  if (set1.length !== set2.length) {
    return false
  }
  for (let e of set1) {
    if (!set2.has(e)) {
      return false
    }
  }
  return true
}
