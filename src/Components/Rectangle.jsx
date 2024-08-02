import { useEffect, useRef } from "react";
import { Rect, Transformer } from "react-konva";
import useShapesStore from "../store/shapesStore";


const Rectangle = ({ shapeProps, isSelected, onSelect, onChange, onHover, isDashed, color,  OpenContextMenu }) => {
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
        <Rect
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
          onTransformEnd={() => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(5, node.height() * scaleY),
            });
          }}
          stroke={color}
          strokeWidth={8}
          dash = {isDashed ? [10, 5] : null}
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
  export default Rectangle;