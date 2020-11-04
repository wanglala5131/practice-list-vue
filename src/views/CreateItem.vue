<template>
  <main>
    <BackgroundImg />
    <CardForm />
  </main>
</template>

<script>
import BackgroundImg from '../components/BackgroundImg'
import CardForm from '../components/CardForm'
export default {
  name: 'CreateItem',
  components: {
    BackgroundImg,
    CardForm
  }
}
</script>
<style lang="scss" scoped>
.bg-img {
  display: none;
}
@media (min-width: 768px) {
  .bg-img {
    display: block;
  }
}
</style>
