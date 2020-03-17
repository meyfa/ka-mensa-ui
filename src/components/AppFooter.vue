<template>
  <footer class="footer">
    <a :href="url" target="_blank" rel="noreferrer" class="backlink">{{ url }}</a>
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
  background: var(--color-footer-background);
}

.backlink {
  color: var(--color-footer-text);
  text-decoration: none;
}

.backlink:focus,
.backlink:hover {
  color: var(--color-footer-link);
}
</style>
