
// elements/variables

const input = document.getElementById("input");
const cs = document.getElementById("console");

cs.style.whiteSpace = "pre-wrap";

// input and console stuff

input.placeholder = "Input command here...";
input.style.cssText = `
position: absolute;
left: 0px;
bottom: 0px;
right: 0px;
border-width: 2px 0px 0px;
border-style: solid none none;
border-color: white;
background: #0f172a;
z-index: 255;
color: white;
height: 1rem;
opacity: 1;
display: block;
`;
cs.style.cssText = `background: #0f172a;
font-family: sans-serif;
z-index: 254;
position: fixed;
display: block;
height: calc(-4px - 1rem + 100vh);
overflow-y: scroll;
color: white;
inset: 0px;
opacity: 1;`;

// watermark for some reason idk why

cs.textContent = "# CURRENTLY USING: BetterEaglerForgeServer by Geo_mzn\n" + cs.textContent;
console.log("Thank you for using BetterEaglerForgeServer!")
