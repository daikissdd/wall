#!/bin/sh
gulp
git add -A
git commit -m'build_update'
git subtree push  --prefix=dist origin gh-pages
