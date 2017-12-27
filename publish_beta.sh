#!/usr/bin/env bash

cd $(dirname "$0") # Change directory to where the script is

SCRIPT_PATH=$(pwd)
CCV_PATH=${SCRIPT_PATH}
OPPGAVER_PATH=${SCRIPT_PATH}/../oppgaver
BETA_PATH=${SCRIPT_PATH}/../beta

echo "CCV_PATH: ${CCV_PATH}"
echo "OPPGAVER_PATH: ${OPPGAVER_PATH}"
echo "BETA_PATH: ${BETA_PATH}"

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

PREPARED_PATHS=""
function abort {
    echo
    echo "ABORTING!"
    for f in ${PREPARED_PATHS}; do
        restoreRepo ${f}
    done
    exit 1
}

function prepareRepo {
    echo

    local folder=$1
    local giturl=$2 # e.g. kodeklubben/oppgaver.git

    # Check that path is folder. If not: abort.
    if [[ ! -d ${folder} ]]; then
        echo "ERROR: ${folder} is not a directory."
        echo "Please clone the repo '${giturl}' to the folder ${folder}."
        abort
    fi

    cd ${folder}
    echo "Preparing repo in $(pwd)"

    # Check that path is git folder. If not: abort.
    if [[ ! $(git rev-parse --show-toplevel 2>/dev/null) = "$(pwd)" ]]; then
        echo "ERROR: $(pwd) is not the top level folder of a git repo."
        abort
    fi

    # Check that path has no uncommitted changes. If not: abort.
    if [[ -n $(git status --porcelain) ]]; then
        echo "ERROR: The repo in $(pwd) has uncommitted changes."
        abort
    fi

    # Search for remote alias to $giturl. If found --> remoteAlias, otherwise abort.
    local remoteAlias=""
    for r in $(git remote); do
      url=$(git remote get-url ${r});
      if [[ $(git remote get-url ${r}) == *${giturl}* ]]; then
        remoteAlias=${r}
        break;
      fi
    done
    if [[ -z ${remoteAlias} ]]; then
        echo "ERROR: Could not find remote alias for ${giturl}."
        abort
    fi

    git remote update ${remoteAlias}

    # Check that ${remoteAlias}/master exists, otherwise abort.
    local branch="${remoteAlias}/master"
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

prepareRepo ${CCV_PATH}         "kodeklubben/codeclub-viewer.git"
prepareRepo ${OPPGAVER_PATH}    "kodeklubben/oppgaver.git"
prepareRepo ${BETA_PATH}        "kodeklubben/beta.git"

#for r in $(git remote); do
#  url=$(git remote get-url ${r});
#  if [[ ${url} == *"kodeklubben/codeclub-viewer.git"* ]]; then
#    echo "Codeclub-viewer remote name: ${r}"
#    break;
#  fi
#done

#echo -n "Path to repo 'oppgaver' [default=../oppgaver]: "
#read path_to_oppgaver
#if [ -z "${path_to_oppgaver// }" ]; then path_to_oppgaver='../oppgaver'; fi
#
#echo -n "Path to repo 'beta' [default=../beta]: "
#read path_to_beta
#if [ -z "${path_to_beta// }" ]; then path_to_beta='../beta'; fi
