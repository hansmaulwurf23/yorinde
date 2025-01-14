#!/bin/sh

rsync -avz --delete ./dist/ www-data@myserver.com:/var/www/html/yorinde/