export default function initEruda() {
  if (
    document.getElementById("eruda") ||
    process.env.NODE_ENV === "production"
  ) {
    return;
  }
  const scriptEruda = document.createElement("script");
  scriptEruda.src = "//cdn.jsdelivr.net/npm/eruda";
  scriptEruda.id = "eruda";
  document.head.appendChild(scriptEruda);

  // Inisialisasi Eruda setelah script dimuat
  scriptEruda.onload = () => {
    const scriptInit = document.createElement("script");
    scriptInit.textContent = "eruda.init();";
    document.body.appendChild(scriptInit);
  };
}
