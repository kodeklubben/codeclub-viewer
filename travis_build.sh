#!/bin/sh
echo "Building production files while checking for errors."

# Include the pipe to tee in order for the output to be sent to the output log as well as grep
if yarn build:travis | tee /dev/tty | grep --after-context=5 ERROR
then
   echo "Build FAILED!"
   exit 1
else
   echo "Build was successful!"
   exit 0
fi
