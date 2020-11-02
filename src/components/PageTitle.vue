<template>
  <div class="container">
    <h1 class="page-title"><slot name="title"></slot></h1>
    <div class="card-page-links">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.page-title {
  padding-top: 100px;
  padding-left: 20px;
  padding-bottom: 20px;
  color: $font-green;
  border-bottom: 3px solid $logo-green;
}
.card-page-links {
  margin-top: 20px;
  .title-link {
    margin: 5px;
    background-color: $logo-green;
    color: $dark-gray;
    font-weight: 500;
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 1.1rem;
    border: 2px solid $logo-green;
    svg {
      margin-right: 6px;
    }
    &:hover {
      border: 2px solid $dark-gray;
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
        border-color: $white;
        color: $white;
      }
    }
  }
}
</style>
