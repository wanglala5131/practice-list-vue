<template>
  <div class="cart-simple">
    <label for="cart-simple-input" class="cart-simple-label"
      ><font-awesome-icon icon="list-alt"
    /></label>
    <input type="checkbox" class="cart-simple-input" id="cart-simple-input" />
    <div class="cart-simple-content">
      <h3>暫定清單</h3>
      <ul class="cart-simple-ul">
        <li class="cart-simple-li">
          <div class="cart-simple-title">
            <a href="#" class="cart-simple-link"></a>
            <p>小狗追球</p>
            <div class="cart-simple-subcategory">
              <span>體力</span>
              <span>腿力</span>
              <span>體力</span>
              <span>體力</span>
              <span>體力</span>
              <span>體力</span>
              <span>體力</span>
              <span>體力</span>
            </div>
          </div>
          <button class="cart-simple-button">&times;</button>
        </li>
        <li class="cart-simple-li">
          <div class="cart-simple-title">
            <a href="#" class="cart-simple-link"></a>
            <p>小狗追球</p>
            <div class="cart-simple-subcategory">
              <span>體力</span>
              <span>腿力</span>
              <span>腿力</span>
              <span>腿力</span>
              <span>1234</span>
              <span>腿力</span>
              <span>腿力</span>
              <span>腿力</span>
            </div>
          </div>
          <button class="cart-simple-button">&times;</button>
        </li>
        <li class="cart-simple-li">
          <div class="cart-simple-title">
            <a href="#" class="cart-simple-link"></a>
            <p>小狗追球</p>
            <div class="cart-simple-subcategory">
              <span>體力</span>
              <span>腿力</span>
            </div>
          </div>
          <button class="cart-simple-button">&times;</button>
        </li>
        <li class="cart-simple-li">
          <div class="cart-simple-title">
            <a href="#" class="cart-simple-link"></a>
            <p>小狗追球</p>
            <div class="cart-simple-subcategory">
              <span>體力</span>
              <span>腿力</span>
            </div>
          </div>
          <button class="cart-simple-button">&times;</button>
        </li>
        <li class="cart-simple-li">
          <div class="cart-simple-title">
            <a href="#" class="cart-simple-link"></a>
            <p>小狗追球</p>
            <div class="cart-simple-subcategory">
              <span>體力</span>
              <span>腿力</span>
            </div>
          </div>
          <button class="cart-simple-button">&times;</button>
        </li>
        <li class="cart-simple-li">
          <div class="cart-simple-title">
            <a href="#" class="cart-simple-link"></a>
            <p>小狗追球</p>
            <div class="cart-simple-subcategory">
              <span>體力</span>
              <span>腿力</span>
            </div>
          </div>
          <button class="cart-simple-button">&times;</button>
        </li>
        <li class="cart-simple-li">
          <div class="cart-simple-title">
            <a href="#" class="cart-simple-link"></a>
            <p>小狗追球</p>
            <div class="cart-simple-subcategory">
              <span>體力</span>
              <span>腿力</span>
            </div>
          </div>
          <button class="cart-simple-button">&times;</button>
        </li>
        <li class="cart-simple-li">
          <div class="cart-simple-title">
            <a href="#" class="cart-simple-link"></a>
            <p>小狗追球</p>
            <div class="cart-simple-subcategory">
              <span>體力</span>
              <span>腿力</span>
            </div>
          </div>
          <button class="cart-simple-button">&times;</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.cart-simple {
  z-index: 50;
  position: fixed;
  top: 75px;
  left: 10px;
  width: 100%;
  .cart-simple-input {
    display: none;
    &:checked ~ .cart-simple-content {
      transform: scale(1, 1);
    }
  }
  .cart-simple-label {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 8px 6px 8px;
    font-size: 28px;
    color: $light-logo-green;
    border-radius: 40%;
    background-color: $op-black;
    box-shadow: 0 0 3px 2px rgba(255, 255, 255, 0.2);
    cursor: pointer;
    &:hover {
      background-color: $logo-green;
      color: $white;
    }
  }
  .cart-simple-content {
    z-index: -10;
    position: absolute;
    top: -10px;
    left: -10px;
    background-color: $white;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    @extend .scroll-style;
    padding: 0px 15px 80px 15px;
    transform: scale(0, 1); //0,1
    transform-origin: left;
    transition: transform 0.2s ease-out;
    h3 {
      text-align: center;
      padding: 20px 0;
      border-bottom: 2px solid $font-green;
      font-size: 1.3rem;
      color: $font-green;
    }
    .cart-simple-li {
      display: flex;
      align-items: center;
      background-color: $light-logo-green;
      border-radius: 10px;
      margin: 10px;
      &:hover {
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
      }
      .cart-simple-title {
        flex-grow: 1;
        display: flex;
        align-items: center;
        padding: 10px 0;
        p,
        .cart-simple-subcategory {
          flex-basis: 50%;
          padding: 5px;
        }
        p {
          padding-left: 20px;
          font-size: 1.2rem;
          padding-bottom: 5px;
        }
        span {
          display: inline-block;
          border: 1px solid $dark-gray;
          border-radius: 8px;
          padding: 0 3px;
          margin: 2px 0;
          color: $dark-gray;
        }
      }
      .cart-simple-button {
        font-size: 2.3rem;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
}

@media (min-width: 768px) {
  .cart-simple {
    top: 60px;
    border-radius: 20px;
    .cart-simple-content {
      padding: 10px;
      border-radius: 10px;
      width: 600px;
      height: 600px;
      box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
