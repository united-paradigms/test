import {join as joinPaths, dirname, type sep} from "node:path"

export const projectRootPath = dirname(import.meta.dirname)

const documentationDirectoryName = "docs"
export const ProjectResourceNames = {
	source: "source",
	build: "build",
	product: "product",
	artifacts: "artifacts",
	documentation: documentationDirectoryName,
	package: "package.json",
	license: "license.md",
	readme: joinPaths(documentationDirectoryName, "readme.md"),
	changelog: joinPaths(documentationDirectoryName, "changelog.md"),
	authors: joinPaths(documentationDirectoryName, "authors.md"),
	contributors: joinPaths(documentationDirectoryName, "contributors.md"),
	acknowledgments: joinPaths(documentationDirectoryName, "acknowledgments.md")
} as const
type ProjectResourceNames = typeof ProjectResourceNames
type ProjectResourceNamesKeys = keyof ProjectResourceNames

const projectPathsAccumulant = {}
for (const projectDirectoryName in ProjectResourceNames) {
	projectPathsAccumulant[projectDirectoryName] = joinPaths(
		projectRootPath,
		ProjectResourceNames[projectDirectoryName]
	)
}
export const ProjectPaths = projectPathsAccumulant as {
	[ProjectDirectoryNamesKey in ProjectResourceNamesKeys]:
		`${typeof projectRootPath}${typeof sep}${ProjectResourceNames[ProjectDirectoryNamesKey]}`
}