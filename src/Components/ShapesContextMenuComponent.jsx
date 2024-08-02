import { shapes } from "konva/lib/Shape";
import useShapesStore from "../store/shapesStore";

const ShapesContextMenuComponent = ({
  x,
  y,
  visible,
  
}) => {

  const { setShapes,
    selectedShapeId,
    setSelectedShapeId } = useShapesStore();


 
    // console.log(shapes)

  const handleDeleteObj = () => {
    setShapes((prev) => [...prev.map(shape => shape.id !== selectedShapeId && {...shape})]);

  
    setSelectedShapeId(null);
  }


  

  const elem =  (
    <ul className="input-class flex flex-col gap-3">
      <li>
        <button className="flex justify-center items-center bg-[#000] border-none text-white mx-auto mt-2 w-full" onClick={handleDeleteObj}>Delete</button>
      </li>
    </ul>
  );

  return (
    <>
      {visible && (
        <div
          style={{
            position: "absolute",
            left: x - 30 + "px",
            top: y + 30 + "px",
          }}
          className="absolute shadow-lg bg-custom-white text-custom-black z-[10000000] w-[200px] p-4"
        >
          {elem}
        </div>
      )}
    </>
  );
};

export default ShapesContextMenuComponent;
