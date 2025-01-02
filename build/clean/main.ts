import {deleteAsync} from "del"

export async function clean() {
	await deleteAsync("../product/**/*", {force: true})
}
clean.displayName = "Clean"
clean.description = "Removes everything inside the product directory"