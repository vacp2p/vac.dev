import { dest, series, parallel, src, watch as gwatch } from 'gulp'
import autoprefixer from 'autoprefixer'
import browserSync from 'browser-sync'
import spawn from 'cross-spawn'
import cssnano from 'cssnano'
import postcss from 'gulp-postcss'
import atimport from 'postcss-import'
import imagemin from 'gulp-imagemin'
import minify from 'gulp-minify'
import tailwindcss from 'tailwindcss'

const SITE_ROOT = './_site'
const POST_BUILD_STYLESHEET = `${SITE_ROOT}/assets/css/`
const PRE_BUILD_STYLESHEET = './assets/css/style.css'
const IMAGES = './assets/img/**/*'
const IMAGES_MINIMIZED = `${SITE_ROOT}/assets/img/`
const TAILWIND_CONFIG = './tailwind.config.js'

// Fix for Windows compatibility
const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll'

const isDevelopmentBuild = process.env.NODE_ENV === 'development'

const content = () => {
  browserSync.notify('Building Jekyll site...')

  const args = ['exec', jekyll, 'build']
  if (isDevelopmentBuild) {
    args.push('--incremental')
  }

  return spawn('bundle', args, { stdio: 'inherit' })
}

const scripts = () =>
  src('./assets/js/*')
    .pipe(minify({ext:{min:'.min.js' }, mangle: true}))
    .pipe(dest(`${SITE_ROOT}/assets/js/`))
    .pipe(browserSync.stream())

const styles = () =>
  src(PRE_BUILD_STYLESHEET)
    .pipe(
        postcss([
          atimport(),
          tailwindcss(TAILWIND_CONFIG),
          ...(isDevelopmentBuild ? [] : [autoprefixer(), cssnano()]),
        ])
      )
    .pipe(dest(POST_BUILD_STYLESHEET))
    .pipe(browserSync.stream())

const cname = () =>
  src('assets/CNAME').pipe(dest(SITE_ROOT))

const images = () =>
  src(IMAGES)
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.svgo(),
    ]))
    .pipe(dest(IMAGES_MINIMIZED))
    .pipe(browserSync.stream())

const server = () =>
  browserSync.init({
    files: [SITE_ROOT + '/**'],
    open: 'local',
    port: 4000,
    server: {
      baseDir: SITE_ROOT,
      serveStaticOptions: {
        extensions: ['html'],
      },
    },
  })

const watch = () => {
  gwatch(['_authors/*', '_data/*', '_posts/*', '_layouts/*', '_includes/*'], content)
  gwatch('**/*.js', scripts)
  gwatch(PRE_BUILD_STYLESHEET, styles)
  gwatch(IMAGES, images)
  //'!_site/**/*',
  //'!node_modules/**/*',
}

const build = series(content, scripts, styles, images, cname)

exports.content = content
exports.scripts = scripts
exports.styles = styles
exports.images = images
exports.cname = cname
exports.watch = watch
exports.server = server
exports.build = build
exports.devel = series(build, parallel(server, watch))
exports.default = exports.build
