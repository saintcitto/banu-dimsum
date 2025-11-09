const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `.env.${activeEnv}`,
});

console.log("Active environment:", activeEnv);
console.log("SHOW INDICATOR:", process.env.GATSBY_SHOW_LOADING_INDICATOR);

module.exports = {
  siteMetadata: {
    title: `Banu Dimsum`,
    description: `Digital menu built with Gatsby`,
    author: `@cittowest`,
  },

  flags: {
    DEV_SSR: true,
    FAST_DEV: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: false,
    PARALLEL_SOURCING: true,
    QUERY_ON_DEMAND: false,
  },

  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
  ],
};
