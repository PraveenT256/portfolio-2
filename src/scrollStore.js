// Tiny shared mutable store so the 3D scene can read scroll/mouse without React re-renders.
export const scrollStore = { progress: 0, velocity: 0, mouseX: 0, mouseY: 0 }
