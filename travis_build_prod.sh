#!/bin/sh
echo "Building production files while checking for errors..."

if npm run build:prod:travis | grep --after-context=5 ERROR
then
   echo "Build FAILED!"
   exit 1
else
   echo "Build was successful!"
   exit 0
fi
