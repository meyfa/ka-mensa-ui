<template>
  <footer class="footer">
    Diese Website gehört nicht zum Studierendenwerk Karlsruhe und wird von diesem auch nicht unterstützt.
    Alle Angaben ohne Gewähr.<br>
    <a v-if="privacyPolicyUrl" :href="privacyPolicyUrl" target="_blank" class="link">Datenschutzerklärung</a>
    <hr class="footer-rule">
    Mitwirken:
    <a :href="url" target="_blank" rel="noreferrer" class="link">{{ url }}</a>
  </footer>
</template>

<script>
export default {
  setup () {
    return {
      // PRIVACY_POLICY_URL is configurable (config.site.privacyPolicyUrl)
      // and defined via webpack
      privacyPolicyUrl: PRIVACY_POLICY_URL,
      url: 'https://github.com/meyfa/ka-mensa-ui'
    }
  }
}
</script>

<style scoped>
.footer {
  display: block;
  margin: 24px 0 0;
  padding: 40px 16px;
  line-height: 1.4;
  font-size: 12pt;
  color: var(--color-footer-text);
  background: var(--color-footer-background);
}

.footer-rule {
  display: block;
  width: 32px;
  height: 2px;
  margin: 16px 0;
  border: none;
  background: var(--color-footer-text);
}

.link {
  color: var(--color-footer-text);
  text-decoration: underline;
}

.link:focus,
.link:hover {
  color: var(--color-footer-link);
}
</style>
