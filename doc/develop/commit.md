# commit

## TOC

* [What is this](#what-is-this)
* [Commit messages](#commit-messages)
  * [Prefixes](#prefixes)
  * [Contents](#contents)
* [Rebase](#rebase)

## What is this

This is for the rule which is related a commit with the git.

## Commit messages

### Prefixes

You must use the prefix when you commit differences, from the followings; And do not forget to add a colon and space after it.

* add
  * To use when you add files.
  * For example, "add: config file of webpack"
* fix
  * To use when you fix such as bugs.
  * For example, "fix: bugs showing wrong texts"
* update
  * To use when you change files without to fix something.
  * For example, "update: add functions for the validate"
* delete
  * To use when you delete files.
  * Do not use this when you delete lines of a file.
  * For example, "delete: not used file"

### Contents

You should write a sentence like the followings as the message. But you are not forced these.

* Ways
  * Write your ways as content of the message.
  * how to do and what you done are good.
* Purposes
  * Be Specifically.
* Targets
  * Whichever is fine to include the file names it or not on the message.

## Rebase

You should do a interactive rebase like the followings.

* Frequently
  * It is hard when it is ocurred the conflict by long interval.
* Cleanly
  * The purpose is to clean the logs more.
* Beforely
  * running `git push`.
  * making Pull requests.
