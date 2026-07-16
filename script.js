document.addEventListener("DOMContentLoaded", () => {
    console.log("NexoGÜI: Script unificado v3.1 (Protección contra errores y modo Offline activa).");

    // RUTA DE LA API DE PERFIL
    const apiPerfilURL = "api/dashboard.php"; 

    // --- 1. LÓGICA COMÚN: PERFIL DE USUARIO ---
    // Se ejecuta en cualquier página para rellenar el nombre del vecino en la barra lateral
    async function cargarPerfilUsuario() {
        const userNameElem = document.getElementById("user-name");
        const userRoleElem = document.getElementById("user-role");

        if (userNameElem && userRoleElem) {
            try {
                const res = await fetch(apiPerfilURL);
                if (!res.ok) throw new Error("Servidor PHP no disponible");
                const datos = await res.json();
                
                userNameElem.textContent = datos.usuario.nombre;
                userRoleElem.textContent = datos.usuario.rol;
                
                // Si además estamos en index.html, cargamos sus estadísticas
                const statReportes = document.getElementById("stat-reportes");
                if (statReportes && datos.estadisticas) {
                    document.getElementById("stat-reportes").textContent = datos.estadisticas.total_reportes;
                    document.getElementById("stat-resueltos").textContent = datos.estadisticas.resueltos;
                    document.getElementById("stat-tiempo").textContent = datos.estadisticas.tiempo_promedio;
                }
            } catch (error) {
                console.warn("API Perfil: Usando datos locales de respaldo (Modo sin servidor).");
                // Datos por defecto si se abre como archivo local
                userNameElem.textContent = "Juan Pérez";
                userRoleElem.textContent = "Vecino";
                
                const statReportes = document.getElementById("stat-reportes");
                if (statReportes) {
                    document.getElementById("stat-reportes").textContent = "1,247";
                    document.getElementById("stat-resueltos").textContent = "892";
                    document.getElementById("stat-tiempo").textContent = "3.2";
                }
            }
        }
    }
    cargarPerfilUsuario();


    // --- 2. LÓGICA EXCLUSIVA: INDEX.HTML (DASHBOARD) ---
    const quickForm = document.getElementById("quick-report-form");
    if (quickForm) {
        console.log("Modo: Inicio / Dashboard detectado.");
        const quickCatButtons = document.querySelectorAll(".btn-cat");
        
        quickCatButtons.forEach(button => {
            button.addEventListener("click", () => {
                quickCatButtons.forEach(btn => btn.classList.remove("selected"));
                button.classList.add("selected");
            });
        });

        quickForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const ubicacion = document.getElementById("ubicacion").value.trim();
            const descripcion = document.getElementById("descripcion").value.trim();

            if (!ubicacion || !descripcion) {
                alert("Por favor, completa la ubicación y descripción del reporte rápido.");
                return;
            }
            alert("¡Reporte rápido procesado con éxito!");
            quickForm.reset();
        });
    }


    // --- 3. LÓGICA EXCLUSIVA: REPORTAR.HTML ---
    const fullForm = document.getElementById("full-report-form");
    if (fullForm) {
        console.log("Modo: Formulario de Reporte extendido detectado.");
        let categoriaSeleccionada = "";

        // Paso 1: Botones de categorías
        const catButtons = document.querySelectorAll(".btn-cat-full");
        catButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                catButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                categoriaSeleccionada = btn.getAttribute("data-cat");
            });
        });

        // Paso 2: Botón GPS simulado
        const btnGps = document.getElementById("btn-gps");
        if (btnGps) {
            btnGps.addEventListener("click", () => {
                document.getElementById("ubicacion-full").value = "18 de Julio esquina Artigas, Guichón";
                alert("Ubicación actual obtenida mediante GPS.");
            });
        }

        // Paso 3: Contador de caracteres
        const textarea = document.getElementById("descripcion-full");
        const charCount = document.getElementById("char-count");
        if (textarea && charCount) {
            textarea.addEventListener("input", () => {
                charCount.textContent = textarea.value.length;
            });
        }

        // Paso 4: Zona de arrastre de fotos
        const dropZone = document.getElementById("drop-zone");
        const fileInput = document.getElementById("file-input");
        if (dropZone && fileInput) {
            dropZone.addEventListener("click", () => fileInput.click());
            dropZone.addEventListener("dragover", (e) => {
                e.preventDefault();
                dropZone.style.borderColor = "#1e62d0";
            });
            dropZone.addEventListener("dragleave", () => {
                dropZone.style.borderColor = "#cbd5e1";
            });
            dropZone.addEventListener("drop", (e) => {
                e.preventDefault();
                dropZone.style.borderColor = "#cbd5e1";
                if (e.dataTransfer.files.length > 0) {
                    alert(`Imagen detectada e incorporada: ${e.dataTransfer.files[0].name}`);
                }
            });
        }

        // Envío del Formulario Completo
        fullForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const ubicacion = document.getElementById("ubicacion-full").value.trim();
            const descripcion = textarea ? textarea.value.trim() : "";

            if (!categoriaSeleccionada) return alert("Paso 1: Selecciona una categoría.");
            if (!ubicacion) return alert("Paso 2: Ingresa la ubicación.");
            if (!descripcion) return alert("Paso 3: Añade una descripción.");

            const datosReporte = {
                categoria: categoriaSeleccionada,
                ubicacion: ubicacion,
                descripcion: descripcion
            };

            try {
                const respuesta = await fetch("api/guardar_reporte.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(datosReporte)
                });
                
                const resultado = await respuesta.json();
                if (resultado.status === "success") {
                    alert(resultado.message);
                    window.location.href = "index.html"; 
                } else {
                    alert("Error: " + resultado.message);
                }
            } catch (err) {
                console.warn("Enviando reporte en modo local de simulación.");
                alert("¡Reporte enviado con éxito! (Simulado sin servidor PHP)\nNúmero de reporte: #RPT-2024-000" + Math.floor(Math.random() * 900 + 100));
                window.location.href = "index.html";
            }
        });
    }


    // --- 4. LÓGICA EXCLUSIVA: FORO.HTML (CORREGIDA CONTRA ERRORES EN ROJO) ---
    const forumPostsList = document.getElementById("forum-posts-list");
    if (forumPostsList) {
        console.log("Modo: Foro Comunitario detectado.");
        const apiForoURL = "api/foro_datos.php";

        // Base de datos de repuesto para que se vea el contenido idéntico si estás sin XAMPP
        const datosRespaldoForo = [
            {
                "id": 1, "autor": "María Espinoza", "iniciales": "ME", "fecha": "Hace 2 horas", "categoria": "propuesta",
                "titulo": "Proyecto para mejorar la iluminación de la Plaza Gabriel Terra",
                "contenido": "Hola vecinos, creo que sería genial organizarnos para presentar un proyecto al municipio y colocar más luminarias LED en los sectores oscuros de la plaza de Guichón, ¿qué opinan?",
                "likes": 24, "comentarios": 11
            },
            {
                "id": 2, "autor": "Carlos G.", "iniciales": "CG", "fecha": "Ayer", "categoria": "aviso",
                "titulo": "Corte de agua programado para el cuadrante norte",
                "contenido": "Aviso urgente: me informaron en las oficinas locales que mañana por la mañana habrá tareas de mantenimiento en la red de distribución. Tomen sus precauciones.",
                "likes": 15, "comentarios": 3
            },
            {
                "id": 3, "autor": "Luis Martínez", "iniciales": "LM", "fecha": "Hace 3 días", "categoria": "debate",
                "titulo": "Estado de las calles secundarias luego de las lluvias",
                "contenido": "Es preocupante cómo quedaron los caminos de balasto en la salida hacia la ruta. Los vehículos chicos rompen todo el tren delantero. ¿Saben si las cuadrillas tienen planeado pasar?",
                "likes": 42, "comentarios": 28
            }
        ];

        // Función para cargar los posts desde PHP o desde el respaldo local
        async function cargarPublicacionesForo() {
            try {
                const respuesta = await fetch(apiForoURL);
                if (!respuesta.ok) throw new Error("Servidor offline");
                const publicaciones = await respuesta.json();
                renderizarPosts(publicaciones);
            } catch (err) {
                console.warn("API Foro no alcanzada. Activando hilos comunitarios desde el almacenamiento local.");
                // Evita el mensaje en rojo e inyecta la maqueta directamente
                renderizarPosts(datosRespaldoForo); 
            }
        }

        // Función encargada de dibujar las tarjetas en el HTML
        function renderizarPosts(lista) {
            forumPostsList.innerHTML = "";
            lista.forEach(post => {
                const postCard = document.createElement("article");
                postCard.className = "card post-card";
                postCard.innerHTML = `
                    <div class="post-header">
                        <div class="post-meta">
                            <div class="post-avatar">${post.iniciales}</div>
                            <div>
                                <span class="post-author">${post.autor}</span>
                                <span class="post-date">• ${post.fecha}</span>
                            </div>
                        </div>
                        <span class="badge-tag ${post.categoria}">${post.categoria}</span>
                    </div>
                    <h2>${post.titulo}</h2>
                    <p class="post-excerpt">${post.contenido}</p>
                    <div class="post-footer">
                        <span class="post-action"><i class="fa-regular fa-thumbs-up"></i> ${post.likes} Me gusta</span>
                        <span class="post-action"><i class="fa-regular fa-comment"></i> ${post.comentarios} Comentarios</span>
                    </div>
                `;
                forumPostsList.appendChild(postCard);
            });
        }

        // Ejecutar carga inicial
        cargarPublicacionesForo();

        // Botón nueva discusión
        const btnNuevoTema = document.getElementById("btn-nuevo-tema");
        if(btnNuevoTema) {
            btnNuevoTema.addEventListener("click", () => alert("Abriendo panel para redactar una nueva discusión en el foro..."));
        }
    }
});