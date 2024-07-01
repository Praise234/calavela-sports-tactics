import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Circle, Line, Transformer } from 'react-konva';
import cursorPenc from "../assets/images/cursor-penc.png";
import ShapesContextMenuComponent from './ShapesContextMenuComponent';






const Rectangle = ({ shapeProps, isSelected, onSelect, onChange, onHover, isDashed, color,  OpenContextMenu }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        ref={shapeRef}
        {...shapeProps}
        draggable
        onClick={onSelect}
        onContextMenu={(e) => OpenContextMenu(e, shapeProps.id)}
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

const CircleShape = ({ shapeProps, isSelected, onSelect, onChange, onHover, isDashed, color, OpenContextMenu }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Circle
        ref={shapeRef}
        {...shapeProps}
        draggable
        onClick={onSelect}
        onContextMenu={(e) => OpenContextMenu(e, shapeProps.id)}
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
            radius: Math.max(5, node.radius() * scaleX),
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

const LineShape = ({ shapeProps, isSelected, onSelect, onChange, onHover, isDashed, color, OpenContextMenu }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Line
        ref={shapeRef}
        {...shapeProps}
        draggable
        onClick={onSelect}
        onContextMenu={(e) => OpenContextMenu(e, shapeProps.id)}
        onTap={onSelect}
        onMouseEnter={onHover}
        onMouseLeave={onHover}
        onDragEnd={(e) => {
          const pos = e.target.position();
          onChange({
            ...shapeProps,
            // points: shapeProps.points.map((point, i) =>
            //   i % 2 === 0 ? point + pos.x - shapeProps.x : point + pos.y - shapeProps.y
            // ),
            // x: pos.x,
            // y: pos.y
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
            points: shapeProps.points.map((point, i) =>
              i % 2 === 0 ? point * scaleX : point * scaleY
            ),
          });
        }}
        stroke={color}
        strokeWidth={8}
        dash = {isDashed ? [10, 12] : null}
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

const FreehandShape = ({ shapeProps, isSelected, onSelect, onChange, onHover, isDashed, color, OpenContextMenu }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Line
        ref={shapeRef}
        {...shapeProps}
        draggable
        onClick={onSelect}
        onContextMenu={(e) => OpenContextMenu(e, shapeProps.id)}
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

const PolylineShape = ({ shapeProps, isSelected, onSelect, onChange, onHover, isDashed, color, OpenContextMenu }) => {
  const shapeRef = useRef();
  const trRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [initialPos, setInitialPos] = useState({x: 0, y: 0});

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  
  

  return (
    <>
      <Line
        
        {...shapeProps}

        draggable 
        ref={shapeRef}
        
        onClick={onSelect}
        onContextMenu={(e) => OpenContextMenu(e, shapeProps.id)}
        onTap={onSelect}
        onMouseEnter={onHover}
        onMouseLeave={onHover}
        onDragStart={() => console.log("1", shapeProps)}
        // onDragStart={(e) => {setIsDragging(true); setInitialPos(e.target.getPosition())}}
        onDragEnd={(e) => {
          
          const pos = e.target.getPosition();
          console.log(initialPos)
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
          console.log("1", shapeProps);
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

const DrawingCanvas = ({ drawMode, lineType, color }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [shapes, setShapes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [lastClickTime, setLastClickTime] = useState(0);

  
  
  const handleMouseDown = (e) => {
    const currentTime = new Date().getTime();
    const { x, y } = e.target.getStage().getPointerPosition();

     if (drawMode === 'cursor') {
      setSelectedId(0);
     }

     setSelectedShapeId(null); 
     setMenuVisible(false);
    

    // Check for double-click
    if (currentTime - lastClickTime < 300) {  // 300ms for double-click detection
      if (drawMode === 'polyline') {
        setIsDrawing(false);
        setSelectedId(0);
        return;
      }
    }
    setLastClickTime(currentTime);
    
    if (drawMode === 'polyline' && isDrawing) {
      const newShapes = shapes.map(shape => {
        if (shape.id === selectedId) {
          return {
            ...shape,
            points: shape.points.concat([x, y]),
          };
        }
        return shape;
      });
      setShapes(newShapes);
    } else if (selectedId === null || (e.target.attrs.className && e.target.attrs.className.includes('stage'))) {
  
      setIsDrawing(true);
      let newShape;
      switch (drawMode) {
        case 'rectangle':
          newShape = {
            x, y, width: 0, height: 0, fill: 'rgba(0,0,0,.3)', id: `rect${shapes.length}`, type: 'rectangle', color: color, lineType:lineType
          };
          break;
        case 'circle':
          newShape = {
            x, y, radius: 0, fill: 'rgba(0,0,0,.3)', id: `circle${shapes.length}`, type: 'circle', color: color, lineType:lineType
          };
          break;
        case 'line':
          newShape = {
            points: [x, y, x, y], stroke: 'rgba(0,0,0,.3)', id: `line${shapes.length}`, type: 'line', color: color, lineType:lineType
          };
          break;
        case 'freehand':
          newShape = {
            points: [x, y], stroke: 'rgba(0,0,0,.3)', id: `freehand${shapes.length}`, type: 'freehand', color: color, lineType:lineType
          };
          break;
        case 'polyline':
          newShape = {
            points: [x, y, x, y], stroke: 'rgba(0,0,0,.3)', id: `polyline${shapes.length}`, type: 'polyline', color: color, lineType:lineType
          };
          break;
        default:
          break;
      }
      if (newShape) {
        setShapes([...shapes, newShape])
        setSelectedId(newShape.id);
        setIsDrawing(true);
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const newShapes = shapes.map(shape => {
      if (shape.id === selectedId) {
        switch (shape.type) {
          case 'rectangle':
            return {
              ...shape,
              width: point.x - shape.x,
              height: point.y - shape.y,
            };
          case 'circle':
            return {
              ...shape,
              radius: Math.sqrt(Math.pow(point.x - shape.x, 2) + Math.pow(point.y - shape.y, 2)),
            };
          case 'line':
            return {
              ...shape,
              points: [shape.points[0], shape.points[1], point.x, point.y],
            };
          case 'freehand':
            return {
              ...shape,
              points: [...shape.points, point.x, point.y],
            };
          case 'polyline':
            if (shape.points.length >= 2) {
              return {
                ...shape,
                points: shape.points.slice(0, -2).concat([point.x, point.y]),
              };
            }
            return shape;
          default:
            break;
        }
      }
      return shape;
    });
    setShapes(newShapes);
  };

  const handleMouseUp = () => {
    if (drawMode !== 'polyline') {
      setIsDrawing(false);
    }
  };

  const handleMouseEnter = (e) => {
    const container = e.target.getStage().container();
    container.style.cursor = 'pointer';
  };

  const handleMouseLeave = (e) => {
    const container = e.target.getStage().container();
    container.style.cursor = drawMode !== 'cursor' ? `url(${cursorPenc}), auto` : 'default';
  };

  const handleMouseLeaveStage = () => {
    const container = document.querySelector('.stage');
    container.style.cursor = drawMode !== 'cursor' ? `url(${cursorPenc}), auto` : 'default';
  };

  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  
  const OpenContextMenu = (e, id) => {

    console.log(e.target.getPosition());
  
    setSelectedShapeId(id);
    setMenuPosition({ x: e.evt.offsetX, y: e.evt.offsetY });
    setMenuVisible(true)
  
  };

  return (
    <>
      <Stage
        width={1208}
        height={603}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeaveStage}
        onMouseEnter={handleMouseLeave}
        onMouseOver={!isDrawing && handleMouseLeave}
        className=' stage absolute '
        style={{ cursor: drawMode !== 'cursor' ? `url(${cursorPenc}), auto` : 'default' }}
      
      >
        <Layer >
          {shapes.map((shape, i) => {
            switch (shape.type) {
              case 'rectangle':
                return (
                  <Rectangle
                    key={i}
                    color={shape.color}
                    OpenContextMenu = {OpenContextMenu}
                    isDashed={shape.lineType === 'dotted'}
                    shapeProps={shape}
                    isSelected={shape.id === selectedId}
                    onSelect={() => setSelectedId(shape.id)}
                    onChange={(newAttrs) => {
                      const newShapes = shapes.slice();
                      newShapes[i] = newAttrs;
                      setShapes(newShapes);
                    }}
                    onHover={(e) => {
                      if (!isDrawing) {
                        handleMouseEnter(e);
                      } else {
                        handleMouseLeave(e);
                      }
                    }}
                  />
                );
              case 'circle':
                return (
                  <CircleShape
                    key={i}
                    OpenContextMenu = {OpenContextMenu}
                    color={shape.color}
                    isDashed={shape.lineType === 'dotted'}
                    shapeProps={shape}
                    isSelected={shape.id === selectedId}
                    onSelect={() => setSelectedId(shape.id)}
                    onChange={(newAttrs) => {
                      const newShapes = shapes.slice();
                      newShapes[i] = newAttrs;
                      setShapes(newShapes);
                    }}
                    onHover={(e) => {
                      if (!isDrawing) {
                        handleMouseEnter(e);
                      } else {
                        handleMouseLeave(e);
                      }
                    }}
                  />
                );
              case 'line':
                return (
                  <LineShape
                    key={i}
                    OpenContextMenu = {OpenContextMenu}
                    color={shape.color}
                    isDashed={shape.lineType === 'dotted'}
                    shapeProps={shape}
                    isSelected={shape.id === selectedId}
                    onSelect={() => setSelectedId(shape.id)}
                    onChange={(newAttrs) => {
                      const newShapes = shapes.slice();
                      newShapes[i] = newAttrs;
                      setShapes(newShapes);
                    }}
                    onHover={(e) => {
                      if (!isDrawing) {
                        handleMouseEnter(e);
                      } else {
                        handleMouseLeave(e);
                      }
                    }}
                  />
                );
              case 'freehand':
                return (
                  <FreehandShape
                    key={i}
                    OpenContextMenu = {OpenContextMenu}
                    color={shape.color}
                    isDashed={shape.lineType === 'dotted'}
                    shapeProps={shape}
                    isSelected={shape.id === selectedId}
                    onSelect={() => setSelectedId(shape.id)}
                    onChange={(newAttrs) => {
                      const newShapes = shapes.slice();
                      newShapes[i] = newAttrs;
                      setShapes(newShapes);
                    }}
                    onHover={(e) => {
                      if (!isDrawing) {
                        handleMouseEnter(e);
                      } else {
                        handleMouseLeave(e);
                      }
                    }}
                  />
                );
              case 'polyline':
                return (
                  <PolylineShape
                    key={i}
                    OpenContextMenu = {OpenContextMenu}
                    color={shape.color}
                    isDashed={shape.lineType === 'dotted'}
                    shapeProps={shape}
                    isSelected={shape.id === selectedId}
                    onSelect={() => setSelectedId(shape.id)}
                    
                    onChange={(newAttrs) => {
                      const newShapes = shapes.slice();
                      newShapes[i] = newAttrs;
                      setShapes(newShapes);
                    }}
                    onHover={(e) => {
                      if (!isDrawing) {
                        handleMouseEnter(e);
                      } else {
                        handleMouseLeave(e);
                      }
                    }}
                  />
                );
              default:
                return null;
            }
          })}

          
        </Layer>
      </Stage>
      {selectedShapeId !== null && <ShapesContextMenuComponent visible={menuVisible} x={menuPosition.x} y={menuPosition.y} 
            selectedShapeId={selectedShapeId} setSelectedShapeId={setSelectedShapeId} setShapes={setShapes} shapes={shapes} />}
    </>
  );
};

export default DrawingCanvas;
