import {
	getParsedCommandLineOfConfigFile,
	readConfigFile,
	sys,
	type ParseConfigFileHost
} from "typescript"
import {fileURLToPath} from "node:url"

function typeScriptConfigurationFileErrors(configurationFilePath: string) {
	const {error} = readConfigFile(configurationFilePath, sys.readFile)
	if (error) throw new Error(error.messageText.toString())
	
	const {errors} = getParsedCommandLineOfConfigFile(
		configurationFilePath,
		undefined,
		sys as unknown as ParseConfigFileHost
	)!
	if (errors.length > 0) throw new Error(errors[0].messageText.toString())
}

const configurationPaths = [
	"./$assets/partials/resources/limited.json",
	"./$assets/partials/resources/unlimited.json",
	"./$assets/partials/plugins/none.json"
]

export async function test() {
	for (const configurationPath of configurationPaths) {
		typeScriptConfigurationFileErrors(
			fileURLToPath(new URL(configurationPath, import.meta.url).href)
		)
	}
}
test.displayName = "Test"
test.description = "Tests the build product"