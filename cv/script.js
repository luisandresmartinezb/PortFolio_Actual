/**
 * CV - acciones de interfaz
 * -------------------------
 * Este archivo mantiene separada la lógica JavaScript del HTML.
 * Actualmente controla la impresión o guardado del CV como PDF.
 */

document.querySelectorAll("[data-print]").forEach((button) => {
    button.addEventListener("click", () => {
        window.print();
    });
});
