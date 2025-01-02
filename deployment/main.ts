import {readFile} from "node:fs/promises"

export async function packageVersionRetrieval() {
	const fileContents = await readFile("./package.json", "utf-8")
	return JSON.parse(fileContents).version as string
}

export async function shorthandPackageVersionRetrieval() {
	const currentVersion = await packageVersionRetrieval()
	return currentVersion.replace(
		/^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)/,
		(...args: unknown[]) => {
			const match = args[0] as string
			const {major, minor, patch} =
				args.at(-1) as Record<"major" | "minor" | "patch", string>
			switch (true) {
				case minor == "0" && patch == "0": return major
				case patch == "0": return `${major}.${minor}`
				default: return match
			}
		}
	)
}
shorthandPackageVersionRetrieval.displayName = "Shorthand Package Version Retrieval"
shorthandPackageVersionRetrieval.description = "Gets the shorthand of the current version of the package"