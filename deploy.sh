#!/bin/bash

#go to target directory first
cd ~/apps/fb-libs-scraper-client/

#first pull updates from git
echo "pulling updates from remote..."
git pull
echo "Changes pulling DONE"

#build the app first
echo "Generating production build.."
npm run build
echo "Build generate completed!"

#remove previous build
echo "Removing previous build data.."
rm -rf /var/www/html/fb_scraper/*

#now take our current build to their
echo "Moving new build to production route"
mv build/* /var/www/html/fb_scraper/

echo "All process has been completed successfully!"
