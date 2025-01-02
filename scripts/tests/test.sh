#!/bin/bash
cd ./tests/ \
&& node \
	--loader="ts-node/esm" \
	--no-warnings="ExperimentalWarning" \
	"../node_modules/.bin/gulp" \
		--gulpfile="main.ts" \
		"Test"