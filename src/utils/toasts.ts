import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  background: "#111827",
  color: "#e2e8f0",
  customClass: {
    popup: "swal-toast-popup",
    timerProgressBar: "swal-toast-progress",
  },
});

export const toast = {
  info: (title: string, text?: string) =>
    Toast.fire({ icon: "info", title, text }),
  success: (title: string, text?: string) =>
    Toast.fire({ icon: "success", title, text }),
  warning: (title: string, text?: string) =>
    Toast.fire({ icon: "warning", title, text }),
  error: (title: string, text?: string) =>
    Toast.fire({ icon: "error", title, text }),
};
