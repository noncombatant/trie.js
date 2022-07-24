# A Simple JavaScript Trie

This is a simple implementation of a trie in JavaScript. It can map any iterable
type (string, array, et c.) to any type.

It would be helpful if something like this were in the JavaScript standard
library. It’s surprisingly applicable in e.g. autocomplete and search UIs. Until
then, you can grab this, and package it up however is convenient for you.

## Usage

Simple usage, e.g. mapping strings to `true` or to other simple values, is
straightforward: use the methods `put`, `get`, and possibly `values`.

For a more complex example mapping strings to `Set`s, see demo.js and demo.html.

## Author And License

Copyright 2022 by [Chris Palmer](https://noncombatant.org), and released under
the terms of the Apache license, version 2.0.
