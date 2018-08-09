/**
 * Copyright 2018 SME Virtual Network Contributors. All Rights Reserved.
 * See LICENSE in the repository root for license information.
 * =============================================================================
 */

import BrowserSync from "browser-sync";
import del from "del";
import gulp from "gulp";
import log from "fancy-log";
import webpack from "webpack";
import webpackConfig from "./webpack.config.babel";

const browserSync = BrowserSync.create();

const IS_PRODUCTION = process.env.NODE_ENV === "production";

log.warn("[Gulp] build mode: ", IS_PRODUCTION ? "PRODUCTION" : "DEVELOPMENT");

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
gulp.task("copy", () => gulp.src(["src/images/**/*", "src/*.txt", "src/404.html"]).pipe(gulp.dest("dist")));

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
  gulp.watch("./src/**/*", gulp.series("copy", "bundle"));
});

/**
 * BUILD TASK
 * -----------------------------------------------------------------------------
 */
gulp.task("build", gulp.series("clean", "copy", "bundle"));

/**
 * LOCAL SERVER RUN TASK
 * -----------------------------------------------------------------------------
 */
gulp.task("serve", gulp.series("build", "dev-server"));
