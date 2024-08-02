import React, { useEffect, useRef, useState } from 'react';
import { Stage} from 'react-konva';
import cursorPenc from "../assets/images/cursor-penc.png";
import ShapesContextMenuComponent from './ShapesContextMenuComponent';
import LayerContainer from './LayerContainer';
import { handleMouseDown, handleMouseLeave, handleMouseLeaveStage, handleMouseMove, handleMouseUp } from '../utils/mouseEvents';
import useShapesStore from '../store/shapesStore';



const DrawingCanvas = ({ drawMode, lineType, color }) => {

 

 

  const {
    setMenuVisible, setMenuPosition,
    setSelectedId, setSelectedShapeId,
    setIsDrawing, selectedId,
    setShapes, shapes,
    isDrawing,  selectedShapeId,
    menuVisible, menuPosition,
    lastClickTime, setLastClickTime,
  } = useShapesStore();
  

  // console.log(color);
  

  

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth < 768 ? window.innerWidth : 1208,
    height: window.innerWidth < 768 ? window.innerHeight : 603
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDimensions({ 
          width: window.innerWidth, 
          height:  window.innerHeight 
        });
      } else {
        setDimensions({ 
          width: 1208,  // Fixed width for large screens
          height: 603   // Fixed height for large screens
        });
      }
    };

    window.addEventListener('resize', handleResize);
    // Initialize dimensions when component mounts
    handleResize();

    // Cleanup function to remove the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Stage
        // width={358}
        // height={358}
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={(e) => handleMouseDown(e, drawMode, color, lineType, shapes, setShapes, isDrawing, setSelectedId, selectedId, setSelectedShapeId, setMenuVisible, lastClickTime, setIsDrawing, setLastClickTime)}
        onTouchStart={(e) => handleMouseDown(e, drawMode, color, lineType, shapes, setShapes, isDrawing, setSelectedId, selectedId, setSelectedShapeId, setMenuVisible, lastClickTime, setIsDrawing, setLastClickTime)}
        onTouchMove={(e) => handleMouseMove(e, isDrawing, shapes, selectedId, setShapes)}
        onMouseMove={(e) => handleMouseMove(e, isDrawing, shapes, selectedId, setShapes)}
        onMouseUp={() => handleMouseUp(drawMode, setIsDrawing)}
        onTouchEnd={() => handleMouseUp(drawMode, setIsDrawing)}
        onMouseLeave={() => handleMouseLeaveStage(drawMode)}
        onMouseEnter={(e) => handleMouseLeave(e, drawMode)}
        onMouseOver={(e) => {!isDrawing && handleMouseLeave(e, drawMode)}}
        className=' stage absolute h-full w-full'
        style={{ cursor: drawMode !== 'cursor' ? `url(${cursorPenc}), auto` : 'default' }}
      
      >
          <LayerContainer drawMode = {drawMode} />
      </Stage>
      {selectedShapeId !== null && <ShapesContextMenuComponent visible={menuVisible} x={menuPosition.x} y={menuPosition.y} 
            selectedShapeId={selectedShapeId} setSelectedShapeId={setSelectedShapeId} setShapes={setShapes} shapes={shapes} />}
    </>
  );
};

export default DrawingCanvas;
