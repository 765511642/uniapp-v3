# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

This is a **uni-app (Vue 3) WeChat Mini Program** frontend project. There is no backend, database, or server in this repository — all API endpoints are remote. See `README.md` for full tech stack details.

### Key commands

All commands are defined in `package.json` scripts. The essentials:

| Task | Command |
|------|---------|
| Install deps | `pnpm install` |
| Dev build (watch) | `pnpm dev` |
| Production build | `pnpm build` |
| Lint | `pnpm lint` |
| Lint + auto-fix | `pnpm lint:fix` |

### Gotchas

- **esbuild postinstall**: `pnpm install` may warn about ignored build scripts for `esbuild`. The esbuild binary is needed by Vite. After `pnpm install`, run `node node_modules/.pnpm/esbuild@0.20.2/node_modules/esbuild/install.js` to ensure the platform binary is available. The update script handles this automatically.
- **No automated tests**: The project has no unit/integration test suite. Validation is done via `pnpm lint` and successful `pnpm dev` / `pnpm build`.
- **WeChat DevTools required for preview**: The compiled output in `dist/dev/mp-weixin` or `dist/build/mp-weixin` can only be previewed in WeChat Developer Tools (a desktop GUI app), which is unavailable in Cloud Agent VMs. Build verification is limited to confirming the build succeeds and output files are generated.
- **Dev build is a watcher**: `pnpm dev` starts a Vite watch process that stays running. Use a tmux session to run it in the background.
