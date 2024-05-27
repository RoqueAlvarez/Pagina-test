// Obtener el elemento del formulario de contacto por su ID y asignarlo a la variable 'formularioContacto'
const formularioContacto = document.getElementById('contactForm');

// Obtener el elemento donde se mostrará la información de contacto por su ID y asignarlo a la variable 'infoContacto'
const infoContacto = document.getElementById('contactInfo');

// Función para crear botones de editar y eliminar
function crearBotonesEditarEliminar(itemContacto) {
  // Crear botón de editar
  const btnEditar = document.createElement('button');
  btnEditar.textContent = 'Editar';
  btnEditar.classList.add('btn-editar');
  
  // Crear botón de eliminar
  const btnEliminar = document.createElement('button');
  btnEliminar.textContent = 'Eliminar';
  btnEliminar.classList.add('btn-eliminar');
  
  // Crear contenedor para botones
  const divBotones = document.createElement('div');
  divBotones.classList.add('botones');
  divBotones.appendChild(btnEditar);
  divBotones.appendChild(btnEliminar);
  
  // Agregar evento de click al botón de editar
  btnEditar.addEventListener('click', function() {
    // Obtener valores actuales del contacto
    const nombre = itemContacto.querySelector('.nombre').textContent.split(':')[1].trim();
    const telefono = itemContacto.querySelector('.telefono').textContent.split(':')[1].trim();
    const correo = itemContacto.querySelector('.correo').textContent.split(':')[1].trim();

    // Llenar el formulario con los valores actuales
    document.getElementById('firstName').value = nombre.split(' ')[0];
    document.getElementById('lastName').value = nombre.split(' ')[1];
    document.getElementById('phoneNumber').value = telefono;
    document.getElementById('email').value = correo;

    // Eliminar el contacto actual
    itemContacto.remove();
  });

  // Agregar evento de click al botón de eliminar
  btnEliminar.addEventListener('click', function() {
    // Eliminar el div padre que contiene la información del contacto
    itemContacto.remove();
  });

  return divBotones;
}

// Agregar un evento de escucha para cuando se envíe el formulario
formularioContacto.addEventListener('submit', function(evento) {
  // Evitar que el formulario se envíe automáticamente
  evento.preventDefault();

  // Obtener y limpiar el valor del campo de nombre
  const nombre = document.getElementById('firstName').value.trim();
  // Obtener y limpiar el valor del campo de apellido
  const apellido = document.getElementById('lastName').value.trim();
  // Obtener y limpiar el valor del campo de teléfono
  const telefono = document.getElementById('phoneNumber').value.trim();
  // Obtener y limpiar el valor del campo de correo electrónico
  const correo = document.getElementById('email').value.trim();

  // Comprobar si alguno de los campos está vacío
  if (!nombre || !apellido || !telefono || !correo) {
    alert('Por favor, completa todos los campos.');
    return; // Salir de la función si algún campo está vacío
  }

  // Comprobar si el nombre y el apellido contienen solo letras
  if (!/^[a-zA-Z]+$/.test(nombre) || !/^[a-zA-Z]+$/.test(apellido)) {
    alert('Nombre y apellido solo pueden contener letras.');
    return; // Salir de la función si el nombre o el apellido contienen caracteres no permitidos
  }

  // Comprobar si el número de teléfono tiene 10 dígitos numéricos
  if (!/^\d{10}$/.test(telefono)) {
    alert('El número de teléfono debe tener 10 dígitos numéricos.');
    return; // Salir de la función si el número de teléfono no tiene el formato correcto
  }

  // Comprobar si el correo electrónico tiene un formato válido
  if (!/^\S+@\S+\.\S+$/.test(correo)) {
    alert('Correo electrónico inválido.');
    return; // Salir de la función si el correo electrónico no tiene el formato correcto
  }

  // Crear un nuevo elemento div para mostrar la información de contacto
  const itemInfoContacto = document.createElement('div');
  itemInfoContacto.classList.add('contacto');
  // Establecer el contenido HTML del elemento div con los datos de contacto
  itemInfoContacto.innerHTML = `
    <div>
      <p class="nombre"><strong>Nombre:</strong> ${nombre} ${apellido}</p>
      <p class="telefono"><strong>Teléfono:</strong> ${telefono}</p>
      <p class="correo"><strong>Correo electrónico:</strong> ${correo}</p>
    </div>
  `;
  
  // Crear botones de editar y eliminar
  const botones = crearBotonesEditarEliminar(itemInfoContacto);
  itemInfoContacto.appendChild(botones);
  
  // Agregar el elemento div al contenedor de información de contacto
  infoContacto.appendChild(itemInfoContacto);

  // Restablecer el formulario para limpiar los campos después de enviar la información
  formularioContacto.reset();
});
