import { useEffect, useRef, useState } from "react";
import { Circle, Line, Transformer } from "react-konva";
import useShapesStore from "../store/shapesStore";

const PolylineShape = ({ shapeProps, isSelected, onSelect, onChange, onHover, isDashed, color, OpenContextMenu }) => {
    const shapeRef = useRef();
    const trRef = useRef();
    const [isDragging, setIsDragging] = useState(false);
    const [initialPos, setInitialPos] = useState({x: 0, y: 0});

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
          
          {...shapeProps}
          
          draggable 
          ref={shapeRef}
          
          onClick={onSelect}
          onContextMenu={(e) => OpenContextMenu(e, shapeProps.id, setSelectedShapeId, setMenuPosition, setMenuVisible)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchEnd}
          onTouchEnd={handleTouchEnd}
          onTap={onSelect}
          onMouseEnter={onHover}
          onMouseLeave={onHover}
          // onDragStart={() => console.log("1", shapeProps)}
          // onDragStart={(e) => {setIsDragging(true); setInitialPos(e.target.getPosition())}}
          onDragEnd={(e) => {
            
            const pos = e.target.getPosition();
            // console.log(initialPos)
            const deltaX = pos.x - initialPos.x;
            const deltaY = pos.y - initialPos.y;
            onChange({
              ...shapeProps,
              // points: [...shapeProps.points.map((point, i) =>
              //   i % 2 === 0 ? point + deltaX : point + deltaY
              // )],
              x: e.target.x(),
              y: e.target.y(),
            });
            setIsDragging(false);
            // console.log("1", shapeProps);
          }}
          onTransformEnd={() => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              points: shapeProps.points.map((point, i) =>
                i % 2 === 0 ? point * scaleX : point * scaleY
              ),
            });
          }}
          stroke={color}
          strokeWidth={8}
          lineCap="round"
          lineJoin="round"
          dash = {isDashed ? [5, 10] : null}
        />
        {!isDragging && shapeProps.points.map((point, index) => (
          index % 2 === 0 ? (
            <Circle
              key={index}
              // draggable ref={shapeRef}
              x={point}
              y={shapeProps.points[index + 1]}
              radius={8}
              fill={color}
              stroke={color}
              strokeWidth={8}
            />
          ) : null
        ))}
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
export default PolylineShape;  