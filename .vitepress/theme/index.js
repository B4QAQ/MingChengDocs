// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import {
  NolebaseGitChangelogPlugin,
  NolebaseGitChangelog,
  NolebaseGitContributors,
} from '@nolebase/vitepress-plugin-git-changelog/client'

import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import './style.css'
import './style/index.css'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () =>
        h('section', { class: 'git-changelog-section' }, [
          h(NolebaseGitContributors),
          h(NolebaseGitChangelog),
        ]),
    })
  },
  enhanceApp({ app }) {
    app.use(NolebaseGitChangelogPlugin)
  },
}
