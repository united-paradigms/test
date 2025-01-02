#!/bin/bash
cd ./build/ \
&& node \
	--loader="ts-node/esm" \
	--no-warnings="ExperimentalWarning" \
	"../node_modules/.bin/gulp" \
		--gulpfile="main.ts" \
		"Clean Watch"