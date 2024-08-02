import DraggableElement from "./DraggableElement";

const BidComponent = ({onDrag, group, position, onRightClick, color, type, mobileMenu}) => {
 

  return (
    <DraggableElement onDrag={onDrag} group={group} onRightClick={onRightClick} position={position} type="bid" mobileMenu={mobileMenu}>
        <div style={{backgroundColor: color}} className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-[${color}] flex justify-center items-center cursor-pointer  `}></div>
    </DraggableElement>

  );
};
export default BidComponent;