#!/usr/bin/env sh
set -eu

NEOFORGE_VERSION="21.1.247"
INSTALLER="neoforge-${NEOFORGE_VERSION}-installer.jar"
ARGS="libraries/net/neoforged/neoforge/${NEOFORGE_VERSION}/unix_args.txt"

if [ ! -f "$ARGS" ]; then
  echo "Installing NeoForge ${NEOFORGE_VERSION}..."
  java -jar "$INSTALLER" --installServer
fi

exec java @user_jvm_args.txt @"$ARGS" nogui
