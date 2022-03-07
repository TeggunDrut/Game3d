function log(text) {
  let console = document.getElementById("console");
  let p = document.createElement("p");
  p.setAttribute("style", "color: white; font-size: large, width: 100%;")
  p.innerHTML = text;
  console.appendChild(p);
}