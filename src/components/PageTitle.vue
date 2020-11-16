<template>
  <div class="container title-box">
    <h1 class="page-title"><slot name="title"></slot></h1>
    <div class="card-page-links">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.title-box {
  margin: 0 auto;
  max-width: 1300px;
}
.page-title {
  padding: 100px 20px 20px 0;
  border-bottom: 3px solid $logo-green;
  color: $font-green;
}
.card-page-links {
  margin-top: 20px;
  .setting-links-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .title-link {
    margin: 5px;
    padding: 5px 10px;
    background-color: $white;
    border: 2px solid $logo-green;
    border-radius: 10px;
    color: $font-green;
    font-weight: 700;
    font-size: 1.3rem;
    svg {
      margin-right: 6px;
    }
    &.router-link-exact-active,
    &.current {
      background-color: $logo-green;
      color: $white;
      font-weight: 500;
    }
    &.current:disabled {
      border-color: $white;
      font-weight: 700;
      color: $white;
    }
    &.item-goback-btn {
      border-color: $dark-gray;
      color: $dark-gray;
      &:hover {
        background-color: $dark-gray;
        color: $light-gray;
      }
    }
    &.active:hover {
      background-color: $logo-green;
      color: $white;
      cursor: pointer;
    }
    &.item-close-btn {
      border: 2px solid $red;
      color: $red;
      &.active:hover {
        background-color: $red;
        color: $white;
        cursor: pointer;
      }
    }
    &:disabled {
      border-color: $light-gray;
      color: $light-gray;
    }
  }
}
@media (min-width: 768px) {
  .page-title {
    padding: 150px 50px 20px 0;
    border: none;
    letter-spacing: 2px;
    color: $white;
    font-size: 3rem;
    text-shadow: 0px 8px 5px rgba(0, 0, 0, 0.8);
  }
  .card-page-links {
    padding-left: 50px;
    .title-link {
      background-color: rgba(0, 0, 0, 0.8);
      border-color: $op-white;
      color: $op-white;
      font-size: 1.3rem;
      &.item-goback-btn {
        border-color: $dark-yellow;
        color: $dark-yellow;
        &:hover {
          border-color: $op-white;
          background-color: $dark-yellow;
          color: $dark-gray;
        }
      }
      &.item-close-btn {
        background-color: rgba(0, 0, 0, 0.8);
        color: $red;
        &:hover {
          border-color: $op-white;
        }
      }
      &:disabled {
        border-color: $dark-gray;
        color: $dark-gray;
      }
    }
  }
}
</style>
