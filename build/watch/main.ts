import {watch as gulpWatch, series} from "gulp"
import {cleanBuild} from "../build/main.ts"
import {buildGlob} from "../build/main.ts"
import {deleteAsync} from "del"
import {
	join as joinPaths,
	relative as relatePaths
} from "node:path"
import gulplog from "gulplog"
import {Chalk} from "chalk"

const {info} = gulplog
const chalk = new Chalk({level: 1})

function sourceRelativePath(path: string) {
	return relatePaths("../source/", path)
}
function remapPath(path: string) {
	return joinPaths("../product/", sourceRelativePath(path))
}

export async function watch() {
	await new Promise(() =>
		gulpWatch(
			"../source/**/*",
			{
				events: ["add", "change", "unlink", "unlinkDir"],
				delay: 250
			}
		)
			.addListener("add", (path: string) => {
				if (!path.endsWith(".json")) return
				
				info(`'${chalk.cyan(watch.displayName)}': added file '${chalk.magenta(sourceRelativePath(path))}'`)
				buildGlob(path)
			})
			.addListener("change", (path: string) => {
				if (!path.endsWith(".json")) return
				
				info(`'${chalk.cyan(watch.displayName)}': changed file '${chalk.magenta(sourceRelativePath(path))}'`)
				buildGlob(path)
			})
			.addListener("unlink", async (path: string) => {
				if (!path.endsWith(".json")) return
				
				info(`'${chalk.cyan(watch.displayName)}': removed file '${chalk.magenta(sourceRelativePath(path))}'`)
				await deleteAsync(remapPath(path), {force: true})
			})
			.addListener("unlinkDir", async (path: string) => {
				info(`'${chalk.cyan(watch.displayName)}': removed directory '${chalk.magenta(`${sourceRelativePath(path)}/`)}'`)
				await deleteAsync(remapPath(path), {force: true})
			})
	)
}
watch.displayName = "Watch"
watch.description = "Builds changes to source files as they happen"

export const cleanWatch = series(cleanBuild, watch)
cleanWatch.displayName = "Clean Watch"
cleanWatch.description = "Builds changes to source files as they happen after performing a clean build"