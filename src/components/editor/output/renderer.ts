const esc = (s: string) =>
	s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] || c)

const span = (className: string, text: string) => `<span class="${className}">${esc(text)}</span>`
const bold = (html: string) => `<b>${html}</b>`

// Terminal is always dark (--code-bg). Semantic colors use the dark-theme
// values of --danger / --warning / --success / --lilac-ink so they read on #222.
const C = {
	danger: "text-code-danger",
	warning: "text-code-warning",
	success: "text-code-success",
	accent: "text-code-accent",
	link: "text-code-danger hover:text-code-ink underline",
} as const

const PATTERNS = {
	errorCode: /^error\[E\d+\]:/,
	errorGeneric: /^error:/,
	warning: /^warning:/,
	buildStage: /^\s*(Compiling|Finished|Running)/,
	arrow: /-->/,
	pipeOnly: /^\s*\|\s*$/,
	dashLine: /^(\s*)(\|?)(\s*)(-+)(\s+)(.+)$/,
	lineWithPlus: /^(\s*)(\d+)(\s*)(\+)(.*)$/,
	lineWithPipe: /^(\s*)(\d+)(\s*)(\|)(.*)$/,
	errorMarkers: /\^+/,
	pipeWithPlus: /^(\s*)(\|)(\s*)(\+)$/,
	helpOrNote: /^(\s*)(=)(\s+)(help|note)(:)(.*)$/,
	helpOrNoteStart: /^(\s*)(help|note)(:)(.*)$/,
	boldInfo: /^(Some errors have detailed|For more information|error: could not compile)/,
	blockStart: /^(error\[|error:|warning:)/,
	detailedErrors: /^Some errors have detailed/,
} as const

export function getStderrHTML(text: string): string {
	if (!text) return ""

	const blocks = splitIntoBlocks(text.split("\n"))
	return blocks
		.map((block) => block.map((line, i) => colorizeLine(line, block[i + 1] || "")).join("\n"))
		.join('<hr class="border-t border-code-line my-2">')
}

function splitIntoBlocks(lines: string[]): string[][] {
	const blocks: string[][] = []
	let block: string[] = []

	for (const line of lines) {
		const trimmed = line.trim()
		if (block.length > 0 && (PATTERNS.blockStart.test(trimmed) || PATTERNS.detailedErrors.test(trimmed))) {
			blocks.push(block)
			block = []
		}
		block.push(line)
	}

	if (block.length > 0) blocks.push(block)
	return blocks
}

function colorizeLine(line: string, nextLine: string): string {
	const trimmed = line.trim()

	if (PATTERNS.errorCode.test(trimmed)) return colorizeErrorCode(line)
	if (PATTERNS.errorGeneric.test(trimmed)) return colorizeErrorGeneric(line)
	if (PATTERNS.warning.test(trimmed)) return colorizeWarning(line)
	if (PATTERNS.buildStage.test(line)) return colorizeBuildStage(line)
	if (PATTERNS.arrow.test(line)) return colorizeArrow(line)
	if (PATTERNS.pipeOnly.test(line)) return colorizePipeOnly(line)

	const dashLine = line.match(PATTERNS.dashLine)
	if (dashLine) return colorizeDashLine(dashLine)

	const lineWithPlus = line.match(PATTERNS.lineWithPlus)
	if (lineWithPlus) return colorizeLineWithPlus(lineWithPlus)

	const lineWithPipe = line.match(PATTERNS.lineWithPipe)
	if (lineWithPipe) return colorizeLineWithPipe(lineWithPipe, line, nextLine)

	if (PATTERNS.errorMarkers.test(trimmed)) return colorizeErrorMarkers(line)

	const pipeWithPlus = line.match(PATTERNS.pipeWithPlus)
	if (pipeWithPlus) return colorizePipeWithPlus(pipeWithPlus)

	const helpOrNote = line.match(PATTERNS.helpOrNote)
	if (helpOrNote) return colorizeHelpOrNote(helpOrNote)

	const helpOrNoteStart = line.match(PATTERNS.helpOrNoteStart)
	if (helpOrNoteStart) return colorizeHelpOrNoteStart(helpOrNoteStart)

	if (PATTERNS.boldInfo.test(trimmed)) return bold(esc(line))

	return esc(line)
}

function colorizeErrorCode(line: string): string {
	return esc(line)
		.replace(
			/error\[E(\d+)\]/,
			bold(
				`<a href="https://doc.rust-lang.org/stable/error_codes/E$1.html" target="_blank" rel="noopener" class="${C.link}">error[E$1]</a>`,
			),
		)
		.replace(/(error\[E\d+\]<\/a><\/b>)(: )(.+)$/, `$1${bold(`: ${span(C.danger, "$3")}`)}`)
}

function colorizeErrorGeneric(line: string): string {
	return esc(line).replace(/^(\s*)(error)(: .+)$/, `$1${bold(`${span(C.danger, "$2")}$3`)}`)
}

function colorizeWarning(line: string): string {
	return esc(line).replace(/^(\s*)(warning)(: .+)$/, `$1${bold(`${span(C.warning, "$2")}$3`)}`)
}

function colorizeDashLine(match: RegExpMatchArray): string {
	const [, spaces, pipe, spacesAfter, dashes, spacesBeforeText, text] = match
	let result = esc(spaces)
	if (pipe) result += bold(span(C.accent, pipe))
	result += esc(spacesAfter) + bold(span(C.accent, dashes + spacesBeforeText + text))
	return result
}

function colorizeBuildStage(line: string): string {
	return esc(line).replace(/(Compiling|Finished|Running)/, bold(span(C.success, "$1")))
}

function colorizeArrow(line: string): string {
	return esc(line).replace(/(--&gt;)/g, bold(span(C.accent, "$1")))
}

function colorizePipeOnly(line: string): string {
	return esc(line).replace(/(\|)/g, bold(span(C.accent, "$1")))
}

function colorizeLineWithPlus(match: RegExpMatchArray): string {
	const [, spaces, num, spacesAfter, plus, rest] = match
	return `${esc(spaces)}${bold(span(C.accent, num))}${esc(spacesAfter)}${span(C.success, plus + rest)}`
}

function colorizeLineWithPipe(match: RegExpMatchArray, line: string, nextLine: string): string {
	const [, spaces, num, spacesAfter, pipe, code] = match
	const prefix = `${esc(spaces)}${bold(span(C.accent, num + spacesAfter + pipe))}`

	if (/^\s*\|\s*\+/.test(nextLine)) {
		const charIndex = nextLine.indexOf("+") - line.indexOf("|") - 1
		if (charIndex >= 0 && charIndex < code.length) {
			return (
				prefix +
				esc(code.substring(0, charIndex)) +
				span(C.success, code[charIndex]) +
				esc(code.substring(charIndex + 1))
			)
		}
	}
	return prefix + esc(code)
}

function colorizeErrorMarkers(line: string): string {
	const match = line.match(/^(\s*)(\|?)(\s*)(\^+)(\s+(.+))?$/)
	if (!match) return esc(line)

	const [, spaces, pipe, spacesAfter, carets, , message] = match
	let result = esc(spaces)
	if (pipe) result += bold(span(C.accent, pipe))
	result += esc(spacesAfter) + bold(span(C.danger, carets))
	if (message) {
		const messageStart = match[5].substring(0, match[5].indexOf(message))
		result += esc(messageStart) + bold(span(C.danger, message))
	}
	return result
}

function colorizePipeWithPlus(match: RegExpMatchArray): string {
	const [, spaces, pipe, spacesAfter, plus] = match
	return `${esc(spaces)}${bold(span(C.accent, pipe))}${esc(spacesAfter)}${span(C.success, plus)}`
}

function colorizeHelpOrNote(match: RegExpMatchArray): string {
	const [, spaces, equals, , type, colon, rest] = match
	return `${esc(spaces)}${bold(span(C.accent, equals))} ${bold(esc(type + colon))}${esc(rest)}`
}

function colorizeHelpOrNoteStart(match: RegExpMatchArray): string {
	const [, spaces, type, colon, rest] = match
	const color = type === "help" ? C.success : C.accent
	return `${esc(spaces)}${bold(span(color, type + colon))}${esc(rest)}`
}
