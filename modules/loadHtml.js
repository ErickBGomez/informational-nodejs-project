const fs = require("fs");

const loadHtml = (query) => {
  const filename = query === "/" ? "/index" : query;

  try {
    const content = fs.readFileSync(`./html${filename}.html`);
    return { status: 200, content };
  } catch (e) {
    console.error(e);

    // If file is not found, return 404
    if (e.code === "ENOENT") {
      const content = fs.readFileSync("./html/404.html");
      return { status: 404, content };
    }

    // In case of any other error, return 500
    content = "Internal server error!";
    return { status: 500, content };
  }
};

module.exports = { loadHtml };
