import { Layer } from "react-konva";
import useShapesStore from "../store/shapesStore";
import { handleMouseEnter, handleMouseLeave, OpenContextMenu } from "../utils/mouseEvents";
import CircleShape from "./CircleShape";
import FreehandShape from "./FreehandShape";
import LineShape from "./LineShape";
import PolylineShape from "./PolylineShape";
import Rectangle from "./Rectangle";


const LayerContainer = ({drawMode}) => {

    const {
        shapes, selectedId,
        setSelectedId, setShapes,
        isDrawing
    } = useShapesStore();


    // console.log(shapes)


    return (
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
                        handleMouseLeave(e, drawMode);
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
                        handleMouseLeave(e, drawMode);
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
                        handleMouseLeave(e, drawMode);
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
                        handleMouseLeave(e, drawMode);
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
                        handleMouseLeave(e, drawMode);
                      }
                    }}
                  />
                );
              default:
                return null;
            }
          })}

          
        </Layer>
    );
};

export default LayerContainer;