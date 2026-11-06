[marketplaces 说明](https://code.claude.com/docs/zh-CN/plugin-marketplaces)

[codex marketplace](https://www.codex-marketplace.com/docs)

## 自动更新

`.github/workflows/update-skills.yml` 每天定时（UTC 18:00）或手动触发，执行 `npx skills update -p -y`。

当 `skills-lock.json` 发生变化时，会同步把 `.claude-plugin/marketplace.json` 与 `.codex-plugin/plugin.json` 的顶层 `version` 递增一个 patch 版本，然后自动提交推送。