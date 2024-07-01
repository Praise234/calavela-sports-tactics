import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";



const DraggableElement = ({onDrag, children, group, position, onRightClick, type}) => {

    const elemRef = useRef();

    const dragHandler = (e, data) => {
        
        if (e.button === 2) {
            return false;
        }

        if(data.lastX === 0 && data.lastY === 0) 
            onDrag();
        
    }

    const dragEndHandler = (e, data) => {
        if(type === 'ball'){
            e.preventDefault();
        }
        if (e.button === 2) {
            return false;
        }
      
        
    }


    return(
        <Draggable  nodeRef={elemRef} onDrag={dragHandler} defaultClassName="absolute"   >

            <div ref={elemRef} onClick={(e) => e.preventDefault()} onContextMenu={(event) => onRightClick(event, group, position, type)} className={`absolute  cursor-pointer  ${type === 'ball' && 'w-11 h-11'} flex justify-center items-center z-[${100000 }]`} >
                {children}
            </div>
                

        </Draggable>
    );

};
export default DraggableElement;