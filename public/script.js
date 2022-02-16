const input = document.getElementById("input");
const button = document.querySelector("button");
let object = {};

input.addEventListener( "input", ( event ) => {
    object.quantity = Number(event.target.value);
    console.log('object');
})

button.addEventListener( "click", () => {
    fetch('create-checkout-session', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({
            items: [
                { id: 1, quantity: object.quantity },
                { id: 2, quantity: 1}
            ]
        })
    }).then(res => {
        if (res.ok){return res.json()}
        return res.json().then(json => Promise.reject(json))
    }).then( ( { url } ) => {
        window.location = url
    }).catch(e => {
        console.error(e.error); 
    })
})