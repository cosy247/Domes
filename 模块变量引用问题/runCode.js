const data = {
    name: 'Wendy',
    age: 18,
};

export default function runCode(codeString) {
    return eval(`() => (${codeString})`);
}
