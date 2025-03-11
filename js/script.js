document.addEventListener("DOMContentLoaded", () => {
    const productoSelect = document.getElementById("producto");
    const descuentoInput = document.getElementById("descuento");
    const calcularBtn = document.getElementById("calcular");
    const precioFinalSpan = document.getElementById("precioFinal");

    // verificar si hay un precio guardado en localStorage

    if (localStorage.getItem("precioFinal")) {
        precioFinalSpan.textContent = "$" + localStorage.getItem("precioFinal");
    }

    // cargar productos desde productos.json y agregarlos al select

    fetch("productos.json")
        .then(response => response.json())
        .then(data => {
            llenarSelectProductos(data.productos);
        })
        .catch(error => console.error("Error al cargar los productos:", error));

    function llenarSelectProductos(productos) {
        productos.forEach(producto => {
            const option = document.createElement("option");
            option.value = producto.precio; // guardamos el precio como value
            option.textContent = `${producto.nombre} - $${producto.precio}`;
            productoSelect.appendChild(option);
        });
    }

    // evento para calcular el precio con descuento
    
    calcularBtn.addEventListener("click", () => {
        const precioBase = parseFloat(productoSelect.value); // obtener precio del producto seleccionado
        const descuento = parseFloat(descuentoInput.value) || 0; // obtener el descuento ingresado

        // validaciones

        if (isNaN(precioBase)) {
            Swal.fire({
                title: "Error",
                text: "Por favor, selecciona un producto antes de calcular.",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
            return;
        }

        if (descuento < 0 || descuento > 100) {
            Swal.fire({
                title: "Descuento inválido",
                text: "El descuento debe estar entre 0% y 100%.",
                icon: "warning",
                confirmButtonText: "Aceptar"
            });
            return;
        }

        // calcular el precio final con descuento

        const precioFinal = precioBase - (precioBase * (descuento / 100));

        // mostrar el resultado y guardar en localStorage

        precioFinalSpan.textContent = "$" + precioFinal.toFixed(2);
        localStorage.setItem("precioFinal", precioFinal.toFixed(2));

        // mostrar mensaje con SweetAlert

        Swal.fire({
            title: "Cálculo realizado",
            text: `El precio final con descuento es: $${precioFinal.toFixed(2)}`,
            icon: "success",
            confirmButtonText: "Aceptar"
        });
    });
});
