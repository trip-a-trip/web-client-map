import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import cleaner from 'rollup-plugin-cleaner';
import html from '@rollup/plugin-html';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import progress from 'rollup-plugin-progress';
import sveltePreprocessPostcss from 'svelte-preprocess-postcss';
import md5 from 'md5';

const PRODUCTION = !process.env.ROLLUP_WATCH;
const DEVELOPMENT = !PRODUCTION;

const DIST = 'public';

export default {
  input: 'src/index.js',
  output: {
    sourcemap: DEVELOPMENT,
    dir: DIST,
    entryFileNames: '[name].[hash].js',
  },
  plugins: [
    svelte({
      dev: DEVELOPMENT,
      css: (css) => {
        const hash = md5(css.code).slice(0, 8);
        css.write(`styles.${hash}.css`, DEVELOPMENT);
      },
      preprocess: {
        style: sveltePreprocessPostcss(),
      },
    }),
    postcss({ extract: true }),
    babel({ babelHelpers: 'bundled' }),
    html({
      title: 'Где поесть? | Карта',
      attributes: { html: { lang: 'ru' } },
      meta: [
        { name: 'viewport', content: 'width=device-width,initial-scale=1' },
        { charset: 'utf-8' },
      ],
      publicPath: '/',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        PRODUCTION ? 'production' : 'development',
      ),
    }),
    progress(),
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    DEVELOPMENT && serve(DIST),
    DEVELOPMENT && livereload(DIST),
    commonjs(),
    PRODUCTION &&
      cleaner({
        targets: [DIST],
      }),
    PRODUCTION && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
