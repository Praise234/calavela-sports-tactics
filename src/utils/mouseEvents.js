import cursorPenc from "../assets/images/cursor-penc.png";




export const handleMouseDown = (e, drawMode, color, lineType, shapes, setShapes, isDrawing, setSelectedId, selectedId, setSelectedShapeId, setMenuVisible, lastClickTime, setIsDrawing, setLastClickTime) => {
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
        setIsDrawing(false);``
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

  export const handleMouseMove = (e, isDrawing, shapes, selectedId, setShapes) => {
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


  export const handleMouseUp = (drawMode, setIsDrawing) => {
    if (drawMode !== 'polyline') {
      setIsDrawing(false);
    }
  };

  export const handleMouseEnter = (e) => {
    const container = e.target.getStage().container();
    container.style.cursor = 'pointer';
  };

  export const handleMouseLeave = (e, drawMode) => {
    const container = e.target.getStage().container();
    container.style.cursor = drawMode !== 'cursor' ? `url(${cursorPenc}), auto` : 'default';
  };

  export const handleMouseLeaveStage = (drawMode) => {
    const container = document.querySelector('.stage');
    container.style.cursor = drawMode !== 'cursor' ? `url(${cursorPenc}), auto` : 'default';
  };

  export const OpenContextMenu = (e, id, setSelectedShapeId, setMenuPosition, setMenuVisible) => {

    // console.log(e.target.getPosition());
  
    setSelectedShapeId(id);
    setMenuPosition({ x: e.evt.offsetX, y: e.evt.offsetY });
    setMenuVisible(true)
  
  };

