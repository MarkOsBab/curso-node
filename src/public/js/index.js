const addToCart = async (cartId, productId) => {
    await fetch(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then((cart) => cart.json())
        .then((data) => {
            alertify.alert('Listo!', `Producto agregado al carrito.`, function(){ alertify.success(`Producto agregado al carrito`); });
        })
        .catch((error) => {
            console.log(error);
        });
};
