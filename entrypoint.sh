#!/bin/sh
set -e
echo "NPM Publish Action ($INPUT_PUBLISH_ARGS)"
if [ -z "$INPUT_TARGET" ]; then
  echo "Target needs to be defined."
  exit 1
elif [ "$INPUT_TARGET" = "npm" ]; then
  echo "Target NPM Chosen"
  if [ -z "$INPUT_NPM_SECRET" ]; then
    echo "NPM Secret needs to be provided!"
    exit 1
  fi
  #npm config set "registry" "https://registry.npmjs.org" --userconfig ./.npmrc
  npm config set "//registry.npmjs.org/:_authToken" "$NPM_SECRET"
  npm publish -reg "https://registry.npmjs.org" $INPUT_PUBLISH_ARGS
  
  exit 0
elif [ "$INPUT_TARGET" = "github" ]; then
  echo "Target Github defined"
  if [ -z "$INPUT_GITHUB_SECRET" ]; then
    echo "Github Secret needs to be provided!"
    exit 1
  fi
  #npm config set "registry" "https://npm.pkg.github.com/$GITHUB_ACTOR" --userconfig ./.npmrc
  npm config set "//npm.pkg.github.com/:_authToken" "$GITHUB_SECRET"
  npm publish -reg "https://npm.pkg.github.com/$GITHUB_ACTOR" $INPUT_PUBLISH_ARGS
  exit 0
else
  echo "Target '$INPUT_TARGET' is unknown! Use either 'github' or 'npm'."
  exit 1
fi