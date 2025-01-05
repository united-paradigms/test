import {readPackage} from "read-pkg"
import {parse as parseSemanticVersion} from "semver"

const packageVersion = (
	await readPackage({cwd: "../", normalize: false})
).version
const {major, minor, patch, prerelease} = parseSemanticVersion(packageVersion)

let lesserParts
if (minor == 0 && patch == 0)
	lesserParts = ""
else if (patch == 0)
	lesserParts = `.${minor}`
else
	lesserParts = `.${minor}.${patch}`

let prereleasePart
if (prerelease.length == 0)
	prereleasePart = ""
else
	prereleasePart = `-${prerelease.join(".")}`

export const versionTag = `versions/${major}${lesserParts}${prereleasePart}`