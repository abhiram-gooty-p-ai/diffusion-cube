// Removes a YAML frontmatter block from the start of a markdown string.
// Handles both LF and CRLF line endings, and optional trailing spaces on the
// --- delimiters — common in AI-generated content and GitHub file reads.
export function stripFrontmatter(markdown: string): string {
  return markdown.replace(/^---[ \t]*\r?\n[\s\S]*?\r?\n---[ \t]*(\r?\n|$)/, '');
}
