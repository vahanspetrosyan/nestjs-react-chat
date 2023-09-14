#!/usr/bin/env bash
echo "Wait installing dependencies..."
npm install --loglevel verbose
echo "Wait running backend..."
npm run start:dev

exec "$@"
