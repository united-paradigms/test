#!/bin/bash
cd ./deployment/ \
&& node \
	--loader="ts-node/esm" \
	--no-warnings="ExperimentalWarning" \
	"../node_modules/.bin/gulp" \
		--gulpfile="main.ts" \
		"Package Version Shorthand"