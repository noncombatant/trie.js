// Copyright 2022 by [Chris Palmer](https://noncombatant.org), and released
// under the terms of the Apache license, version 2.0.

const log = function() {
  results.innerText = Array.from(arguments).join(" ")
  console.log(...arguments)
}

const setsEqual = function(set1, set2) {
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
