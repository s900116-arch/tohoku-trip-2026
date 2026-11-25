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
- `days[n].s[i].q`：導航目的地（Google Maps 搜尋字，日文名稱或地址最準），留空就不顯示導航按鈕
- `hotels`：住宿；`ja`、`addr`、`tel` 會顯示在「給司機看」的日文地址卡，`q` 是導航目的地
- `temps`：天氣參考，`w` 是「即時預報」搜尋用的日文地名
- `notes`、`items`、`phr`：提醒、行李、日語

改完如果網頁變空白，通常是 JSON 少了逗號或引號，可以貼到 https://jsonlint.com 檢查。

## 其他檔案

- `sw.js`、`manifest.webmanifest`、`icon-*.png`：讓網站可以加到手機主畫面、離線也能看
- `og.png`：在 LINE 分享網址時顯示的預覽圖
- 網址加 `?now=2026-12-03T13:00` 可以模擬旅途中某個時間，檢查「今天」區塊（日本時間）

## 注意

這個網站是公開的。不要放姓名、機票號碼、訂位代號、金額或其他個資。

## 其他文件
- [FEATURES.md](FEATURES.md)：網頁功能與內容總覽
- [CHANGELOG.md](CHANGELOG.md)：網頁變更紀錄
