# Claude Instructions

## Git Policy

**NEVER perform any git operations (add, commit, push, pull, etc.) without explicit user request.**

The user wants to manage all git interactions themselves. This includes:
- ❌ Do not run `git add`, `git commit`, `git push`, `git pull` automatically
- ❌ Do not suggest or recommend git operations unless asked
- ❌ Do not include git operations as part of "completing" a task
- ✅ Only perform git operations when the user explicitly asks for them
- ✅ Focus on code changes and let the user handle version control

## Example
- **Wrong**: "Let me commit these changes for you..."
- **Right**: "The changes are complete. You can commit them when ready."

The user prefers to have full control over their git workflow and commit history.

## Dev Server Policy

**ALWAYS check if the dev server is already running before attempting to start it.**

Before running any dev server commands:
- ✅ Check if a dev server process is already running (look for existing processes on common ports like 4321, 3000, 8080)
- ✅ Use `ps aux | grep` or `lsof -i` to check for running processes
- ✅ Only start the dev server if it's not already running

This prevents port conflicts and unnecessary duplicate processes.