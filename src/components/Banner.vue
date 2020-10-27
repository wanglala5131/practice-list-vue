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
}
@media (min-width: 768px) {
  .banner {
    display: block;
    position: absolute;
    z-index: -100;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 350px;
  }
}
</style>
