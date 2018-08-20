/**
 * Copyright 2018 SME Virtual Network Contributors. All Rights Reserved.
 * See LICENSE in the repository root for license information.
 * =============================================================================
 */

import BrowserSync from "browser-sync";
import del from "del";
import fs from "fs";
import gulp from "gulp";
import log from "fancy-log";
import realFavicon from "gulp-real-favicon";
import webpack from "webpack";
import webpackConfig from "./webpack.config.babel";

const browserSync = BrowserSync.create();

const IS_PRODUCTION = process.env.NODE_ENV === "production";

log.warn("[Gulp] build mode: ", IS_PRODUCTION ? "PRODUCTION" : "DEVELOPMENT");

const FAVICON_DATA_FILE = "favicondata.json";

/**
 * WEBPACK BUNDLE TASK
 * -----------------------------------------------------------------------------
 */
gulp.task("bundle", callback => {
  webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      throw new log.error("webpack", err); // eslint-disable-line new-cap
    }
    log.info("[Webpack] running...");
    log.info(
      stats.toString({
        chunks: false,
        colors: true
      })
    );
    browserSync.reload();
    callback();
  });
});

/**
 * COPY TASK
 * -----------------------------------------------------------------------------
 */
gulp.task("copy", () =>
  gulp.src(["src/images/**/*", "src/*.txt", "src/*.json", "src/404.html"]).pipe(gulp.dest("dist"))
);

/**
 * CLEAN TASK
 * -----------------------------------------------------------------------------
 */
gulp.task("clean", () => del(["dist/**/*"]));

/**
 * RUN DEVELOPMENT SERVER TASK
 * -----------------------------------------------------------------------------
 * Run the development server with Browsersync. Gulp will watch for source file
 * changes and Browsersync will reload the browser as necessary.
 */
gulp.task("dev-server", () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch("./src/**/*", gulp.series("bundle", "copy", "inject-favicon"));
});

/**
 * GENERATE FAVICONS TASK
 * -----------------------------------------------------------------------------
 * Generates all of the favicons and other icon assets from the master favicon
 * image.
 */
gulp.task("generate-favicon", done => {
  realFavicon.generateFavicon(
    {
      masterPicture: "./src/images/master-favicon-512.png",
      dest: "./dist",
      iconsPath: "/",
      design: {
        ios: {
          pictureAspect: "backgroundAndMargin",
          backgroundColor: "#112233",
          margin: "0%",
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true
          },
          appName: "SME Virtual Network"
        },
        desktopBrowser: {},
        windows: {
          pictureAspect: "noChange",
          backgroundColor: "#112233",
          onConflict: "override",
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false
            }
          },
          appName: "SME Virtual Network"
        },
        androidChrome: {
          pictureAspect: "backgroundAndMargin",
          margin: "0%",
          backgroundColor: "#112233",
          themeColor: "#112233",
          manifest: {
            name: "SME Virtual Network",
            display: "browser",
            orientation: "notSet",
            onConflict: "override",
            declared: true
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false
          }
        },
        safariPinnedTab: {
          pictureAspect: "silhouette",
          themeColor: "#112233"
        }
      },
      settings: {
        scalingAlgorithm: "Mitchell",
        errorOnImageTooSmall: false,
        readmeFile: false,
        htmlCodeFile: false,
        usePathAsIs: false
      },
      versioning: {
        paramName: "v",
        paramValue: "qABA4X8PYp"
      },
      markupFile: FAVICON_DATA_FILE
    },
    () => {
      done();
    }
  );
});

/**
 * INJECT FAVICONS TASK
 * -----------------------------------------------------------------------------
 * Injects the generated favicons and icon assets into the `index.html` file.
 */
gulp.task("inject-favicon", () =>
  gulp
    .src(["dist/*.html"])
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe(gulp.dest("dist"))
);

/**
 * CHECK FOR FAVICON STYLE/SETTING UPDATES TASK
 * -----------------------------------------------------------------------------
 * Run a check with the RealFaviconGenerator service (https://realfavicongenerator.net/)
 * for potential updates for favicons. This is important because from time-to-time,
 * device, platform and web browsers update their favicon and icon requirements.
 */
gulp.task("check-favicon-update", () => {
  const currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, err => {
    if (err) {
      throw err;
    }
  });
});

/**
 * BUILD TASK
 * -----------------------------------------------------------------------------
 */
gulp.task("build", gulp.series("clean", "generate-favicon", "bundle", "copy", "inject-favicon"));

/**
 * LOCAL SERVER RUN TASK
 * -----------------------------------------------------------------------------
 */
gulp.task("serve", gulp.series("build", "dev-server"));
