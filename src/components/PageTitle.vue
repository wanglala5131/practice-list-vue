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
  padding-top: 100px;
  padding-left: 20px;
  padding-bottom: 20px;
  color: $font-green;
  border-bottom: 3px solid $logo-green;
}
.card-page-links {
  margin-top: 20px;
  .setting-links-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .title-link {
    margin: 5px;
    background-color: $white;
    color: $font-green;
    font-weight: 500;
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 1.3rem;
    border: 2px solid $logo-green;
    svg {
      margin-right: 6px;
    }
    &.item-delete-btn {
      border: 2px solid $red;
      color: $red;
      &:hover {
        background-color: $red;
        color: $white;
      }
    }
    &:hover {
      background-color: $logo-green;
      color: $white;
    }
  }
}
@media (min-width: 768px) {
  .page-title {
    padding-top: 150px;
    padding-left: 50px;
    border: none;
    letter-spacing: 2px;
    color: $white;
    font-size: 3rem;
    text-shadow: 0px 8px 5px rgba(0, 0, 0, 0.8);
  }
  .card-page-links {
    padding-left: 50px;
    .title-link {
      color: $op-white;
      background-color: rgba(0, 0, 0, 0.8);
      border-color: $op-white;
      font-size: 1.3rem;
      &:hover {
        border-color: $logo-green;
      }
      &.item-delete-btn {
        background-color: rgba(0, 0, 0, 0.8);
        color: $red;
        &:hover {
          border-color: $red;
        }
      }
    }
  }
}
</style>
