<template>
  <div
    class="banner"
    :style="{ backgroundImage: 'url(' + bannerImgURL + ')' }"
  ></div>
</template>
<script>
export default {
  name: 'Banner',
  props: {
    bannerImgURL: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.banner {
  display: none;
  @include pad {
    z-index: -100;
    display: block;
    position: absolute;
    width: 100%;
    height: 350px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
