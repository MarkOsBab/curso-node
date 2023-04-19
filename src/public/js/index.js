const addToCart = async (productId, quantity) => {
    await fetch(`http://localhost:8080/api/carts/64402b52bbb97ea38e69902c/products/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity })
        })
        .then((cart) => cart.json())
        .then((data) => {
            alertify.alert('Listo!', `${data.payload}`, function(){ alertify.success(`${data.payload}`); });
        })
        .catch((error) => {
            console.log(error);
        });
};
