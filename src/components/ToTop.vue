<template>
  <div class="to-top">
    <a href="#"><font-awesome-icon icon="arrow-up"/></a>
  </div>
</template>

<style lang="scss">
.to-top {
  z-index: 40;
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-size: 2rem;
  background-color: $logo-green;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    color: $light-logo-green;
  }
}
</style>
