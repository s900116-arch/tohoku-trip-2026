# 2026 東北雪國自駕之旅（12/01–12/07）

全團行程網頁，用 GitHub Pages 發布。

## 怎麼更新內容

所有行程文字都在 `content.json`，改這個檔案就好，不用動 `index.html`。

1. 在 GitHub 打開 `content.json`，按鉛筆圖示編輯
2. 改完按 **Commit changes**
3. 約 1–2 分鐘後網站自動更新

### 常改的欄位

- `announce`：最上方的公告，留空 `""` 就不顯示
- `updated`：頁尾顯示的更新時間
- `days[n].s`：第 n+1 天的行程項目，每項有 `t`（時間）、`title`、`sub`、`cat`（美食／交通／景點／溫泉／住宿／採買）、`detail`、`warn`
- `days[n].t`：今日提醒
- `hotels`、`notes`、`temps`、`items`、`phr`：住宿、提醒、天氣、行李、日語

改完如果網頁變空白，通常是 JSON 少了逗號或引號，可以貼到 https://jsonlint.com 檢查。

## 注意

這個網站是公開的。不要放姓名、機票號碼、訂位代號、金額或其他個資。
