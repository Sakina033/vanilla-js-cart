export function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    const textSpan = toast.querySelector(".toast-text");

    if(textSpan) {
        textSpan.textContent = message
    } else {
        const span = document.createElement("span");
        span.className = 'toast-text';
        span.textContent = message;
        toast.appendChild(span);
    }

    toast.classList.add("show");
    toast.style.display = "block";

    if (window.toastTimeout) clearTimeout(window.toastTimeout);

    window.toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.style.display = "none";
        }, 300);
    }, 3000);
}