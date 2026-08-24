// GitHub Contents API helpers. All reads/writes target GITHUB_BRANCH in
// GITHUB_REPO. The repo value must be "owner/repo" (no URL prefix).
// GITHUB_TOKEN must be a classic PAT with `repo` scope, or a fine-grained
// token with `contents: write` on the target repo.

const REPO = process.env.GITHUB_REPO!         // 'owner/repo'
const BRANCH = process.env.GITHUB_BRANCH ?? 'pathways-dev'
const API = 'https://api.github.com'

function headers() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

// Percent-encode each path segment individually (spaces, special chars in
// filenames) but leave the '/' separators intact.
function encodePath(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/')
}

/**
 * Read a file from the configured branch.
 * Returns null when the file doesn't exist (404). Throws on any other error.
 */
export async function ghReadFile(
  path: string
): Promise<{ content: string; sha: string } | null> {
  const res = await fetch(
    `${API}/repos/${REPO}/contents/${encodePath(path)}?ref=${BRANCH}`,
    { headers: headers() }
  )
  if (res.status === 404) return null
  if (!res.ok) {
    throw new Error(`GitHub readFile "${path}": ${res.status} ${await res.text()}`)
  }
  const data = await res.json()
  if (Array.isArray(data)) {
    throw new Error(`ghReadFile: "${path}" is a directory, not a file`)
  }
  return {
    content: Buffer.from(data.content as string, 'base64').toString('utf-8'),
    sha: data.sha as string,
  }
}

/**
 * Create or update a file on the configured branch.
 * Pass `sha` when updating an existing file (required by the GitHub API).
 * Returns the git commit SHA.
 */
export async function ghWriteFile(
  path: string,
  content: string,
  message: string,
  sha?: string
): Promise<{ commitSha: string }> {
  const body: Record<string, unknown> = {
    message,
    content: Buffer.from(content, 'utf-8').toString('base64'),
    branch: BRANCH,
  }
  if (sha) body.sha = sha

  const res = await fetch(`${API}/repos/${REPO}/contents/${encodePath(path)}`, {
    method: 'PUT',
    headers: { ...headers(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error(`GitHub writeFile "${path}": ${res.status} ${await res.text()}`)
  }
  const data = await res.json()
  return { commitSha: (data.commit as { sha: string }).sha }
}

/**
 * List files (not subdirectories) in a directory on the configured branch.
 * Returns [] when the directory doesn't exist.
 */
export async function ghListFiles(
  dirPath: string
): Promise<Array<{ name: string; path: string; sha: string }>> {
  const res = await fetch(
    `${API}/repos/${REPO}/contents/${encodePath(dirPath)}?ref=${BRANCH}`,
    { headers: headers() }
  )
  if (res.status === 404) return []
  if (!res.ok) {
    throw new Error(`GitHub listFiles "${dirPath}": ${res.status} ${await res.text()}`)
  }
  const data = await res.json()
  if (!Array.isArray(data)) return []
  return (data as Array<{ type: string; name: string; path: string; sha: string }>)
    .filter((f) => f.type === 'file')
    .map((f) => ({ name: f.name, path: f.path, sha: f.sha }))
}
