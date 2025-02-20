const fs = require("fs");

const loadHtml = (query) => {
  const filename = query === "/" ? "/index" : query;

  let content;

  try {
    content = fs.readFileSync(`./html${filename}.html`);
  } catch (e) {
    content = fs.readFileSync("./html/404.html");
  } finally {
    return content;
  }
};

module.exports = { loadHtml };
