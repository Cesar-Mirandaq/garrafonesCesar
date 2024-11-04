let carrito = [];
const totalSuma = document.getElementById('total-suma');
const carritoModal = document.getElementById('carrito-modal');
const carritoList = document.getElementById('carrito-list');
const closeBtn = document.querySelector('.close');
const cartBtn = document.getElementById('cart-btn');

// Funcionalidad de perfil
document.getElementById('perfil').addEventListener('click', () => {
    alert(`Bienvenido a nuestra tienda\n\nSíguenos en nuestras redes sociales:\n- Facebook: TiendaDeGarrafones\n- Instagram: @tiendadegarrafones\n\n`);
});

// Funcionalidad de carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const producto = button.parentElement;
        const nombre = producto.getAttribute('data-nombre');
        const precio = parseFloat(producto.getAttribute('data-precio'));

        carrito.push({ nombre, precio });
        actualizarCarrito();
    });
});

function actualizarCarrito() {
    carritoList.innerHTML = '';
    let total = 0;
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
        carritoList.appendChild(li);
        total += item.precio;
    });
    totalSuma.textContent = total.toFixed(2);
    cartBtn.textContent = `Carrito (${carrito.length})`;

    // Asegurarse de que el botón "Pagar" esté presente
    if (carrito.length > 0) {
        const pagarBtn = document.getElementById('pagar-btn');
        if (!pagarBtn) {
            const newPayBtn = document.createElement('button');
            newPayBtn.textContent = 'Pagar';
            newPayBtn.id = 'pagar-btn';
            newPayBtn.addEventListener('click', realizarPago);
            carritoList.appendChild(newPayBtn);
        }
    } else {
        const pagarBtn = document.getElementById('pagar-btn');
        if (pagarBtn) {
            pagarBtn.remove(); // Eliminar el botón si no hay productos
        }
    }
}

function realizarPago() {
    alert('Gracias por tu compra. Tu pago ha sido procesado.');
    carrito = []; // Limpiar el carrito
    actualizarCarrito(); // Actualizar la vista del carrito
    carritoModal.style.display = 'none'; // Cerrar el modal
}

// Mostrar y ocultar el carrito
cartBtn.addEventListener('click', () => {
    carritoModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    carritoModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == carritoModal) {
        carritoModal.style.display = 'none';
    }
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        carritoModal.style.display = 'none';
    }
});

// Cerrar sesión
document.getElementById('salir').addEventListener('click', () => {
    alert('Cerrando sesión');
    window.location.href = 'index.html';
});

// Manejar el formulario de contacto
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Mensaje enviado. Nos pondremos en contacto contigo pronto.');
    this.reset(); // Resetea el formulario
});
