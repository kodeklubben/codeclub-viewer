#!/usr/bin/env bash

cd $(dirname "$0") # Change directory to where the script is
SCRIPT_PATH=$(pwd)
URL_PATH_PREFIX="beta"
URL_PATH_PREFIX_FILE=url-path-prefix.config

echo
echo -n "Checking if current github user has a fork of kodeklubben/beta (requires SSH access to github)... "
BETA_REPO=$(node getBetaFork.js)
echo "Success!"

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
BETA_BRANCH_NEW="new-gh-pages-publishscript"
BETA_URL="git@github.com:${BETA_REPO}.git"          # Specify git@github.com since we need SSH to push result


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

function removePublishBranch {
    cd ${BETA_PATH}
    if git branch | grep -q ${BETA_BRANCH_NEW}; then
        git branch -D ${BETA_BRANCH_NEW}
    fi
}

PREPARED_PATHS=""
function cleanup {
    if [[ -f ${CCV_PATH}/${URL_PATH_PREFIX_FILE} ]]; then
        rm -f ${CCV_PATH}/${URL_PATH_PREFIX_FILE}
    fi
    for f in ${PREPARED_PATHS}; do
        restoreRepo ${f}
    done
    removePublishBranch
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
    PREPARED_PATHS="${PREPARED_PATHS} ${folder}" # So they can be restored back
}

function restoreRepo {
    echo

    folder=$1
    cd ${folder}
    echo "[INFO] Restoring repo in folder $(pwd)"
    git checkout - # checkout previously checked out branch
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
    if ! command -v rsync >/dev/null 2>&1; then
      echo "[ERROR] Could not find the rsync command. Aborting."
      cleanupAndAbort
    else
      echo "[INFO] rsync command detected."
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
    #yarn build:prod
    yarn build
}

function syncDistToBeta {
    echo "[INFO] Syncing files: ${BUILD_PATH}/ --> ${BETA_PATH}"
    removePublishBranch
    cd ${BETA_PATH}
    git reset --hard  # Make sure working folder is in sync with checkout out branch
    git checkout -b ${BETA_BRANCH_NEW}
    git rm -rf .      # Remove all tracked files and folders in BETA_PATH
    git clean -fxd    # Remove all untracked files and folders in BETA_PATH
    cp -rf ${BUILD_PATH}/ ${BETA_PATH}
    git checkout HEAD -- CNAME                        # Restore back CNAME
    git checkout HEAD -- google91a144a83c954edb.html  # Restore back google search console verification file
    touch .nojekyll
    git add -A
}

function gitPush {
    echo "[INFO] Pushing to ${BETA_URL}"
    cd ${BETA_PATH}
    #git push
}


#########################
### MAIN SCRIPT START ###
#########################

echo
echo "This script will compile ${CCV_REPO}(${CCV_BRANCH}) using ${OPPGAVER_REPO}(${OPPGAVER_BRANCH})"
echo "and publish to ${BETA_REPO}(${BETA_BRANCH})."
askContinue

checkRequirements

echo
echo "[INFO] ### PREPARING FOR BUILD ###"
echo
prepareRepo "${CCV_PATH}"         "${CCV_BRANCH}"         "${CCV_URL}"
prepareRepo "${OPPGAVER_PATH}"    "${OPPGAVER_BRANCH}"    "${OPPGAVER_URL}"
prepareRepo "${BETA_PATH}"        "${BETA_BRANCH}"        "${BETA_URL}"

echo
echo "[INFO] ### BUILDING ###"
echo
prepareBuild
buildDist

echo
echo "Compilation completed. To test, open another terminal and type"
echo "    cd ${CCV_PATH}"
echo "    yarn serve"
echo "and open up a browser at http://localhost:8080/${URL_PATH_PREFIX}"
echo
echo "If everything is ok and you wish to continue, this script will copy and push the new build to ${BETA_URL}."
askContinue

echo
echo "[INFO] ### PREPARING FOR PUSH ###"
echo
syncDistToBeta

echo
echo "The compiled website is now ready to be pushed to ${BETA_URL}."
askContinue

echo
echo "[INFO] ### PUSHING ###"
echo
gitPush

cleanup
