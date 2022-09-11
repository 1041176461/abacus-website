"use strict";
import { Octokit } from "https://cdn.skypack.dev/octokit?dts";

const octokit = new Octokit();
const { data: data } = await octokit.request(
  "GET /repos/{owner}/{repo}/readme",
  {
    owner: "deepmodeling",
    repo: "abacus-develop",
  }
);

const content = data.encoding === "base64" ? atob(data.content) : undefined;
var converter = new showdown.Converter(),
  text = content,
  html = converter.makeHtml(text);
converter.setFlavor("github");
converter.setOption("omitExtraWLInCodeBlocks", true);

const parse_html = (html, style_string) => {
  const md_set = new Set(html.match(/[a-zA-Z0-9\-\_]+\.md/g));
  md_set.forEach(function (value) {
    const file_label = value.match(/[a-zA-Z0-9\-\_]+\./g);
    html = html.replaceAll(value, file_label + "html");
  });

  // html = html.replaceAll("docs/", "_install/docs/");
  html = html.replaceAll(
    "docs/",
    "/_upload/tpl/0c/d8/3288/template3288/test/docs/"
  );
  const html_array = html.split("\n");
  // const regex = /id="[a-zA-Z]+"/g;

  const replace_id = (id_index, href_index) => {
    const id_regex = /id="([a-zA-Z]+)"/;
    const href_regex = /href="#([a-zA-Z\-]+)"/;

    const match_id = html_array[id_index].match(id_regex)[1];
    const match_href = html_array[href_index].match(href_regex)[1];

    html_array[id_index] = html_array[id_index].replace(match_id, match_href);
  };

  // correct some error reference
  const id_indices = []; //85, 105, 106, 200, 215, 254, 483, 497];
  const href_indices = []; //24, 25, 26, 27, 28, 29, 31, 33];
  for (let i = 0; i < id_indices.length; i++) {
    replace_id(id_indices[i], href_indices[i]);
  }

  const new_html =
    style_string +
    html_array
      .slice(0, 2)
      .concat(html_array.slice(11, html_array.length))
      .join("\n");

  return new_html;
};

(function () {
  // const style_string = `<style>
  //     @import url(css/github.css)
  //   </style>`;
  const style_string = `<style>
    @import url(/_upload/tpl/0c/d8/3288/template3288/css/github.css)
  </style>`;
  let box1 = document.querySelector(".readme-block");
  let contentNode = document.createElement("div");
  contentNode.innerHTML = parse_html(html, style_string);
  box1.appendChild(contentNode);
  console.log(box1);
})();
