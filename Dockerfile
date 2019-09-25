FROM node:latest

ARG VERSION
LABEL version="$VERSION" \
  repository="https://github.com/donmahallem/npm-publish-action" \
  homepage="https://donmahallem.github.io/npm-publish-action" \
  maintainer="DonMahallem" \
  "com.github.actions.name"="GitHub NPM Publish Action" \
  "com.github.actions.description"="Github Action for publishing actions to github or npm" \
  "com.github.actions.color"="purple" \
  "com.github.actions.icon"="upload-cloud"


COPY LICENSE README.md /
ADD entrypoint.sh /
ENTRYPOINT [ "/entrypoint.sh" ]