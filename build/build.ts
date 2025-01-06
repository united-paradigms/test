import {src, dest, series} from "gulp"
import {cleanAll} from "#clean"
import jsonEditor from "gulp-json-editor"
import jsonMinify from "gulp-jsonminify"
import {join} from "node:path"
import {ProjectPaths} from "@united-paradigms/typescript-configurations.shared"
import {JsonObject} from "type-fest"
import {projectRootPath} from "../$shared/project-structure.ts"

export function buildJsonGlob(glob: string) {
	return src(glob)
		.pipe(jsonMinify())
		.pipe(dest(ProjectPaths.product))
}

export async function build() {
	buildJsonGlob(join(ProjectPaths.source, "**", "*.json"))
	
	src(ProjectPaths.package)
		.pipe(jsonEditor(
			(json: JsonObject) => {
				delete json.workspaces
				delete json.scripts
				
				return json
			}
		))
		.pipe(jsonMinify())
		.pipe(dest(ProjectPaths.product))
	
	src([
		ProjectPaths.readme,
		ProjectPaths.license
	])
		.pipe(dest(ProjectPaths.product))
	
	src(
		[
			ProjectPaths.changelog,
			ProjectPaths.authors,
			ProjectPaths.contributors,
			ProjectPaths.acknowledgments
		],
		{base: projectRootPath}
	)
		.pipe(dest(ProjectPaths.product))
}
build.displayName = "Build"
build.description = "Builds the source code"

export const buildClean = series(cleanAll, build)
buildClean.displayName = "Build: Clean"
buildClean.description = "Builds the source code in a cleaned product directory with a cleaned artifacts directory"