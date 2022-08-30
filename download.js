"use strict";

const version_1 = {
  first: 1,
  second: [0],
  third: [2],
};

const version_2 = {
  first: 2,
  second: [0, 1, 2, 3],
  third: [1, 1, 5, 5],

  version() {
    let ver = new Array();
    for (const [index, sec] of this.second.entries()) {
      for (let thr = 0; thr < this.third[index]; thr++) {
        ver.push(`v${this.first}.${sec}.${thr}`);
      }
    }
    return ver;
  },
};

const set_url = (ver, str) => {
  const new_str = version_2.version.call(ver).map(function (value) {
    return str + value;
  });
  return new_str;
};

const set_zip_url = (ver, str) => {
  const new_str = version_2.version.call(ver).map(function (value) {
    const new_value = `ABACUS_${value.replaceAll(".", "_")}.zip`;
    return str + new_value;
  });
  return new_str;
};

const set_tar_url = (ver, str) => {
  const new_str = version_2.version.call(ver).map(function (value) {
    const new_value = `ABACUS_${value}.tar.gz`;
    return str + new_value;
  });
  return new_str;
};

const download_url = new Map([
  ["zip", "/_upload/tpl/0c/d8/3288/template3288/download/zip/"],
  ["tar.gz", "/_upload/tpl/0c/d8/3288/template3288/download/"],
  ["github", "https://github.com/deepmodeling/abacus-develop/releases/tag/"],
  ["gitee", "https://gitee.com/deepmodeling/abacus-develop/releases/tag/"],
]);

const add_url = (url, url_label) => {
  let node = document.createElement("a");
  node.setAttribute("href", url);
  node.setAttribute("class", "link");
  node.appendChild(document.createTextNode(`[${url_label}]`));
  return node;
};

const add_ver = (element, ver, index, tags = ["github", "gitee"]) => {
  let para = document.createElement("p");
  para.appendChild(
    document.createTextNode(`ABACUS_${version_2.version.call(ver)[index]} `)
  );

  for (const tag of tags) {
    let node;
    if (tag === "zip") {
      node = add_url(set_zip_url(ver, download_url.get(tag))[index], tag);
    } else if (tag === "tar.gz") {
      node = add_url(set_tar_url(ver, download_url.get(tag))[index], tag);
    } else {
      node = add_url(set_url(ver, download_url.get(tag))[index], tag);
    }
    para.appendChild(node);
  }

  element.appendChild(para);
};

(function () {
  let new_release = document.getElementById("new-release");
  if (new_release) {
    add_ver(new_release, version_2, version_2.version().length - 1, [
      "zip",
      "github",
      "gitee",
    ]);
  }

  let old_release = document.getElementById("old-release");
  if (old_release) {
    // version_2
    add_ver(old_release, version_2, version_2.version().length - 2);
    let details = document.createElement("details");
    let summary = document.createElement("summary");
    summary.textContent = "More";
    details.appendChild(summary);
    for (let index = 1; index < version_2.version().length - 3; index++)
      add_ver(details, version_2, version_2.version().length - 2 - index);
    for (let index = 0; index < 2; index++)
      add_ver(details, version_2, 1 - index, ["tar.gz"]);

    // version_1
    add_ver(details, version_1, 1, ["tar.gz"]);

    old_release.appendChild(details);
  }
})();
