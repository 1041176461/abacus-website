"use strict";

const set_options = (element) => {
  const selected_name = `selected${element}`;
  const options = document.getElementById(element).options;
  if (localStorage.getItem(selected_name)) {
    for (const i in options) {
      if (options[i].value == localStorage.getItem(selected_name)) {
        options[i].selected = true;
      }
    }
  }
  return options[options.selectedIndex].value;
};

function set_info(file, callback) {
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/txt");
  xobj.open("GET", file, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == 200) {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function load_set_info() {
  const typ = set_options("TYP");
  const pp = set_options("PP");
  const xcf = set_options("XCF");
  const acc = set_options("ACC");
  const size = set_options("SIZE");
  set_info(`${typ}_${pp}_${xcf}_${acc}_${size}.txt`, function (response) {
    const lines = response.split("\n");
    for (const line of lines) {
      const items = line.replace(/\r/g, "").split(" ");
      const itemid = items[0];
      const rcut = items[1];
      const delta = items.slice(2, 4);
      const item_dl = document.querySelector(
        `#periodic-table td.element dl[itemid=${itemid}]`
      );
      item_dl.querySelector("dd[itemprop='rcut']").innerHTML = rcut;
      item_dl.querySelector(
        "dd[itemprop='delta']"
      ).innerHTML = `${delta[0]}<br/>${delta[1]}`;
    }
  });
  const button = document.getElementById("download_button");
  const download_link = `${typ}_${pp}_${xcf}_${acc}_${size}.txt`;
  button.setAttribute("data-link", download_link);
}

function set_button() {
  const button = document.getElementById("download_button");
  button.addEventListener("mouseover", function () {
    button.style.backgroundColor = "#027b34";
  });
  button.addEventListener("mouseout", function () {
    button.style.backgroundColor = "#4d4d4d";
    button.addEventListener("click", function () {
      window.open(button.getAttribute("data-link"));
    });
  });
}

(function () {
  set_button();
})();
