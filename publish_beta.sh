#!/usr/bin/env bash

cd $(dirname "$0") # Change directory to where the script is
SCRIPT_PATH=$(pwd)
URL_PATH_PREFIX="beta"
URL_PATH_PREFIX_FILE=url-path-prefix.config

CCV_PATH=${SCRIPT_PATH}
CCV_BRANCH="master"
CCV_REPO="kodeklubben/codeclub-viewer"
CCV_URL="${CCV_REPO}.git"

OPPGAVER_PATH=$(dirname ${SCRIPT_PATH})/oppgaver    # ../oppgaver
OPPGAVER_BRANCH="master"
OPPGAVER_REPO="kodeklubben/oppgaver"
OPPGAVER_URL="${OPPGAVER_REPO}.git"

BETA_PATH=$(dirname ${SCRIPT_PATH})/beta            # ../beta
BETA_BRANCH="gh-pages"
BETA_REPO="kodeklubben/beta"
BETA_URL="${BETA_REPO}.git"


###################################
# Print error message and abort.
#
# Parameter 1 is line number (optional)
# If parameter 1 is omitted, it will only echo "Aborting." and exit with error code 1.
function cleanupAndAbort() {
    echo
    if [[ $# -ge 1 ]]; then echo "Error on line $1 of $0"; fi
    echo "Aborting."
    cleanup
    exit 1
}

DID_CHECKOUT_IN_PATH=""
function registerCheckoutInPath {
    folder=$1
    DID_CHECKOUT_IN_PATH="${DID_CHECKOUT_IN_PATH} ${folder}"
}

function cleanup {
    if [[ -f ${CCV_PATH}/${URL_PATH_PREFIX_FILE} ]]; then
        rm -f ${CCV_PATH}/${URL_PATH_PREFIX_FILE}
    fi

    # Sort and count paths in DID_CHECKOUT_IN_PATH, and restore repo by checking out branch "count" checkouts ago
    if [[ -n ${DID_CHECKOUT_IN_PATH} ]]; then
        while read -r line; do
            # Each $line is typically "<count> <path>", e.g. "2 /path/to/gitrepo"
            count="${line%% *}"
            preppath="${line##* }"
            restoreRepo ${preppath} ${count}
        done <<< "$(echo ${DID_CHECKOUT_IN_PATH} | xargs -n1 | sort | uniq -c | xargs -n2)"
    fi
}

# Call cleanupAndAbort() if any command returns with a non-zero exit code:
trap 'cleanupAndAbort $LINENO' ERR
###################################

function askContinue {
    local answer=""
    while ! [[ "$answer" =~ ^[yn]$ ]]; do
        echo -n "Continue? [y/n]: "
        read answer
    done
    if [ "${answer}" != "y" ]; then
        cleanupAndAbort
    fi
}

# Find the (first) remote alias for the cloned repo in the current folder (pwd) given (part of) a git url.
# Typical values for remoteAlias is "origin" and "upstream"
function setRemoteAlias {
    local giturl=$1

    remoteAlias=""
    if [[ -n ${giturl} ]]; then
        for r in $(git remote); do
          url=$(git remote get-url ${r});
          if [[ $(git remote get-url ${r}) == *${giturl}* ]]; then
            remoteAlias="${r}"
            break;
          fi
        done
        if [[ -z ${remoteAlias} ]]; then
            echo "[ERROR] Could not find remote alias for ${giturl}."
            cleanupAndAbort
        fi
        echo "[INFO] Found remote '${remoteAlias}' (${giturl})"
    else
        echo "[ERROR] Url to git not specified"
        cleanupAndAbort
    fi
}

function prepareRepo {
    echo

    if [[ $# != 3 ]]; then
        echo "[ERROR] checkRepo takes 3 arguments, got $#"
        cleanupAndAbort
    fi

    local folder=$1
    local branch=$2
    local giturl=$3 # e.g. kodeklubben/oppgaver.git

    # Check that path is folder. If not: abort.
    if [[ ! -d ${folder} ]]; then
        echo "[ERROR] ${folder} is not a directory."
        echo "Please clone the repo '${giturl}' to the folder ${folder}."
        cleanupAndAbort
    fi

    cd ${folder}
    echo "[INFO] Preparing repo in $(pwd)"

    # Check that path is git folder. If not: abort.
    if [[ ! $(git rev-parse --show-toplevel 2>/dev/null) = "$(pwd)" ]]; then
        echo "[ERROR] $(pwd) is not the top level folder of a git repo."
        cleanupAndAbort
    fi

    # Check that path has no uncommitted changes. If not: abort.
    if [[ -n $(git status --porcelain) ]]; then
        echo "[ERROR] The repo in $(pwd) has uncommitted changes."
        cleanupAndAbort
    fi

    setRemoteAlias ${giturl}
    git remote update ${remoteAlias}

    # Check that ${remoteAlias}/${branch} exists, otherwise abort.
    local fullbranch="${remoteAlias}/${branch}"
    if ! git branch --remotes | grep -q ${fullbranch}; then
        echo "[ERROR] Could not find ${branch} in repo ${remoteAlias}"
        abort
    fi

    echo "[INFO] Checking out ${fullbranch}"
    git -c advice.detachedHead=false checkout ${fullbranch}
    registerCheckoutInPath "${folder}"   # So they can be restored back
}

function restoreRepo {
    echo

    folder=$1
    count=$2
    cd ${folder}
    echo "[INFO] Restoring repo in folder $(pwd)"
    git checkout @{-${count}} # checkout a previously checked out branch ("count" checkouts ago)
}

function checkRequirements {
    cd ${CCV_PATH}
    local NODEVERSION=`node -v`
    local REQUIREDVERSION=`cat .nvmrc`
    if [ "${NODEVERSION//v}" != "${REQUIREDVERSION}" ]; then
      echo "[ERROR] Current node version is ${NODEVERSION}, required version is ${REQUIREDVERSION}"
      cleanupAndAbort
    else
      echo "[INFO] Detected adequate version of node (${NODEVERSION})"
    fi
    if ! command -v yarn >/dev/null 2>&1; then
      echo "[ERROR] yarn package manager not installed. Aborting."
      echo "Install yarn (see e.g. https://yarnpkg.com/lang/en/docs/install/) and try again."
      cleanupAndAbort
    else
      echo "[INFO] yarn package manager detected."
    fi
}

function prepareBuild {
    BUILD_PATH="${CCV_PATH}/dist"
    if [ -n "${URL_PATH_PREFIX}" ]; then
      echo "${URL_PATH_PREFIX}" > ${CCV_PATH}/${URL_PATH_PREFIX_FILE}
      BUILD_PATH="${BUILD_PATH}/${URL_PATH_PREFIX}"
    fi
    echo "[INFO] Build path: ${BUILD_PATH}"
}

function buildDist {
    cd ${CCV_PATH}
    yarn
    yarn build:prod
}

function syncDistToBeta {
    echo "[INFO] Replacing old website: ${BUILD_PATH}/ --> ${BETA_PATH}"
    cd ${BETA_PATH}
    git reset --hard  # Make sure working folder is in sync with checkout out branch
    git checkout -B ${BETA_BRANCH}
    registerCheckoutInPath "${BETA_PATH}"
    git rm -rf --quiet .      # Remove all tracked files and folders in BETA_PATH
    git clean -fxd    # Remove all untracked files and folders in BETA_PATH
    cp -rf ${BUILD_PATH}/ ${BETA_PATH}
    git checkout HEAD -- CNAME                        # Restore back CNAME
    git checkout HEAD -- google91a144a83c954edb.html  # Restore back google search console verification file
    touch .nojekyll
    git add -A
    local CCV_COMMIT=$(cd ${CCV_PATH} && git log -n 1 | head -1)
    local OPPGAVER_COMMIT=$(cd ${OPPGAVER_PATH} && git log -n 1 | head -1)
    git commit -m "Publish site from oppgaver/${OPPGAVER_BRANCH} ${OPPGAVER_COMMIT} and codeclub-viewer/${CCV_BRANCH} ${CCV_COMMIT}"
}

function gitPush {
    echo "[INFO] Pushing to ${BETA_FORKED_URL}"
    cd ${BETA_PATH}
    git push --force
}


#########################
### MAIN SCRIPT START ###
#########################

echo
echo -n "Checking if current github user has a fork of kodeklubben/beta (requires SSH access to github)... "
BETA_FORKED_REPO=$(node getBetaFork.js)
echo "Success!"
BETA_FORKED_URL="git@github.com:${BETA_FORKED_REPO}.git"          # Specify git@github.com since we need SSH to push result

echo
echo "This script will compile"
echo "    ${CCV_REPO} (branch '${CCV_BRANCH}') and"
echo "    ${OPPGAVER_REPO} (branch '${OPPGAVER_BRANCH}')"
echo "and publish the result to"
echo "    ${BETA_FORKED_REPO} (branch '${BETA_BRANCH}')."
echo
echo "NOTE: The branch ${BETA_BRANCH} in the forked repo ${BETA_FORKED_REPO}"
echo "      WILL BE RESET to the corresponding remote branch before updated with the new build."
askContinue

checkRequirements

echo
echo "[INFO] ### PREPARING REPOS FOR BUILD ###"
prepareRepo "${CCV_PATH}"         "${CCV_BRANCH}"         "${CCV_URL}"
prepareRepo "${OPPGAVER_PATH}"    "${OPPGAVER_BRANCH}"    "${OPPGAVER_URL}"
prepareRepo "${BETA_PATH}"        "${BETA_BRANCH}"        "${BETA_URL}"

echo
echo "[INFO] ### BUILDING NEW WEBSITE ###"
echo
prepareBuild
buildDist

echo
echo "Compilation completed. To test, open another terminal and type"
echo "    cd ${CCV_PATH}"
echo "    yarn serve"
echo "and open up a browser at http://localhost:8080/${URL_PATH_PREFIX}${URL_PATH_PREFIX:+/}"
echo
echo "If everything is ok and you wish to continue, this script will now copy the new build to ${BETA_PATH} as follows:"
echo "    1) Create a local branch '${BETA_BRANCH}' from '${BETA_BRANCH}' in ${BETA_REPO}"
echo "    2) Copy the new build to ${BETA_PATH}."
echo "    3) Commit the changes to the local '${BETA_BRANCH}'."
echo "    4) Ask if it is ok to FORCE push '${BETA_BRANCH}' to ${BETA_FORKED_URL}."
echo "    5) If the answer to (4) is 'y', then OVERWRITE '${BETA_BRANCH}' in ${BETA_FORKED_URL}"
askContinue

echo
echo "[INFO] ### PREPARING FOR PUSH ###"
echo
syncDistToBeta

echo
echo "The compiled website is now ready to be force pushed to branch '${BETA_BRANCH}' in ${BETA_FORKED_URL}."
echo "Any remote changes WILL BE LOST!"
askContinue

echo
echo "[INFO] ### PUSHING NEW WEBSITE ###"
echo
gitPush

cleanup
