1. Review and re-aggregate overlaps.
2. Bind exports (root-relative).
3. Update build tool to remap export paths.
4. Finish tests. 
5. Link template TS configuration files to `build` and `test`. 
6. Shared build/test module  
7. Gulp CWDs check 

1. Create project readme and license (and update package.json license!).
2. New commit message scheme?
3. Graphics

1. Git hooks?
2. NPM dry run script
3. Automated releases and tagging

1. GitHub environment? (And update workflows)
2. GitHub ruleset
	- Disable main deletion
	- Prevent main force push except by Ciosciaa.
	- Require pull request on main except by Ciosciaa
	
	- Required signed commits on all branches
	- Code scanning on all branches
	
	- Require status checks?
3. GitHub packages and attestations?
4. Test PR actions.

1. Tests run any branch for pull requests (default events) and pushes
2. Pushes to main run tests but also (auto-tag the commit)? and prepare a release.
3. Publicizing a release releases the build via production environment.
4. Make feature requests and issues issue templates.