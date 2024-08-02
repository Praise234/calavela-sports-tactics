import DraggableElement from "./DraggableElement";

const FootBall = ({ img, onDrag, onRightClick, position, number, mobileMenu }) => {
 

  return (
    <DraggableElement onDrag={onDrag} type="ball" onRightClick={onRightClick} group={0} position={position} mobileMenu={mobileMenu}>
       <div className="absolute w-7 h-7 lg:w-8 lg:h-8"> <img src={img} alt=""  /></div>
    </DraggableElement>

  );
};
export default FootBall;
