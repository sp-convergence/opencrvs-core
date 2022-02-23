# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.
#
# OpenCRVS is also distributed under the terms of the Civil Registration
# & Healthcare Disclaimer located at http://opencrvs.org/license.
#
# Copyright (C) The OpenCRVS Authors. OpenCRVS and the OpenCRVS
# graphic logo are (registered/a) trademark(s) of Plan International.
set -e

print_usage_and_exit () {
    echo 'Usage: ./deploy.sh --clear-data=yes|no --restore-metadata=yes|no --update-metadata=yes|no HOST ENV VERSION COUNTRY_CONFIG_VERSION COUNTRY_CONFIG_PATH'
    echo "  --clear-data must have a value of 'yes' or 'no' set e.g. --clear-data=yes"
    echo "  --restore-metadata must have a value of 'yes' or 'no' set e.g. --restore-metadata=yes"
    echo "  --update-metadata must have a value of 'yes' or 'no' set e.g. --update-metadata=yes"
    echo "  ENV can be 'production' or 'development' or 'qa'"
    echo '  HOST    is the server to deploy to'
    echo "  VERSION can be any OpenCRVS Core docker image tag or 'latest'"
    echo "  COUNTRY_CONFIG_VERSION can be any OpenCRVS Country Configuration docker image tag or 'latest'"
    echo "  COUNTRY_CONFIG_PATH path to where your resources package is located"
    echo "  REPLICAS number of supported mongo databases in your replica set.  Can be 1, 3 or 5"
    exit 1
}

if [ -z "$1" ] || { [ $1 != '--clear-data=no' ] && [ $1 != '--clear-data=yes' ] ;} ; then
    echo 'Error: Argument --clear-data is required in position 1.'
    print_usage_and_exit
fi

if [ -z "$2" ] || { [ $2 != '--restore-metadata=no' ] && [ $2 != '--restore-metadata=yes' ] ;} ; then
    echo 'Error: Argument --restore-metadata is required in position 2.'
    print_usage_and_exit
fi

if [ -z "$3" ] || { [ $3 != '--update-metadata=no' ] && [ $3 != '--update-metadata=yes' ] ;} ; then
    echo 'Error: Argument --update-metadata is required in postition 3.'
    print_usage_and_exit
fi

if [ -z "$4" ] ; then
    echo 'Error: Argument ENV is required in position 4.'
    print_usage_and_exit
fi

if [ -z "$5" ] ; then
    echo 'Error: Argument HOST is required in position 5.'
    print_usage_and_exit
fi

if [ -z "$6" ] ; then
    echo 'Error: Argument VERSION is required in position 6.'
    print_usage_and_exit
fi


if [ -z "$7" ] ; then
    echo 'Error: Argument COUNTRY_CONFIG_VERSION is required in position 7.'
    print_usage_and_exit
fi

if [ -z "$8" ] ; then
    echo 'Error: Argument COUNTRY_CONFIG_PATH is required in position 8.'
    print_usage_and_exit
fi

if [ -z "$9" ] ; then
    echo 'Error: Argument REPLICAS is required in position 9.'
    print_usage_and_exit
fi

ENV=$4
HOST=$5
VERSION=$6
COUNTRY_CONFIG_VERSION=$7
COUNTRY_CONFIG_PATH=$8
REPLICAS=$9
SSH_USER=${SSH_USER:-root}
SSH_HOST=${SSH_HOST:-$HOST}
LOG_LOCATION=${LOG_LOCATION:-/var/log}

# Netdata user and passwrod
NETDATA_USER=${NETDATA_USER:-monitor}
NETDATA_PASSWORD=${NETDATA_PASSWORD:-monitor-password}
NETDATA_USER_DETAILS_BASE64=`echo $(htpasswd -nb $NETDATA_USER $NETDATA_PASSWORD) | base64`

echo $NETDATA_USER $NETDATA_PASSWORD $NETDATA_USER_DETAILS_BASE64

echo
echo "Deploying VERSION $VERSION to $SSH_HOST..."
echo
echo "Deploying COUNTRY_CONFIG_VERSION $COUNTRY_CONFIG_VERSION to $SSH_HOST..."
echo

mkdir -p /tmp/compose/infrastructure/default_backups
mkdir -p /tmp/compose/infrastructure/default_updates

# Copy selected country default backups to infrastructure default_backups folder
cp $COUNTRY_CONFIG_PATH/backups/hearth-dev.gz /tmp/compose/infrastructure/default_backups/hearth-dev.gz
cp $COUNTRY_CONFIG_PATH/backups/openhim-dev.gz /tmp/compose/infrastructure/default_backups/openhim-dev.gz
cp $COUNTRY_CONFIG_PATH/backups/user-mgnt.gz /tmp/compose/infrastructure/default_backups/user-mgnt.gz
cp $COUNTRY_CONFIG_PATH/backups/application-config.gz /tmp/compose/infrastructure/default_backups/application-config.gz

