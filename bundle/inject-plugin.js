/* eslint-disable no-param-reassign */

import posthtml from 'posthtml';

const postHtmlPlugin = ({ scripts = [] } = {}) => (tree) => {
  tree.match({ tag: 'head' }, (i) => {
    for (const script of scripts) {
      i.content.push({ tag: 'script', attrs: script });
    }

    return i;
  });
};

export default function inject({ scripts } = {}) {
  return {
    name: '@trip-trip/inject-plugin',
    async generateBundle(_, bundle) {
      const fileNames = Object.keys(bundle).filter((fileName) =>
        fileName.endsWith('.html'),
      );

      for (const fileName of fileNames) {
        const original = bundle[fileName];

        delete bundle[fileName];

        const { html } = posthtml()
          .use(postHtmlPlugin({ scripts }))
          .process(original.source, {
            sync: true,
          });

        this.emitFile({
          fileName,
          name: original.name,
          type: original.type,
          source: html,
        });
      }
    },
  };
}
