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
URL_PATH_PREFIX="beta"

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

# Find the (first) remote alias for the cloned repo in the current folder (pwd) given (part of) a git url.
# Typical values for remoteAlias is "origin" and "upstream"
function getRemoteAlias {
    local giturl = $1

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
    else
        echo "ERROR: Url to git not specified"
        cleanupAndAbort
    fi

    echo ${remoteAlias}
}

function checkRepo {
    echo

    if [[ $# != 3 ]]; then
        echo "ERROR: checkRepo takes 3 arguments, got $#"
        cleanupAndAbort
    fi

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
    #echo "Preparing repo in $(pwd)"

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

    local remoteAlias=$(getRemoteAlias ${giturl})

    # Check that ${remoteAlias}/${branch} exists, otherwise abort.
    local fullbranch="${remoteAlias}/${branch}"
    if ! git branch --remotes | grep -q ${fullbranch}; then
        echo "ERROR: Could not find ${branch} in repo ${remoteAlias}"
        abort
    fi

    echo
    echo "Checking out ${fullbranch}"
    git -c advice.detachedHead=false checkout ${fullbranch}
    PREPARED_PATHS="${PREPARED_PATHS} ${folder}" # So they can be restored back
}

function restoreRepo {
    echo

    folder=$1
    cd ${folder}
    echo "Restoring repo in folder $(pwd)"
    git checkout - # checkout previously checked out branch
}

function checkRequirements {
    cd ${CCV_PATH}
    NODEVERSION=`node -v`
    RECOMMENDEDVERSION=`cat .nvmrc`
    if [ "${NODEVERSION//v}" != "${RECOMMENDEDVERSION}" ]; then
      echo "Node version is ${NODEVERSION}"
      echo "Recommended version is ${RECOMMENDEDVERSION}"
      echo "Are you sure you want to continue?"
      waitForAnyKey
    else
      echo "Detected adequate version of node (${NODEVERSION})"
    fi
    if ! command -v yarn >/dev/null 2>&1; then
      echo "yarn package manager not installed. Aborting."
      echo "Install yarn (see e.g. https://yarnpkg.com/lang/en/docs/install/) and try again."
      cleanupAndAbort
    else
      echo "yarn package manager detected."
    fi
    if ! command -v rsync >/dev/null 2>&1; then
      echo "Could not find the rsync command. Aborting."
      cleanupAndAbort
    else
      echo "rsync command detected."
    fi
}

function prepareBuild {
    BUILD_PATH="${CCV_PATH}/dist"
    if [ -n "${URL_PATH_PREFIX}" ]; then
      echo "${URL_PATH_PREFIX}" > url-path-prefix.config;
      BUILD_PATH="${BUILD_PATH}/${URL_PATH_PREFIX}"
    fi
}

function buildDist {
    cd ${CCV_PATH}
    yarn
    yarn build:prod
}

function syncDistToBeta {
    echo "Syncing files: ${BUILD_PATH}/ --> ${BETA_PATH}"
    rsync --dry-run --progress -r --delete ${BUILD_PATH}/ ${BETA_PATH}
    cd ${BETA_PATH}
    git add -A
}

function gitPush {
    echo "Pushing to ${BETA_URL}"
    cd ${BETA_PATH}
    #git push
}


#########################
### MAIN SCRIPT START ###
#########################

echo
echo -n "Checking if current github user has a fork of kodeklubben/beta (requires SSH access to github)... "
BETA_FORK=$(node getBetaFork.js)
echo "Success!"

CCV_PATH=${SCRIPT_PATH}
CCV_BRANCH="master"
CCV_URL="kodeklubben/codeclub-viewer.git"

OPPGAVER_PATH=$(dirname ${SCRIPT_PATH})/oppgaver    # ../oppgaver
OPPGAVER_BRANCH="master"
OPPGAVER_URL="kodeklubben/oppgaver.git"

BETA_PATH=$(dirname ${SCRIPT_PATH})/beta            # ../beta
BETA_BRANCH="gh-pages"
BETA_URL="git@github.com:${BETA_FORK}.git"          # Specify git@github.com since we need SSH to push result

echo
echo "This script will compile kodeklubben/codeclub-viewer using kodeklubben/oppgaver and publish to ${BETA_FORK}."
echo -n "Continue? [y/N]:"
read answer
if [ "${answer}" != "y" ]; then
    echo "Publish aborted.";
    exit 0
fi

checkRequirements

prepareRepo "${CCV_PATH}"         "${CCV_BRANCH}"         "${CCV_URL}"
prepareRepo "${OPPGAVER_PATH}"    "${OPPGAVER_BRANCH}"    "${OPPGAVER_URL}"
prepareRepo "${BETA_PATH}"        "${BETA_BRANCH}"        "${BETA_URL}"

#echo "The script expects that the following repos have been cloned to the locations shown below."
#echo "It expects that the following repos have been cloned to the following locations:"
#echo "    (HTTPS or SSH) kodeklubben/codeclub-viewer.git    --> ${CCV_PATH}"
#echo "    (HTTPS or SSH) kodeklubben/oppgaver.git           --> ${OPPGAVER_PATH}"
#echo "    (SSH) ${BETA_URL}     --> ${BETA_PATH}"
#echo

#checkRepo "${CCV_PATH}" "${CCV_BRANCH}" "${CCV_URL}"
#checkRepo "${OPPGAVER_PATH}" "${OPPGAVER_BRANCH}" "${OPPGAVER_URL}"
#checkRepo "${BETA_PATH}" "${BETA_BRANCH}" "${BETA_URL}"

prepareBuild
buildDist

echo
echo "Compilation completed. To test, open another terminal and type"
echo "    cd "
echo "    yarn serve"
echo "and open up a browser at http://localhost:8080/${URL_PATH_PREFIX}"
echo
waitForAnyKey "When you are ready, press any key to continues... (Ctrl-C to abort)"

removeOldBeta
copyDistToBeta
gitAdd

echo
echo "The compiled website is now ready to be pushed to ${BETA_URL}."
waitForAnyKey

gitPush

cleanup
