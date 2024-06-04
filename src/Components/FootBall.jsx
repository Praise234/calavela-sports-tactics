import DraggableElement from "./DraggableElement";

const FootBall = ({ img, onDrag, onRightClick, position, number }) => {
 

  return (
    <DraggableElement onDrag={onDrag} type="ball" onRightClick={onRightClick} group={0} position={position} >
       <div className="absolute w-10 h-10"> <img src={img} alt=""  /></div>
    </DraggableElement>

  );
};
export default FootBall;