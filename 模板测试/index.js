const a = `
<p a=" >"></p>
<script>
    const a = \`\`;
    console.log(document.querySelector('p').getAttribute('a'));
    console.log(document.body.innerHTML.match(/(\'|\"|\`).*;
    console.log((document.body.innerHTML += document.body.innerHTML.replace(/(\'|\"|\`|\/).*\${1}/gm, (str) => str.replace('<', '\\x3c').replace('>', '\\x3e'))));
</script>`;
console.log(document.querySelector('p').getAttribute('a'));
console.log(document.body.innerHTML.match(/(\'|\"|\`).*\1/gm));
console.log((document.body.innerHTML += document.body.innerHTML.replace(/(\'|\"|\`|\/)[/s/S]*\1/gm, (str) => str.replace('<', '\\x3c').replace('>', '\\x3e'))));

// <script src="./index.js"></script>
// <script src="./index.js"></script>
// <script src="./index.js"></script>
// <script src="./index.js"></script>

/*
 * @description:
 * @param {} :
 * @return {}:
 */
console.log(document.querySelector('p').getAttribute('a'));
