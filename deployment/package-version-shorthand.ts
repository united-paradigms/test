import {writeFile, mkdir as makeDirectory} from "node:fs/promises"
import {readPackage} from "read-pkg"
import {parse as parseSemanticVersion} from "semver"

export async function packageVersionShorthand() {
	const packageVersion = (
		await readPackage({cwd: "../", normalize: false})
	).version
	const {major, minor, patch, prerelease} = parseSemanticVersion(packageVersion)!
	
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
	
	makeDirectory("../artifacts/gulp/", {recursive: true})
	writeFile(
		"../artifacts/gulp/version.txt",
		`${major}${lesserParts}${prereleasePart}`,
		{encoding: "utf-8", }
	)
}
packageVersionShorthand.displayName = "Package Version Shorthand"
packageVersionShorthand.description = "Gets the sanitized shorthand of the current version of the package"