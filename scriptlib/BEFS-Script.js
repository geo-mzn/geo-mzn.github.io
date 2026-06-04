function executeScript() {

// elements/variables

const input = document.getElementById("input");
const cs = document.getElementById("console");
cs.style.whiteSpace = "pre-wrap";
  
// check if missing elements
if (!input || !cs) {
  console.error("[BetterEaglerForgeServer] Required element(s) not found: input with id of 'input', or div with id of 'console'");
  return;
}

// input and console stuff

input.placeholder = "Input command here...";
cs.style.cssText = `background: #0f172a;
font-family: sans-serif;
z-index: 254;
position: fixed;
display: block;
height: calc(100vh - 1rem - 4px);
overflow-y: scroll;
color: white;
inset: 0px;
opacity: 1;`;

// watermark for some reason idk why

if (!cs.textContent.startsWith("# CURRENTLY USING: BetterEaglerForgeServer by Geo_mzn")) {
    cs.textContent =
        "# CURRENTLY USING: BetterEaglerForgeServer v1.0.0-beta by Geo_mzn\n" +
        cs.textContent;
}
console.log("Thank you for using BetterEaglerForgeServer!")
}
