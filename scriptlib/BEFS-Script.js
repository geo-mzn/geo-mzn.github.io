
// elements/variables

const input = document.getElementById("input");
const cs = document.getElementById("console");

cs.style.whiteSpace = "pre-wrap";
input.disabled = false;
input.readOnly = false;

// input stuff

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

// watermark for some reason idk why

cs.textContent = "# CURRENTLY USING: BetterEaglerForgeServer by Geo_mzn\n" + cs.textContent;
console.log("Thank you for using BetterEaglerForgeServer!")
