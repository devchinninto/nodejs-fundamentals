export function buildRoutePath(path) {
  // Matches dynamic route parameters like :id, :userId, :postId
  // Pattern breakdown:
  //   :           - Literal colon prefix for route parameters
  //   ([a-zA-Z]+) - Capture group 1: One or more letters (the parameter name)
  //   g           - Global flag: Find all occurrences in the string
  const routeParametersRegex = /:([a-zA-Z]+)/g

  // Replace all :paramName tokens with named capture groups for URL matching
  // Example: "/users/:id/posts/:postId" becomes "/users/(?<id>[a-z0-9\-_]+)/posts/(?<postId>[a-z0-9\-_]+)"
  // Pattern breakdown of replacement:
  //   (?<$1>...)  - Named capture group where $1 is the parameter name from group 1
  //   [a-z0-9\-_]+ - Match one or more alphanumeric characters, hyphens, or underscores
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  // Wrap in a RegExp with ^ anchor to match from the start of the URL path
  // The ^ ensures the match begins at the start of the string
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}