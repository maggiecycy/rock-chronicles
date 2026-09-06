# Rock Chronicles

明亮 Editorial 杂志风的**摇滚编年史**站点：用长滚动叙事讲清「一支乐队为什么重要」，再用 Timeline / Genres / People 把整部摇滚史串成可探索的图谱。

灵感来自 [Seinfeld Chronicles](https://seinfeld.visualisingdata.com/) 的叙事结构（长滚动 + 探索层 + 节点音景），内容与视觉完全面向摇滚史。

---

## 你能在这里做什么

| 路径 | 作用 |
|------|------|
| `/` | Cover：从 Guide → 决定性乐队 → Timeline 的入口 |
| `/bands/[slug]` | 决定性乐队深度页（scrollytelling，章节叙事） |
| `/timeline` · `/eras/[slug]` | 年代骨架与时代切片 |
| `/genres` · `/genres/[slug]` | 流派关系与代表乐队 |
| `/people` · `/people/graph` | Hub 人物与共享成员图 |
| `/guide` · `/tropes` · `/lives` | 科普、文化梗、史诗现场 |

当前内容规模约：**7 个时代 · 12 个流派 · 28 支乐队 · 16 位人物**，外加 Guide / Tropes / Lives。

---

## 技术栈

- **Next.js**（App Router）· **TypeScript** · **Tailwind CSS v4** · **Framer Motion**
- 内容默认来自 `content/**/*.json`（可静态生成）
- **Prisma + MySQL**（可选）：schema / seed 已就绪，站点仍默认读 JSON；本地库用于建模与后续切库

---

## 快速开始

```bash
git clone https://github.com/<your-username>/rock-chronicles.git
cd rock-chronicles
npm install
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。

---

## 可选：本地 MySQL

若要推表、灌库（与 JSON 并行，不强制）：

1. 本机安装并启动 MySQL，创建库：

```sql
CREATE DATABASE rock_chronicles
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

2. 复制环境变量并填入密码：

```bash
cp .env.example .env.local
```

```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@127.0.0.1:3306/rock_chronicles"
```

3. 同步结构并灌入 `content/` 数据：

```bash
npm run db:push
npm run db:seed
```

常用脚本：

| 命令 | 说明 |
|------|------|
| `npm run db:ping` | TCP 连通性 |
| `npm run db:probe` | Prisma `band.findMany` 读库探针 |
| `npm run db:studio` | Prisma Studio |
| `npm run db:reset` | 强制重置表结构并重新 seed |

**不要提交** `.env` / `.env.local`（已在 `.gitignore`）。

---

## 内容怎么组织

```text
content/
  eras/     年代
  bands/    乐队（decisive 含 whyMatters + narrative）
  genres/   流派
  people/   人物与 tenure
  guide/    科普文
  tropes/   文化梗
  lives/    史诗现场
  graph/    流派关系边等
```

决定性乐队 JSON 的核心字段：

- `whyMatters` / `narrative[]` — 长滚动章节
- `scenes[]` — 舞台瞬间（year · track · membersOnStage · genreTags）
- `interviewQuotes[]` — 金句
- `decisive: true` — 深度叙事乐队

应用侧通过 [`src/lib/content.ts`](src/lib/content.ts) 读取；类型见 [`src/lib/types.ts`](src/lib/types.ts)。

---

## 项目结构（简）

```text
src/app/          App Router 页面
src/components/   UI 与叙事组件
src/lib/          content / db / i18n 等
content/          编年史内容（JSON）
prisma/           schema + seed
scripts/          db:ping / db:probe
```

---

## 开发说明

- 默认语言与词典在 `src/i18n/`（支持 EN / 中文切换）
- `npm run build` 会做静态生成；加 Prisma 后仍可读 JSON 构建
- 计划中的 `USE_DATABASE` 开关：用 MySQL 替换部分读路径（尚未全站接通）

---

## License

Private / 个人项目。内容与引用请自行注意版权与合理使用。
