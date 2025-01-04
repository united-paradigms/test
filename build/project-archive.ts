import {src, dest} from "gulp"
import tar from "gulp-tar"
import gzip from "gulp-gzip"

export function archiveProject() {
	return src("**/*")
		.pipe(tar("project-archive.tar"))
		.pipe(gzip())
		.pipe(dest("../artifacts/gulp/"))
}
archiveProject.displayName = "Archive Project"
archiveProject.description = "Archives the entire project in as a \"tar.gz\" file"