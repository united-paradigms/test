#!/bin/bash
color_reset=$(tput sgr0)
color_green=$(tput setaf 2)

git config \
	"core.hooksPath" \
	"./scripts/git-hooks/" \
&& echo ${color_green}✓${color_reset} Git hooks registered.