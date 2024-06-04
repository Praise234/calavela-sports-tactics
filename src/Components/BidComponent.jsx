import DraggableElement from "./DraggableElement";

const BidComponent = ({onDrag, group, position, onRightClick, color, type}) => {
 

  return (
    <DraggableElement onDrag={onDrag} group={group} onRightClick={onRightClick} position={position} type="bid">
        <div style={{backgroundColor: color}} className={`w-6 h-6 rounded-full bg-[${color}] flex justify-center items-center cursor-pointer  `}></div>
    </DraggableElement>

  );
};
export default BidComponent;