#!/bin/bash

props=( ama ath aug blf cjo con ecolatino homernews jax jun ken lub sar sav )

for prop in ${props[@]}
do
	wget http://stats.morris.com/forge?tp=nmtdata\&mbu=$prop\&name=db:nmt_ads.js -O /home/duane.jennings/src/nmt_data/src/mbu/nmt_ads_$prop.js
	echo $prop
	echo -e "\n" >> /home/duane.jennings/src/nmt_data/src/mbu/nmt_ads_$prop.js
done
git status
