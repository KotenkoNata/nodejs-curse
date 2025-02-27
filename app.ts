const text = 'This is a test - and it should be';

const encoder = new TextEncoder();
const data = encoder.encode(text);

Deno.writeFile('message.txt', data).then(()=>{
    console.log('Wrote file finished!');
});