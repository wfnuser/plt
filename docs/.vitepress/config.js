import mathjax3 from "markdown-it-mathjax3";

module.exports = {
  title: "编程语言理论完全笔记",
  base: "/plt/",
  markdown: {
    config: (md) => {
      md.use(mathjax3);
    },
  },
  themeConfig: {
    nav: [
      { text: "软件基础(idris)", link: "/software-foundation/" },
      { text: "编程语言 - UW", link: "/programming-languages/" },
    ],
    sidebar: {
      "/": [
        { text: "软件基础(idris)", link: "/software-foundation/" },
        { text: "编程语言 - UW", link: "/programming-languages/" },
      ],
      "/software-foundation/": [
        {
          text: "软件基础",
          link: "/software-foundation/index",
        },
      ],
      "/programming-languages/": [
        {
          text: "编程语言 - 华盛顿大学",
          link: "/programming-languages/index",
        },
      ],
    },
  },
};
