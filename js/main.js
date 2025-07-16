// js/main.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = form.querySelector("input[type='text']").value;
      const password = form.querySelector("input[type='password']").value;

      const user = usuarios.find(
        u => u.username === username && u.password === password
      );

      if (user) {
        sessionStorage.setItem("userRole", user.role);

        // Redirigir según rol
        switch (user.role) {
          case "propietario":
            window.location.href = "dashboard.html";
            break;
          case "administrador":
            window.location.href = "dashboard.html";
            break;
          case "personal":
            window.location.href = "dashboard.html";
            break;
          default:
            alert("Rol no reconocido");
        }
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    });
  }

  // Validación en dashboard.html
  if (window.location.pathname.endsWith("dashboard.html")) {
    const role = sessionStorage.getItem("userRole");

    if (!role) {
      alert("Debes iniciar sesión primero.");
      window.location.href = "index.html";
    }

    const container = document.getElementById("acciones-rapidas");
    const saludo = document.getElementById("saludo");

    const acciones = {
      propietario: [
        { nombre: "Estado de Cuenta", link: "estado-cuenta.html" },
        { nombre: "Registrar Pago", link: "registrar-pago.html" },
        { nombre: "Reportar Incidencia", link: "reportar-incidencia.html" },
        { nombre: "Ver Avisos", link: "avisos.html" },
        { nombre: "Reservar Área Común", link: "reservar-area.html" }
      ],
      administrador: [
        { nombre: "Gestionar Propietarios", link: "gestionar-propietarios.html" },
        { nombre: "Revisar Pagos", link: "gestionar-pagos.html" },
        { nombre: "Incidencias Reportadas", link: "gestionar-incidencias.html" },
        { nombre: "Calendario de Mantenimiento", link: "calendario-mantenimiento.html" }
      ],
      personal: [
        { nombre: "Panel de Tareas Asignadas", link: "panel-tareas.html" },
        { nombre: "Actualizar Tarea", link: "actualizar-tarea.html" },
        { nombre: "Ver Calendario General", link: "ver-calendario.html" }
      ]
    };

    // Limpiar contenedor
    container.innerHTML = "";

    // Insertar acciones
    (acciones[role] || []).forEach(acc => {
      const link = document.createElement("a");
      link.href = acc.link;
      link.textContent = acc.nombre;
      container.appendChild(link);
    });

    // Saludo personalizado
    if (saludo) {
      saludo.textContent = `Bienvenido, ${role.charAt(0).toUpperCase() + role.slice(1)} 🏡`;
    }
  }
});