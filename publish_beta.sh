#!/usr/bin/env bash

###################################
# Print error message and abort.
#
# Parameter 1 is line number (optional)
# If parameter 1 is omitted, it will only echo "Aborting." and exit with error code 1.
cleanupAndAbort() {
    echo
    if [[ $# -ge 1 ]]; then echo "Error on line $1 of $0"; fi
    echo "Aborting."
    cleanup
    exit 1
}

PREPARED_PATHS=""
function cleanup {
    for f in ${PREPARED_PATHS}; do
        restoreRepo ${f}
    done
}

# Call cleanupAndAbort() if any command returns with a non-zero exit code:
trap 'cleanupAndAbort $LINENO' ERR
###################################


cd $(dirname "$0") # Change directory to where the script is
SCRIPT_PATH=$(pwd)


function waitForAnyKey {
    echo #Newline
    WAITPROMPT="Press any key to continue (or Ctrl-C to abort)..."
    if [[ -n "$1" ]]; then
        WAITPROMPT="$1"
    fi
    read -d '' -t 1 -n 10000 # Clear stdin of any keypresses, including multiple RETURNs
    read -n1 -s -p "$WAITPROMPT" # Read 1 character silently with prompt
    echo  #Newline
}

function prepareRepo {
    echo

    local folder=$1
    local branch=$2
    local giturl=$3 # e.g. kodeklubben/oppgaver.git

    # Check that path is folder. If not: abort.
    if [[ ! -d ${folder} ]]; then
        echo "ERROR: ${folder} is not a directory."
        echo "Please clone the repo '${giturl}' to the folder ${folder}."
        cleanupAndAbort
    fi

    cd ${folder}
    echo "Preparing repo in $(pwd)"

    # Check that path is git folder. If not: abort.
    if [[ ! $(git rev-parse --show-toplevel 2>/dev/null) = "$(pwd)" ]]; then
        echo "ERROR: $(pwd) is not the top level folder of a git repo."
        cleanupAndAbort
    fi

    # Check that path has no uncommitted changes. If not: abort.
    if [[ -n $(git status --porcelain) ]]; then
        echo "ERROR: The repo in $(pwd) has uncommitted changes."
        cleanupAndAbort
    fi

    # Search for remote alias to $giturl. If found --> remoteAlias, otherwise abort.
    local remoteAlias=""
    if [[ -n ${giturl} ]]; then
        for r in $(git remote); do
          url=$(git remote get-url ${r});
          if [[ $(git remote get-url ${r}) == *${giturl}* ]]; then
            remoteAlias="${r}"
            break;
          fi
        done
        if [[ -z ${remoteAlias} ]]; then
            echo "ERROR: Could not find remote alias for ${giturl}."
            cleanupAndAbort
        fi
        echo "Found reference to ${giturl} in remote alias '${remoteAlias}'"
        git remote update ${remoteAlias}
        remoteAlias="${remoteAlias}/"
    fi


    # Check that ${remoteAlias}/master exists, otherwise abort.
    local fullbranch="${remoteAlias}/master"
    if ! git branch --remotes | grep -q ${branch}; then
        echo "ERROR: Could not find ${branch}"
        abort
    fi

    echo "Checking out ${branch}"
    git -c advice.detachedHead=false checkout ${branch}
    PREPARED_PATHS="${PREPARED_PATHS} ${folder}" # So they can be restored back
}

function restoreRepo {
    echo

    folder=$1
    cd ${folder}
    echo "Restoring repo in folder $(pwd)"
    git checkout - # checkout previously checked out branch
}


#########################
### MAIN SCRIPT START ###
#########################

CCV_PATH=${SCRIPT_PATH}
CCV_URL="kodeklubben/codeclub-viewer.git"
CCV_BRANCH="master"

OPPGAVER_PATH=$(dirname ${SCRIPT_PATH})/oppgaver    # ../oppgaver
OPPGAVER_URL="kodeklubben/oppgaver.git"
OPPGAVER_BRANCH="master"

BETA_PATH=$(dirname ${SCRIPT_PATH})/beta            # ../beta
BETA_BRANCH="gh-pages"

echo -n "Attempting to get github url to beta fork (requires SSH access to github)... "
BETA_URL=$(node getBetaFork.js)
echo "Success!"
echo
echo
echo "This script will compile kodeklubben/codeclub-viewer and kodeklubben/oppgaver and publish to ${BETA_URL}"
echo "The script expects that the following repos have been cloned to the locations shown below."
echo "It expects that the following repos have been cloned to the following locations:"
echo "    (HTTPS or SSH) kodeklubben/codeclub-viewer.git    --> ${CCV_PATH}"
echo "    (HTTPS or SSH) kodeklubben/oppgaver.git           --> ${OPPGAVER_PATH}"
echo "    (SSH) ${BETA_URL}     --> ${BETA_PATH}"
echo
echo -n "Continue? [y/N]:"
read answer
if [ "${answer}" != "y" ]; then
    echo "Publish aborted.";
    exit 0
fi

prepareRepo "${CCV_PATH}" "${CCV_BRANCH}" "${CCV_URL}"
prepareRepo "${OPPGAVER_PATH}" "${OPPGAVER_BRANCH}" "${OPPGAVER_URL}"
prepareRepo "${BETA_PATH}" "${BETA_BRANCH}" "${BETA_URL}"

cleanup