# Copy selected country default updates to infrastructure default_updates folder
[[ -d $COUNTRY_CONFIG_PATH/updates/generated ]] && cp $COUNTRY_CONFIG_PATH/updates/generated/*.json /tmp/compose/infrastructure/default_updates

# Copy all infrastructure files to the server
rsync -rP docker-compose* infrastructure $SSH_USER@$SSH_HOST:/tmp/compose/

# Copy all country compose files to the server
rsync -rP $COUNTRY_CONFIG_PATH/docker-compose.countryconfig* infrastructure $SSH_USER@$SSH_HOST:/tmp/compose/

# Override configuration files with country specific files
rsync -rP /tmp/compose/infrastructure $SSH_USER@$SSH_HOST:/tmp/compose


# Prepare docker-compose.deploy.yml and docker-compose.<COUNTRY>.yml file - rotate secrets etc
if [[ "$ENV" = "development" ]]; then
    ssh $SSH_USER@$SSH_HOST '/tmp/compose/infrastructure/rotate-secrets.sh /tmp/compose/docker-compose.deploy.yml /tmp/compose/docker-compose.countryconfig.staging-deploy.yml | tee -a '$LOG_LOCATION'/rotate-secrets.log'
elif [[ "$ENV" = "qa" ]]; then
    ssh $SSH_USER@$SSH_HOST '/tmp/compose/infrastructure/rotate-secrets.sh /tmp/compose/docker-compose.deploy.yml /tmp/compose/docker-compose.qa-deploy.yml /tmp/compose/docker-compose.countryconfig.qa-deploy.yml | tee -a '$LOG_LOCATION'/rotate-secrets.log'
else
  if [ "$REPLICAS" = "3" ]; then
    ssh $SSH_USER@$SSH_HOST '/tmp/compose/infrastructure/rotate-secrets.sh /tmp/compose/docker-compose.deploy.yml /tmp/compose/docker-compose.prod-deploy-3.yml /tmp/compose/docker-compose.countryconfig.prod-deploy.yml | tee -a '$LOG_LOCATION'/rotate-secrets.log'
  elif [ "$REPLICAS" = "5" ]; then
    ssh $SSH_USER@$SSH_HOST '/tmp/compose/infrastructure/rotate-secrets.sh /tmp/compose/docker-compose.deploy.yml /tmp/compose/docker-compose.prod-deploy-5.yml /tmp/compose/docker-compose.countryconfig.prod-deploy.yml | tee -a '$LOG_LOCATION'/rotate-secrets.log'
  else
    echo "Error: Can only deply 3 or 5 replicas to production"
    exit 1
  fi
fi
# Setup configuration files and compose file for the deployment domain
ssh $SSH_USER@$SSH_HOST '/tmp/compose/infrastructure/setup-deploy-config.sh '$HOST' '$NETDATA_USER_DETAILS_BASE64' | tee -a '$LOG_LOCATION'/setup-deploy-config.log'

# Deploy the OpenCRVS stack onto the swarm
if [[ "$ENV" = "development" ]]; then
    ssh $SSH_USER@$SSH_HOST 'cd /tmp/compose && HOSTNAME='$HOST' VERSION='$VERSION' COUNTRY_CONFIG_VERSION='$COUNTRY_CONFIG_VERSION' PAPERTRAIL='$PAPERTRAIL' docker stack deploy -c docker-compose.deps.yml -c docker-compose.yml -c docker-compose.deploy.yml -c docker-compose.countryconfig.staging-deploy.yml --with-registry-auth opencrvs'
elif [[ "$ENV" = "qa" ]]; then
    ssh $SSH_USER@$SSH_HOST 'cd /tmp/compose && HOSTNAME='$HOST' VERSION='$VERSION' COUNTRY_CONFIG_VERSION='$COUNTRY_CONFIG_VERSION' PAPERTRAIL='$PAPERTRAIL' docker stack deploy -c docker-compose.deps.yml -c docker-compose.yml -c docker-compose.deploy.yml -c docker-compose.qa-deploy.yml -c docker-compose.countryconfig.qa-deploy.yml --with-registry-auth opencrvs'
else
  if [ "$REPLICAS" = "3" ]; then
    ssh $SSH_USER@$SSH_HOST 'cd /tmp/compose && HOSTNAME='$HOST' VERSION='$VERSION' COUNTRY_CONFIG_VERSION='$COUNTRY_CONFIG_VERSION' PAPERTRAIL='$PAPERTRAIL' docker stack deploy -c docker-compose.deps.yml -c docker-compose.yml -c docker-compose.deploy.yml -c docker-compose.prod-deploy-3.yml -c docker-compose.countryconfig.prod-deploy.yml --with-registry-auth opencrvs'
  elif [ "$REPLICAS" = "5" ]; then
    ssh $SSH_USER@$SSH_HOST 'cd /tmp/compose && HOSTNAME='$HOST' VERSION='$VERSION' COUNTRY_CONFIG_VERSION='$COUNTRY_CONFIG_VERSION' PAPERTRAIL='$PAPERTRAIL' docker stack deploy -c docker-compose.deps.yml -c docker-compose.yml -c docker-compose.deploy.yml -c docker-compose.prod-deploy-5.yml -c docker-compose.countryconfig.prod-deploy.yml --with-registry-auth opencrvs'
  else
    echo "Unknown error running docker-compose on server as REPLICAS is not 3 or 5 in production."
    exit 1
  fi
fi


echo
echo "Waiting 2 mins for stack to deploy before working with data..."
echo
sleep 120


if [ $1 == "--clear-data=yes" ] ; then
    echo
    echo "Clearing all existing data..."
    echo
    ssh $SSH_USER@$SSH_HOST 'REPLICAS='$REPLICAS' && /tmp/compose/infrastructure/clear-all-data.sh'
fi

if [ $2 == "--restore-metadata=yes" ] ; then
    echo
    echo "Restoring metadata..."
    echo
    ssh $SSH_USER@$SSH_HOST 'REPLICAS='$REPLICAS' && /tmp/compose/infrastructure/restore-metadata.sh'
fi

if [ $3 == "--update-metadata=yes" ] ; then
    echo
    echo "Updating existing metadata..."
    echo
    ssh $SSH_USER@$SSH_HOST 'REPLICAS='$REPLICAS' && /tmp/compose/infrastructure/restore-metadata-updates.sh'
fi
