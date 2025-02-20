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
      try {
        const content = fs.readFileSync("./html/404.html");
        return { status: 404, content };
      } catch (er) {
        // If 404 html does not found, send a generic 404 message
        return { status: 404, content: "Page not found!" };
      }
    }

    // In case of any other error, return 500
    content = "Internal server error!";
    return { status: 500, content };
  }
};

module.exports = { loadHtml };
