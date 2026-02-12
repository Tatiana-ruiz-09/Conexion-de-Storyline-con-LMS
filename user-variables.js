/*
=========================================================
 COMUNICACIÓN STORYLINE → PLATAFORMA
 Archivo: user.js
 Descripción:
 Envía variables personalizadas del curso SCORM
 hacia la plataforma usando postMessage.
=========================================================
*/

/*
  setInterval ejecuta la función cada 10 segundos (10000 ms).
  Esto permite actualizar continuamente el estado del curso.
*/
setInterval(function () {

  /*
    Función para detectar si el usuario está en dispositivo móvil.
    Retorna true si detecta evento táctil.
  */
  function isMobile() {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {
      return false;
    }
  }

  /*
    Obtiene la instancia del reproductor de Storyline.
    Necesario para acceder a las variables internas del curso.
  */
  let player = GetPlayer();

  /*
    ===============================
    VARIABLES DESDE STORYLINE
    ===============================
    IMPORTANTE:
    - Deben existir previamente en Storyline.
    - El nombre debe coincidir exactamente.
  */

  let slide = player.GetVar("SlidesViewed");
  let totalSlides = player.GetVar("TotalSlides");
  let nameSlide = player.GetVar("NameSlide");
  let isComplete = player.GetVar("IsComplete");
  let accessDate = player.GetVar("AccessDate");
  let final_boton = player.GetVar("Final_boton"); // Paso automático a evaluación

  /*
    Detecta el tipo de dispositivo
  */
  let device = isMobile() ? "Mobile" : "Desktop";

  /*
    ===============================
    OBJETO JSON A ENVIAR
    ===============================
    Aquí se agregan todas las variables que la
    plataforma debe recibir.
  */
  let jsonToSend = {
    slide: slide,
    totalSlides: totalSlides,
    nameSlide: nameSlide,
    isComplete: isComplete,
    accessDate: accessDate,
    final_boton: final_boton,
    device: device,
  };

  /*
    Muestra en consola los datos enviados.
    Útil para pruebas.
  */
  console.table(jsonToSend);

  /*
    Envío de información a la plataforma.
    
    - parent.parent → entorno local o contenedores anidados
    - parent → entorno productivo estándar
  */

  // Para entorno local
  if (window.parent.parent) {
    window.parent.parent.postMessage(JSON.stringify(jsonToSend), "*");
  }

  // Para producción
  window.parent.postMessage(JSON.stringify(jsonToSend), "*");

}, 10000);
