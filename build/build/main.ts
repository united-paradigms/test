import {src, dest, series} from "gulp"
import {clean} from "../clean/main.ts"
import jsonEditor from "gulp-json-editor"
import jsonMinify from "gulp-jsonminify"

export function buildGlob(glob: string) {
	return src(
		glob,
		{"base": "../source/"}
	)
		.pipe(jsonMinify())
		.pipe(dest("../product/"))
}

export async function build() {
	buildGlob("../source/**/*.json")
	
	src(
		"../package.json",
		{allowEmpty: true}
	)
		.pipe(jsonEditor(
			(json: Record<string, unknown>) => {
				delete json.workspaces
				delete json.scripts
				
				return json
			}
		))
		.pipe(jsonMinify())
		.pipe(dest("../product/"))
	
	src("../license.md",)
		.pipe(dest("../product/"))
	
	src(
		[
			"../docs/readme.md",
			"../docs/authors.md",
			"../docs/contributors.md",
			"../docs/acknowledgments.md"
		],
		{
			allowEmpty: true,
			"base": "../docs/"
		}
	)
		.pipe(dest("../product/"))
}
build.displayName = "Build"
build.description = "Builds the source code"

export const cleanBuild = series(clean, build)
cleanBuild.displayName = "Clean Build"
cleanBuild.description = "Builds the source code in a cleaned product directory"