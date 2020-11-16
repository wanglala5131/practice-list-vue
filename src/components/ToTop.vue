<template>
  <div class="to-top">
    <a href="#"><font-awesome-icon icon="arrow-up"/></a>
  </div>
</template>

<style lang="scss">
.to-top {
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-color: $logo-green;
  border-radius: 50%;
  font-size: 2rem;
  a {
    color: $light-logo-green;
  }
}
</style>
