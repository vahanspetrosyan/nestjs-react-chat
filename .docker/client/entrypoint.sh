#!/usr/bin/env bash
echo "Wait installing dependencies..."
npm install --loglevel verbose
echo "Wait running frontend..."
npm run dev

exec "$@"
