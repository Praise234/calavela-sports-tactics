import { useEffect, useRef } from "react";
import { Line, Transformer } from "react-konva";
import useShapesStore from "../store/shapesStore";



const FreehandShape = ({ shapeProps, isSelected, onSelect, onChange, onHover, isDashed, color, OpenContextMenu }) => {
    const shapeRef = useRef();
    const trRef = useRef();
    const {setSelectedShapeId, setMenuPosition, setMenuVisible} = useShapesStore();
  
    useEffect(() => {
      if (isSelected) {
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();
      }
    }, [isSelected]);

    const holdTimeoutRef = useRef(null);

    
    const handleTouchStart = (e) => {
      const {setMenuPosition} = useShapesStore();
      
      // Clear any previous timeouts to prevent multiple firings
      clearTimeout(holdTimeoutRef.current);
      // Set a timeout to trigger the hold action
      holdTimeoutRef.current = setTimeout(() => {
        setMenuPosition({ x: e.pageX, y: e.pageY });
        OpenContextMenu(e, shapeProps.id, setSelectedShapeId, setMenuPosition, setMenuVisible)
        
      }, 800); // 800ms threshold for long press
    };
  
    const handleTouchEnd = () => {
      // Clear the timeout if the touch ends before the threshold
      clearTimeout(holdTimeoutRef.current);
    };
  
    
    return (
      <>
        <Line
          ref={shapeRef}
          {...shapeProps}
          draggable
          onClick={onSelect}
          onContextMenu={(e) => OpenContextMenu(e, shapeProps.id, setSelectedShapeId, setMenuPosition, setMenuVisible)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchEnd}
          onTouchEnd={handleTouchEnd}
          onTap={onSelect}
          onMouseEnter={onHover}
          onMouseLeave={onHover}
          onDragEnd={(e) => {
            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          stroke={color}
          strokeWidth={8}
          dash = {isDashed ? [8, 12] : null}
        />
        {isSelected && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </>
    );
  };

  export default FreehandShape;