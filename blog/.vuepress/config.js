module.exports = {
  title: 'bort\'s blog',
  description: 'A blog powered by VuePress',
  head: [
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicons/favicon-32x32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicons/favicon-16x16.png"}],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css' }]
  ],
  markdown: {
    // options for markdown-it-anchor
    anchor: { permalink: false },
    extendMarkdown: md => {
      md.use(require("markdown-it-katex"));
    }
  },
  theme: '@vuepress/theme-blog', // OR shortcut: @vuepress/blog
  themeConfig: {
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/config/#dateformat
     */

    // dateFormat: 'YYYY-MM-DD',

    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/config/#nav
     */

    // nav: [
    //   {
    //     text: 'Blog',
    //     link: '/',
    //   },
    //   {
    //     text: 'Tags',
    //     link: '/tag/',
    //   },
    // ],

    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/config/#footer
     */
    footer: {
      contact: [
        {
          type: "github",
          link: "https://github.com/borttrob"
        },
        // {
        //   type: "mail",
        //   link: "mailto:newsbielt703@gmail.com"
        // }
      ],
      // copyright: [
      //   {
      //     text: "Billy Chin © 2020",
      //     link: ""
      //   }
      // ]
    },
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/config/#directories
     */

    // directories:[
    //   {
    //     id: 'post',
    //     dirname: '_posts',
    //     path: '/',
    //     itemPermalink: '/:year/:month/:day/:slug',
    //   },
    //   {
    //     id: 'writing',
    //     dirname: '_writings',
    //     path: '/',
    //     itemPermalink: '/:year/:month/:day/:slug',
    //   },
    // ],

    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/config/#frontmatters
     */

    // frontmatters: [
    //   {
    //     id: "tag",
    //     keys: ['tags'],
    //     path: '/tag/',
    //   },
    //   {
    //     id: "location",
    //     keys: ['location'],
    //     path: '/location/',
    //   },
    // ],

    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/config/#globalpagination
     */

    // globalPagination: {
    //   lengthPerPage: 10,
    // },

    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/config/#sitemap
     */

    sitemap: {
      hostname: 'https://borttrob.github.io/blog/'
    },

    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/config/#comment
     */

    comment: {
      service: 'disqus',
      shortname: 'bortblog',
    },

    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/config/#newsletter
     */

    // newsletter: {
    //   endpoint: 'https://billyyyyy3320.us4.list-manage.com/subscribe/post?u=4905113ee00d8210c2004e038&amp;id=bd18d40138'
    // },

    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/config/#feed
     */

    // feed: {
    //   canonical_base: 'https://example.vuepress-theme-blog.ulivz.com/',
    // },

    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/config/#summary
     */

    // summary:false,

    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/config/#summarylength
     */

    // summaryLength:100,

    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/config/#pwa
     */

    // pwa:true,

    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/config/#paginationcomponent
     */

    // paginationComponent: 'SimplePagination'

    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/config/#smoothscroll
     */

    // smoothScroll: true
  },
  base: '/blog/'
}
