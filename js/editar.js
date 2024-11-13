document.querySelector("#insert").addEventListener("click", (event) => {
    event.preventDefault()
    const name = document.querySelector("#name").value
    const price = document.querySelector("#price").value
    fetch("http://localhost:8080/api/v1/products/insert", {
        method: "UPDATE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                productName: name,
                productPrice: price
            }
        )
    })
        .then(data => console.log(data))
})