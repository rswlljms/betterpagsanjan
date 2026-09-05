// Commit message rules for BetterPagsanjan.
//
// Enforced locally by the husky `commit-msg` hook and on pull requests by CI.
// Based on Conventional Commits, with an extra `content` type for civic
// dataset updates (see AGENTS.md §55 and CONTRIBUTING.md).
const commitlintConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature for citizens (e.g. service finder filter)
        "fix", // Bug fix
        "content", // Civic content/data update (services, offices, barangays, sources)
        "docs", // Documentation only
        "style", // Formatting, no logic change
        "refactor", // Code change that adds no feature and fixes no bug
        "perf", // Performance improvement
        "test", // Adding or updating tests
        "build", // Build system or dependencies
        "ci", // CI configuration and scripts
        "chore", // Maintenance that touches no source or content
        "revert", // Revert of a previous commit
      ],
    ],
  },
};

export default commitlintConfig;
