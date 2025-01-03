import {readFile} from "node:fs/promises"
import {gfm} from "micromark-extension-gfm"
import {fromMarkdown} from "mdast-util-from-markdown"
import {gfmFromMarkdown, gfmToMarkdown} from "mdast-util-gfm"
import {toMarkdown} from "mdast-util-to-markdown"
import type {
	Node,
	Parent,
	Literal,
	PhrasingContent,
	Heading,
	RootContent,
	Break,
	Html,
	FootnoteReference,
	ImageReference,
	Image,
	Link,
	LinkReference,
	InlineCode,
	Strong,
	Emphasis,
	Text
} from "mdast"

function nodeIsText(node: Node): node is Text {
	return node.type == "text"
}
function nodeIsEmphasis(node: Node): node is Emphasis {
	return node.type == "emphasis"
}
function nodeIsStrong(node: Node): node is Strong {
	return node.type == "strong"
}
function nodeIsInlineCode(node: Node): node is InlineCode {
	return node.type == "inlineCode"
}
function nodeIsLink(node: Node): node is Link {
	return node.type == "link"
}
function nodeIsLinkReference(node: Node): node is LinkReference {
	return node.type == "linkReference"
}
function nodeIsImage(node: Node): node is Image {
	return node.type == "image"
}
function nodeIsImageReference(node: Node): node is ImageReference {
	return node.type == "imageReference"
}
function nodeIsBreak(node: Node): node is Break {
	return node.type == "break"
}
function nodeIsHeading(node: Node): node is Heading {
	return node.type == "heading"
}
function nodeIsFootnoteReference(node: Node): node is FootnoteReference {
	return node.type == "footnoteReference"
}
function nodeIsHtml(node: Node): node is Html {
	return node.type == "html"
}

function nodeIsLiteral(node: Node): node is Literal {
	return "value" in node
}
function nodeIsParent(node: Node): node is Parent {
	return "children" in node
}
function nodeIsPhrasing(node: Node): node is PhrasingContent {
	return (
		nodeIsText(node)
		|| nodeIsEmphasis(node)
		|| nodeIsStrong(node)
		|| nodeIsInlineCode(node)
		|| nodeIsLink(node)
		|| nodeIsLinkReference(node)
		|| nodeIsImage(node)
		|| nodeIsImageReference(node)
		|| nodeIsBreak(node)
		|| nodeIsHeading(node)
		|| nodeIsFootnoteReference(node)
		|| nodeIsHtml(node)
	)
}

function getPhrasingContent(node: Node) {
	if (nodeIsLiteral(node))
		return node.value
	else if (nodeIsParent(node)) {
		let accumulation = ""
		for (const child of node.children)
			if (nodeIsPhrasing(child)) accumulation += getPhrasingContent(child)
			else throw new Error("Node is a non-phrasing type.")
		
		return accumulation
	} else if (nodeIsBreak(node))
		return "\n"
	else
		throw new Error("Node is an unhandled type.")
}

interface Section {
	heading: Heading | undefined,
	children: RootContent[]
}

function getSections(node: Parent) {
	let currentSection: Section = {heading: undefined, children: []}
	const sections = []
	
	for (const child of node.children) {
		const currentDepth = currentSection.heading?.depth
		
		if (
			nodeIsHeading(child)
			&& currentDepth != undefined
		) {
			currentDepth
			if (currentSection.heading) sections.push(currentSection)
			currentSection = {heading: child, children: []}
		} else
			currentSection.children.push(child)
	}
	
	sections.push(currentSection)
	return sections
}

type HeadingDepths = Heading["depth"]
type HeadingShiftRange = -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5
function shiftHeadings(node: Parent, shift: HeadingShiftRange) {
	if (nodeIsHeading(node)) {
		node.depth += shift
		if (node.depth < 1 || 6 < node.depth) throw new Error()
	}
	
	node.children = node.children.map(
		child => shiftHeadings(child, shift)
	)
	return node
}


function getHighestHeading(node: Parent) {
	let highestHeading = undefined
	for (const section of getSections(node)) {
		if (
			section.heading
			&& section.heading.depth < (highestHeading ?? Infinity)
		) highestHeading = section.heading.depth
	}
	return highestHeading
}

function extractHeading(node: Parent, regex: RegExp) {
	const highestHeading = getHighestHeading(node)
	const sections = getSections(node)
	for (const section of sections) {
		const textContent = getPhrasingContent(section.heading)
		if (regex.test(textContent)) {
			return section.children.map(
				child => shiftHeadings(child, -highestHeading)
			)
		}
	}
}

const doc = await readFile("example.md", "utf-8")
const tree = fromMarkdown(doc, {
	extensions: [gfm()],
	mdastExtensions: [gfmFromMarkdown()]
})
console.log(
	toMarkdown({
		type: "root",
		children: extractHeading(tree, /Yes/)
	}, {extensions: [gfmToMarkdown()]})
)