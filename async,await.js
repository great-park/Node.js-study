async function fetchAndPrint(){
    console.log(2);
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    console.log(7);
    const result = await response.text();
    console.log(result);
}

console.log(1);
fetchAndPrint();
console.log(3);
console.log(4);
console.log(5);
console.log(6);