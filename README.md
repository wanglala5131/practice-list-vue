# 運動菜單網站 (practice-list)

這是一個可以讓使用者建立自己的**練習項目**與**菜單**的網站，適用於系/校隊或喜歡安排運動計畫的朋友。
相關的連結如下：
[網站連結](https://wanglala5131.github.io/practice-list-vue/)
[後端/資料庫 GitHub](https://github.com/wanglala5131/practice-lists)
[網站製作回顧 medium](https://sue4100035045.medium.com/%E9%81%8B%E5%8B%95%E8%8F%9C%E5%96%AE%E7%B6%B2%E7%AB%99-practice-list-%E5%9B%9E%E9%A1%A7-eaf577fe5b30)

## 功能

- 使用者可登入/註冊，目前不需要信箱驗證
- 可建立運動項目 (名稱、描述、限制、圖片、類別)，目前只能將項目封存，無法刪除，詳細原因可進部落格查看
- 可自行建立運動類別與項目類型
- 可將項目先排入暫定清菜單中，自行選擇是否要更改項目順序與填寫組數/備註
- 已送出的菜單仍可以進行編輯、刪除、是否已使用的狀態

## 測試帳號與密碼

| 帳號                | 密碼    |
| ------------------- | ------- |
| `user1@example.com` | `user1` |
| `user2@example.com` | `user2` |
| `user3@example.com` | `user3` |

## 畫面與使用介紹

#### 首頁

![](https://i.imgur.com/KYWLnhl.png)

#### 暫定清單

![](https://i.imgur.com/QJJ8C57.png)

#### 已排清單

![](https://i.imgur.com/4RkB9hu.png)

#### 設定頁

![](https://i.imgur.com/evT1yOo.png)

---

## 環境

- Vue 2.0 -前端框架
- SweetAlert -Confirm/Toast 訊息
- vue-loading-overlay -loading 畫面套件
- vuedraggable -拖曳套件
- fontawesome -icon
- core-js

## 專案設定

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```
