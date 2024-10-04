
document.addEventListener('DOMContentLoaded', () => {
    const propertyForm = document.getElementById('property-form');
    const propertyFormElement = document.getElementById('property-form-element');
    const formTitle = document.getElementById('form-title');
    const addPropertyBtn = document.getElementById('add-property-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    // Mostrar el formulario para añadir una propiedad
    addPropertyBtn.addEventListener('click', () => {
        propertyForm.style.display = 'block';
        formTitle.textContent = 'Añadir Propiedad';
        propertyFormElement.reset();
        document.getElementById('property-id').value = '';
    });

    // Ocultar el formulario sin hacer cambios
    cancelBtn.addEventListener('click', () => {
        propertyForm.style.display = 'none';
    });


    // Manejar el envío del formulario
    propertyFormElement.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const id = document.getElementById('property-id').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
    
        try {
            if (id) {
                // Actualizar propiedad existente
                await fetch(`propiedades/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, description, price })
                });
                alert('Propiedad actualizada correctamente');
            } else {
                // Crear nueva propiedad
                await fetch('http://localhost:3000/propiedades', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    
                    body: JSON.stringify({ title, description, price })
                });
                alert('Propiedad creada correctamente');
            }     
        } catch (error) {
            console.error('Error:', error);
            
        }
    })

   //------------------------------------------

});
