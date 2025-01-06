import {join as joinPaths} from "node:path"
import {deleteAsync} from "del"
import {parallel} from "gulp"
import {ProjectPaths} from "@united-paradigms/typescript-configurations.shared"

export async function cleanProduct() {
	await deleteAsync(joinPaths(ProjectPaths.product, "**", "*"), {force: true})
}
cleanProduct.displayName = "Clean: Product"
cleanProduct.description = "Removes everything inside the product directory"

export async function cleanArtifacts() {
	await deleteAsync(joinPaths(ProjectPaths.artifacts, "**", "*"), {force: true})
}
cleanArtifacts.displayName = "Clean: Artifacts"
cleanArtifacts.description = "Removes everything inside the artifacts directory"

export const cleanAll = parallel(cleanProduct, cleanArtifacts)
cleanAll.displayName = "Clean: All"
cleanAll.description = "Removes everything inside the product and artifacts directories"