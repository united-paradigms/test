import {readFile} from "node:fs/promises"
import {argv} from "node:process"
import {exec as callbackExec} from "node:child_process"
import {dirname, join as joinPaths} from "node:path"
import {promisify} from "node:util"

const exec = promisify(callbackExec)

const commitFileRootRelative = argv.at(-1)
const commitFile = joinPaths(dirname(dirname(import.meta.dirname)), commitFileRootRelative)
console.log(commitFileRootRelative)
console.log(commitFile)
// const commitMessage = await readFile(commitFile, {encoding: "utf-8"})
// const commitMessageMatch = commitMessage.match(/^\[[^\]]+\] \S+/)
// 
// if (!commitMessageMatch) {
// 	console.error("Commit message must be of the form \"[Subject] Message\".")
// 	process.exitCode = 0
// }
// 
// const signatureLog = (await exec("git show --show-signature")).stdout
// const signatureLogMatch = signatureLog.match(/Good signature from/)
// if (!signatureLogMatch) {
// 	console.error("Commit message must be signed.")
// 	process.exitCode = 1
// }