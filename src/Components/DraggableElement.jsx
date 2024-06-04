import { useRef } from "react";
import Draggable from "react-draggable";



const DraggableElement = ({onDrag, children, group, position, onRightClick, type}) => {

    const elemRef = useRef();

    const dragHandler = (e, data) => {
        if(type === 'ball'){
            e.preventDefault();
        }
        if (e.button === 2) {
            return false;
        }

        if(data.lastX === 0 && data.lastY === 0) 
            onDrag();
        
    }

    return(
        <Draggable  nodeRef={elemRef} onDrag={dragHandler} bounds= {{left: -500, top: -650, right: 650, bottom: 0}}  >

            <div ref={elemRef} onClick={(e) => e.preventDefault()} onContextMenu={(event) => onRightClick(event, group, position, type)} className={`absolute  cursor-pointer  ${type === 'ball' && 'w-11 h-11'} flex justify-center items-center z-[${100000 - (position *100)}]`} >
                {children}
            </div>
                

        </Draggable>
    );

};
export default DraggableElement;