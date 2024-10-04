


document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (event) => editProperty(event.target.dataset.id));
});

document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (event) => deleteProperty(event.target.dataset.id));
});



// Función para cargar las propiedades
async function loadProperties() {
    try {
        const response = await fetch('http://localhost:3000/propiedades');
        if (!response.ok) throw new Error('Error al obtener las propiedades');
        
        const properties = await response.json();
        propertiesContainer.innerHTML = properties.map(prop => `
            <div class="col-md-4">
                <div class="card h-100">
                    <img src="casa.jpg" class="card-img-top" alt="${prop.title}">
                    <div class="card-body">
                        <h5 class="card-title">${prop.title}</h5>
                        <p class="card-text">${prop.description}</p>
                        <p>Precio: $${prop.price}</p>
                        <button class="btn btn-warning edit-btn" data-id="${prop.id}">Editar</button>
                        <button class="btn btn-danger delete-btn" data-id="${prop.id}">Eliminar</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Añadir manejadores de eventos a los botones de editar y eliminar
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (event) => editProperty(event.target.dataset.id));
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (event) => deleteProperty(event.target.dataset.id));
        });

    } catch (error) {
        console.error('Error al cargar propiedades:', error);
    }
}

// Función para editar una propiedad
async function editProperty(id) {
    try {
        const response = await fetch(`http://localhost:3000/propiedades/${id}`);
        if (!response.ok) throw new Error('Error al obtener la propiedad');

        const property = await response.json();
        document.getElementById('property-id').value = property.id;
        document.getElementById('title').value = property.title;
        document.getElementById('description').value = property.description;
        document.getElementById('price').value = property.price;

        formTitle.textContent = 'Editar Propiedad';
        property.style.display = 'block';
    } catch (error) {
        console.error('Error al cargar la propiedad para editar:', error);
    }
}

// Función para eliminar una propiedad
async function deleteProperty(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta propiedad?')) {
        try {
            await fetch(`http://localhost:3000/propiedades/${id}`, {
                method: 'DELETE'
            });
            alert('Propiedad eliminada correctamente');
            loadProperties(); // Recargar propiedades
        } catch (error) {
            console.error('Error al eliminar la propiedad:', error);
        }
    }
}

// Cargar propiedades cuando se carga la página
loadProperties();