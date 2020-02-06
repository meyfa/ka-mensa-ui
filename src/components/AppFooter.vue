<template>
  <footer class="footer">
    <a :href="url" target="_blank" class="backlink">{{ url }}</a>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      url: 'https://github.com/meyfa/ka-mensa-ui'
    }
  }
}
</script>

<style scoped>
.footer {
  display: block;
  margin: 24px 0 0;
  padding: 16px;
  line-height: 1.4;
  font-size: 12pt;
  background: #333;
}

.backlink {
  color: #aaa;
  text-decoration: none;
}

.backlink:focus,
.backlink:hover {
  color: #6af;
}
</style>
