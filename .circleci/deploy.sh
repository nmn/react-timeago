#!/bin/bash

## Required environment variables in CircleCI dashboard
#
# $NPM_USER  - NPM registry username
# $NPM_PASS  - NPM registry password
# $NPM_EMAIL - NPM registry email


if [[ "$CIRCLE_BRANCH" != "master" ]]; then
  echo "Not running a deployment branch."
  exit 0
fi

# Master branch deployment (only runs when a version git tag exists - syntax: "v1.2.3")

VERSION=$(git describe --tags | grep "^v[0-9]\+\.[0-9]\+\.[0-9]\+$")

if [[ "$VERSION" ]]; then
  set -e
  # login
  echo -e "$NPM_USER\n$NPM_PASS\n$NPM_EMAIL" | npm login
  # publish
  npm publish
else
  echo "On the master branch, but no version tag was found. Skipping npm publish."
fi
