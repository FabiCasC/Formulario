document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');
    
    const nombreError = document.getElementById('nombre-error');
    const emailError = document.getElementById('email-error');
    const mensajeError = document.getElementById('mensaje-error');
    
    // Configuración personalizada para SweetAlert2
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    
    // Función para validar email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Función para mostrar errores con animación
    function mostrarError(elemento, mensaje) {
        elemento.textContent = mensaje;
        elemento.classList.add('active');
    }
    
    // Función para ocultar errores
    function ocultarError(elemento) {
        elemento.textContent = '';
        elemento.classList.remove('active');
    }
    
    // Validación en tiempo real para el nombre
    nombreInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            ocultarError(nombreError);
        }
    });
    
    // Validación en tiempo real para el email
    emailInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            if (validarEmail(this.value.trim())) {
                ocultarError(emailError);
            } else {
                mostrarError(emailError, 'Formato de correo inválido');
            }
        } else {
            ocultarError(emailError);
        }
    });
    
    // Validación en tiempo real para el mensaje
    mensajeInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            ocultarError(mensajeError);
        }
    });
    
    // Función para validar el formulario
    function validarFormulario() {
        let esValido = true;
        
        // Validar nombre
        if (nombreInput.value.trim() === '') {
            mostrarError(nombreError, 'El nombre es obligatorio');
            esValido = false;
        } else {
            ocultarError(nombreError);
        }
        
        // Validar email
        if (emailInput.value.trim() === '') {
            mostrarError(emailError, 'El correo electrónico es obligatorio');
            esValido = false;
        } else if (!validarEmail(emailInput.value.trim())) {
            mostrarError(emailError, 'Ingresa un correo electrónico válido');
            esValido = false;
        } else {
            ocultarError(emailError);
        }
        
        // Validar mensaje
        if (mensajeInput.value.trim() === '') {
            mostrarError(mensajeError, 'El mensaje es obligatorio');
            esValido = false;
        } else {
            ocultarError(mensajeError);
        }
        
        return esValido;
    }
    
    // Manejar el envío del formulario
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validarFormulario()) {
            // Mostrar indicador de carga
            const submitBtn = document.getElementById('submitBtn');
            const buttonText = submitBtn.querySelector('.button-text');
            const buttonIcon = submitBtn.querySelector('.button-icon');
            
            const originalText = buttonText.textContent;
            const originalIcon = buttonIcon.innerHTML;
            
            buttonText.textContent = 'Enviando';
            buttonIcon.innerHTML = '<span class="loading-spinner"></span>';
            submitBtn.disabled = true;
            
            // Notificar inicio del proceso
            Toast.fire({
                icon: 'info',
                title: 'Enviando...',
                background: 'rgba(121, 113, 234, 0.9)',
                color: '#fff'
            });
            
            // Simular envío AJAX
            setTimeout(function() {
                // Crear objeto con los datos del formulario
                const formData = {
                    nombre: nombreInput.value.trim(),
                    email: emailInput.value.trim(),
                    mensaje: mensajeInput.value.trim()
                };
                
                // Simular respuesta exitosa (en caso real se llama a AJAX )
                console.log('Datos enviados:', formData);
                
                // Mostrar mensaje de éxito con SweetAlert personalizado
                Swal.fire({
                    title: '¡Mensaje enviado con éxito!',
                    text: 'Gracias por contactarnos. Te responderemos muy pronto.',
                    icon: 'success',
                    confirmButtonText: '¡Genial!',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdrop: `
                        rgba(255, 107, 107, 0.4)
                        url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M26.1 35.1c-2.3 2.3-2.3 6.1 0 8.5l17 17c2.3 2.3 6.1 2.3 8.5 0l17-17c2.3-2.3 2.3-6.1 0-8.5-2.3-2.3-6.1-2.3-8.5 0L43.9 51.4 35.1 35.1c-2.3-2.3-6.1-2.3-8.5 0z' fill='%23ffffff'/%3E%3C/svg%3E")
                        center top
                        no-repeat
                    `,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    },
                    customClass: {
                        confirmButton: 'swal-confirm-button'
                    }
                }).then(() => {
                    // Resetear el formulario con animación
                    contactForm.reset();
                    
                    // Animar el contenedor
                    const container = document.querySelector('.container');
                    container.style.animation = 'pulse 0.5s ease-in-out';
                    setTimeout(() => {
                        container.style.animation = '';
                    }, 500);
                });
                
                // Restaurar el botón
                buttonText.textContent = originalText;
                buttonIcon.innerHTML = originalIcon;
                submitBtn.disabled = false;
                
            }, 2000); // un retraso de 2 segundos para el envío
        }
    });
    
    //Estilos dinámicos para SweetAlert
    const style = document.createElement('style');
    style.textContent = `
        .swal2-popup {
            border-radius: 20px;
            padding: 2em;
        }
        
        .swal2-title {
            color: #ff6b6b !important;
            font-size: 1.8em !important;
        }
        
        .swal2-confirm {
            background: linear-gradient(135deg, #ff6b6b, #7971ea) !important;
            border-radius: 10px !important;
            padding: 12px 30px !important;
            font-size: 1.1em !important;
        }
        
        .swal-confirm-button {
            box-shadow: 0 8px 15px rgba(255, 107, 107, 0.3) !important;
        }
        
        .swal-confirm-button:hover {
            box-shadow: 0 12px 20px rgba(255, 107, 107, 0.4) !important;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.03); }
            100% { transform: scale(1); }
        }
        
        .animate__animated {
            animation-duration: 0.6s;
        }
        
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translate3d(0, -30px, 0);
            }
            to {
                opacity: 1;
                transform: translate3d(0, 0, 0);
            }
        }
        
        @keyframes fadeOutUp {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
                transform: translate3d(0, -30px, 0);
            }
        }
        
        .animate__fadeInDown {
            animation-name: fadeInDown;
        }
        
        .animate__fadeOutUp {
            animation-name: fadeOutUp;
        }
    `;
    document.head.appendChild(style);
});