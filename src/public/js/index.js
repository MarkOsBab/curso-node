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

const sumarButton = document.querySelector('#sumar');

const restarButton = document.querySelector('#restar');
const cantidadElement = document.querySelector('#cantidad');

sumarButton.addEventListener('click', () => {
    const cartId = sumarButton.dataset.cartId;
    const productId = sumarButton.dataset.productId;
    
    agregaUno(1, cartId, productId);
});

restarButton.addEventListener('click', () => {
    const cartId = restarButton.dataset.cartId;
    const productId = restarButton.dataset.productId;

    borraUno(-1, cartId, productId);
});

async function agregaUno(cantidad, cartId, productId) {
  const currentQuantity = parseInt(cantidadElement.textContent);

  const newQuantity = currentQuantity + cantidad;
  if (newQuantity >= 0) {
    // Realizar la solicitud al endpoint del backend
    await fetch(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, {
      method: 'POST',
      body: JSON.stringify({ cartId, productId, cantidad: newQuantity }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        const existingProductIndex = data.payload.products.findIndex(
            (product) => product.product._id.toString() === productId
        );
      // Actualizar la cantidad en el frontend si la solicitud es exitosa
      cantidadElement.textContent = data.payload.products[existingProductIndex].quantity;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
}

async function borraUno(cantidad, cartId, productId) {
    const currentQuantity = parseInt(cantidadElement.textContent);
  
    const newQuantity = currentQuantity - cantidad;
    if (newQuantity >= 0) {
      // Realizar la solicitud al endpoint del backend
      await fetch(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, {
        method: 'POST',
        body: JSON.stringify({ quantity: -1 }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
          const existingProductIndex = data.payload.products.findIndex(
              (product) => product.product._id.toString() === productId
            );
        // Actualizar la cantidad en el frontend si la solicitud es exitosa
        cantidadElement.textContent = data.payload.products[existingProductIndex].quantity;
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }

  const borrar = async (cartId, productId) => {
    try {
      await fetch(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          // Eliminar el elemento del DOM correspondiente al producto
          const productElement = document.querySelector(`[data-element-id="${productId}"]`);
          productElement.remove();
  
          // Verificar si no quedan más elementos en el carrito
          const cartElements = document.querySelectorAll('[data-element-id]');
          const title = document.getElementById('title');
          if (cartElements.length === 0) {
            title.remove();
            const emptyCartElement = document.createElement('div');
            emptyCartElement.classList.add('col', 'd-flex', 'flex-column', 'p-3', 'justify-content-center', 'align-items-center');
            emptyCartElement.innerHTML = `
              <h3>
                <i class="fa-solid fa-triangle-exclamation text-warning"></i>
                El carrito está vacío
              </h3>
            `;
            document.querySelector('.d-flex.flex-column').appendChild(emptyCartElement);
          }
        })
        .catch(error => {
          console.log(error);
        })
    } catch (error) {
      console.log(error);
    }
  }
  
  const vaciarCarrito = async (cartId) => {
    try {
      await fetch(`http://localhost:8080/api/carts/${cartId}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        // Eliminar todos los elementos del carrito de la vista
        const cartContainer = document.querySelector('.d-flex.flex-column');
        cartContainer.innerHTML = '';

        // Mostrar el mensaje de carrito vacío
        const emptyCartElement = document.createElement('div');
        emptyCartElement.classList.add('col', 'd-flex', 'flex-column', 'p-3', 'justify-content-center', 'align-items-center');
        emptyCartElement.innerHTML = `
          <h3>
            <i class="fa-solid fa-triangle-exclamation text-warning"></i>
            El carrito está vacío
          </h3>
        `;
        cartContainer.appendChild(emptyCartElement);
      })
      .catch(error => {
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  }