import {watch as gulpWatch, series} from "gulp"
import {buildClean, buildJsonGlob} from "#build"
import {deleteAsync} from "del"
import {join as joinPaths, relative as relatePaths} from "node:path"
import gulplog from "gulplog"
import {Chalk} from "chalk"
import {ProjectPaths, ChokidarWatchEvents} from "@united-paradigms/typescript-configurations.shared"

const {info} = gulplog
const chalk = new Chalk({level: 1})

function sourceRelativePath(path: string) {
	return relatePaths(ProjectPaths.source, path)
}
function remapPath(path: string) {
	return joinPaths(ProjectPaths.product, sourceRelativePath(path))
}

export async function watch() {
	await new Promise(() =>
		gulpWatch(
			joinPaths(ProjectPaths.source, "**", "*"),
			{
				events: [
					ChokidarWatchEvents.addFile,
					ChokidarWatchEvents.changeFile,
					ChokidarWatchEvents.deleteFile,
					ChokidarWatchEvents.deleteDirectory
				],
				delay: 250
			}
		)
			.addListener(ChokidarWatchEvents.addFile, (path: string) => {
				if (!path.endsWith(".json")) return
				
				info(`'${chalk.cyan(watch.displayName)}': added file '${chalk.magenta(sourceRelativePath(path))}'`)
				buildJsonGlob(path)
			})
			.addListener(ChokidarWatchEvents.changeFile, (path: string) => {
				if (!path.endsWith(".json")) return
				
				info(`'${chalk.cyan(watch.displayName)}': changed file '${chalk.magenta(sourceRelativePath(path))}'`)
				buildJsonGlob(path)
			})
			.addListener(ChokidarWatchEvents.deleteFile, async (path: string) => {
				if (!path.endsWith(".json")) return
				
				info(`'${chalk.cyan(watch.displayName)}': removed file '${chalk.magenta(sourceRelativePath(path))}'`)
				await deleteAsync(remapPath(path), {force: true})
			})
			.addListener(ChokidarWatchEvents.deleteDirectory, async (path: string) => {
				info(`'${chalk.cyan(watch.displayName)}': removed directory '${chalk.magenta(`${sourceRelativePath(path)}/`)}'`)
				await deleteAsync(remapPath(path), {force: true})
			})
	)
}
watch.displayName = "Watch"
watch.description = "Builds changes to source files as they happen"

export const watchClean = series(buildClean, watch)
watchClean.displayName = "Watch: Clean"
watchClean.description = "Builds changes to source files as they happen after performing a clean build"