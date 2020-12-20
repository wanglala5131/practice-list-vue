<template>
  <div class="how-wrapper">
    <div class="how-item">
      <h2>初次使用時，建議流程</h2>
      <ol>
        <li>
          1. 去<router-link to="/setting">設定頁</router-link
          >設定運動項目與項目類型
        </li>
        <li>
          2. 開始<router-link to="/items/create">新增項目</router-link
          >，請至少新增三項
        </li>
        <li>
          3. 可以開始加入暫定菜單囉！請至<router-link to="/cart"
            >暫定菜單</router-link
          >調整順序與填入資料
        </li>
        <li>
          4. 送出菜單，若菜單已使用可選擇刪除或標示為已使用
        </li>
      </ol>
    </div>
    <div class="how-item">
      <h2>首頁</h2>
      <p>※不使用的卡片請用封存，封存狀態的卡片無法加入暫定菜單</p>
      <p>※沒有刪除功能</p>
      <picture>
        <source
          media="(max-width: 768px)"
          srcset="https://i.imgur.com/idYibh8.png"
        />
        <img src="https://i.imgur.com/t5OW0A4.jpg" alt="index-page-img" />
      </picture>
    </div>
    <div class="how-item">
      <h2>暫定菜單</h2>
      <p>※菜單名稱為必填，組數和備註為選填</p>
      <p>※可用拖曳移動項目順序</p>
      <p>※送出的菜單至少要三項 (兩項就感覺沒意義啦~)</p>
      <picture>
        <source
          media="(max-width: 768px)"
          srcset="https://i.imgur.com/sIQZhSp.png"
        />
        <img src="https://i.imgur.com/nz3Z3nx.jpg" alt="cart-page-img" />
      </picture>
    </div>
    <div class="how-item">
      <h2>已排菜單</h2>
      <picture>
        <source
          media="(max-width: 768px)"
          srcset="https://i.imgur.com/QgCsJxD.png"
        />
        <img src="https://i.imgur.com/xUt6Vxu.jpg" alt="lists-page-img" />
      </picture>
    </div>
    <div class="how-item">
      <h2>設定頁</h2>
      <picture>
        <source
          media="(max-width: 768px)"
          srcset="https://i.imgur.com/VqxdtXs.png"
        />
        <img src="https://i.imgur.com/05Fh9Mf.jpg" alt="setting-page-img" />
      </picture>
    </div>
  </div>
</template>

<style lang="scss">
.how-wrapper {
  margin: 100px auto;
  padding-bottom: 50px;
  width: 90%;
  max-width: 800px;
  .how-item {
    margin-top: 20px;
    padding: 20px;
    border-bottom: 2px solid $font-green;
    &:last-child {
      border-bottom: none;
    }
  }
  ol {
    padding-left: 10px;
    a {
      color: blue;
    }
  }
  h2 {
    margin-bottom: 10px;
    color: $font-green;
    font-size: 1.5rem;
  }
  p,
  li {
    margin-bottom: 10px;
    color: $dark-gray;
    font-size: 1.1rem;
  }
  img {
    width: 100%;
    height: auto;
  }
}
</style>
