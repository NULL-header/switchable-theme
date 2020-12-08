# release

## TOC

* [release](#release)
  * [TOC](#toc)
  * [What is this](#what-is-this)
  * [How to release](#how-to-release)
    * [Preparetion](#preparetion)
    * [How to add](#how-to-add)
    * [Prefixes](#prefixes)
    * [Notes](#notes)

## What is this

This is for the rule is related a release with the github.

## How to release

### Preparetion

First, increase the number of version before to release in last branch. Then, you should commit the change at end of it.  
Second, Take new branch. The name of it must equal the increased version.
At the end, run `yarn prepare:run` to remove files which will be not used, and transpile TypeScript.

### How to add

You must use the web-page of the github when you will release new version.  
And the way is with tag of the commit; So you use the release function of the github.

### Prefixes

This is lower v, and this rule is applied with the names of tag and release title. Add, these is semantic version's number, for example, "v1.0.0".

### Notes

Write the changes to it.  
Add, it is perferable to take a itemization as the way in summary.