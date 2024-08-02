import { create } from "zustand";
import rectsquare from "../assets/images/rectsquare.png";
import circle from "../assets/images/circle.png";
import line from "../assets/images/line.png";
import pen from "../assets/images/pen.png";
import polyline from "../assets/images/polyline.png";
import cursor from "../assets/images/cursor.png";
import real from "../assets/images/real.png";
import dotted from "../assets/images/dotted.png";

const useShapesStore = create((set) => ({
  isDrawing: false,
  setIsDrawing: (isDrawing) => set({ isDrawing }),

  shapes: [],
  setShapes: (updater) => set((state) => ({
    shapes: typeof updater === 'function' ? updater(state.shapes) : updater,
  })),

  selectedId: null,
  setSelectedId: (selectedId) => set({ selectedId }),

  lastClickTime: 0,
  setLastClickTime: (lastClickTime) => set({ lastClickTime }),

  selectedShapeId: null,
  setSelectedShapeId: (selectedShapeId) => set({ selectedShapeId }),

  menuVisible: false,
  setMenuVisible: (menuVisible) => set({ menuVisible }),

  menuPosition: { x: 0, y: 0 },
  setMenuPosition: (menuPosition) => set({ menuPosition }),

  shapesMenu: [
    { name: 'rectangle', img: rectsquare }, 
    { name: 'circle', img: circle }, 
    { name: 'line', img: line },
    { name: 'freehand', img: pen },
    // { name: 'polyline', img: polyline },
    { name: 'cursor', img: cursor },
  ],

  lineTypes: [
    { name: 'real', img: real }, 
    { name: 'dotted', img: dotted }
  ],

  selectedShape: { name: 'cursor', img: cursor },
  selectedLineType: { name: 'real', img: real },

  setShapesMenu: (shapesMenu) => set({ shapesMenu }),
  setLineTypes: (lineTypes) => set({ lineTypes }),
  setSelectedShape: (selectedShape) => set({ selectedShape }),
  setSelectedLineType: (selectedLineType) => set({ selectedLineType }),

  colors: [
    { id: 1, color: "#ff0000" },
    { id: 2, color: "#ffff00" },
    { id: 3, color: "#0000ff" },
    { id: 4, color: "#000000" },
  ],

  selectedColor: { id: 1, color: "#ff0000" },

  setColors: (colors) => set({ colors }),
  setSelectedColor: (selectedColor) => set({ selectedColor }),
}));

export default useShapesStore;
