# Rock Chronicles

明亮 Editorial 杂志风的摇滚编年史：用长滚动叙事讲「一支乐队为什么重要」，再用 Timeline / Genres / People 把摇滚史串成可探索的图谱。

**网站：** https://rock-chronicles.vercel.app/  
**源码：** https://github.com/maggiecycy/rock-chronicles

## Listen / 试听曲库

全局迷你播放器 + [`content/audio-index.json`](content/audio-index.json)。音频文件**不进 Git**（见 `.gitignore` 的 `audio-dist/`、`public/audio/`）。

### 本地

```bash
# 从 ~/Downloads/RockMusic 扫描、映射乐队、转码 128kbps、复制到 public/audio/
npm run audio:transcode
npm run dev
```

### 生产（推荐 CDN）

1. `npm i -D @vercel/blob`
2. 在 Vercel 创建 **Public** Blob store（Private 无法给浏览器直接播），把真实的 `BLOB_READ_WRITE_TOKEN` 写入 `.env.local`（不要用文档里的占位符）
3. `npm run audio:upload` — 上传并回写 index 里的绝对 URL
4. 可选：设置 `NEXT_PUBLIC_AUDIO_CDN`（见 `.env.example`）

未设置 CDN 时，播放器使用 `/audio/{id}.mp3`（需部署机带有 `public/audio`，或上传后使用 Blob URL）。

导航 **Listen** → `/listen`（编年史内曲目 + Extra 未入库艺人）。乐队页 / Genre 页按上下文入队；**不自动播放**。与导航「Sound」程序化氛围音互斥。
