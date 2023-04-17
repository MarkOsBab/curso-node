const addToCart = async (productId, quantity) => {
    console.log(quantity);
    await fetch('http://localhost:8080/api/carts', {method: 'POST'})
        .then((cart) => cart.json())
        .then(async (data) => {
            await fetch(`http://localhost:8080/api/carts/${data.payload.id}/products/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity })
                })
                .then((cart) => cart.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
};
