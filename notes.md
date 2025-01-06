1. Review and re-aggregate overlaps.
2. Bind exports (root-relative).
3. Update build tool to remap export paths.
4. Finish tests.
5. Link template TS configuration files to `build` and `test`.
6. Gulp CWDs and base paths
7. Move markdown utilities to new package? What about version utilities? Or standard build scripts?
8. Maybe add other documentation files to build output?
9. Improve watch behavior to cover all files.

1. Create project readme and license (and update package.json license!) and other docs files. Update contributing file with branch rulesets info.
2. Graphics

1. Git hooks: run tests before allowing merges?

1. GitHub require status checks/CodeQL check for branch protection? (would require dev branch)
2. GitHub packages?
3. Decide how to use annotations or markdown exports, especially for attestations and SBOMs.
4. Restructure workflow with currenty working system.
5. `syft.yaml` not working. Might discard anyway.
6. Wrap github scripts in callable functions. Make these TS files.

1. Make feature requests and issues issue templates.
2. Published packages aren't public???

In future:
- Watch for `dependabot.yml` group names and commit messages.
- CodeQL categories set right?