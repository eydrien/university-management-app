document.addEventListener('DOMContentLoaded', () => {
    // Manejo del formulario de registro de notas
    const notasInscribeForm = document.getElementById('notasInscribeForm');
    if (notasInscribeForm) {
        notasInscribeForm.addEventListener('submit', event => {
            event.preventDefault();

            // Recolectar datos del formulario
            const formData = {
                cod_e: document.getElementById('cod_e').value,
                cod_a: document.getElementById('cod_a').value,
                id_p: document.getElementById('id_p').value,
                grupo: document.getElementById('grupo').value,
                n1: parseFloat(document.getElementById('n1').value),
                n2: parseFloat(document.getElementById('n2').value),
                n3: parseFloat(document.getElementById('n3').value),
            };

            // Simular una petición para guardar los datos
            fetch('http://localhost:3000/inscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en el registro');
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Las notas se han registrado exitosamente.');
                    notasInscribeForm.reset();
                    console.log('Registro exitoso:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Hubo un problema al registrar las notas.');
                });
        });
    }
});