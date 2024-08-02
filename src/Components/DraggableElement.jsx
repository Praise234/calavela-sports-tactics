import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import useShapesStore from "../store/shapesStore";



const DraggableElement = ({onDrag, children, group, position, onRightClick, type, mobileMenu}) => {

    const [isDragging, setIsDragging] = useState(false);

    const elemRef = useRef();

    const dragHandler = (e, data) => {
        
        setIsDragging(true);

        if (e.button === 2) {
            return false;
        }

        if(data.lastX === 0 && data.lastY === 0) 
            onDrag();
        
    }

    const dragEndHandler = (e, data) => {

        setIsDragging(false);
        

        
    }

    useEffect(() => {

        const draggableElem = document.getElementsByClassName(type + group + "dragElem");


        

        if(mobileMenu !== undefined && mobileMenu && draggableElem.length > 1) {
            for (var i = 0; i < draggableElem.length - 1; i++ ) {
                
                if(type === "bid" || type === "ball") {
                    draggableElem[i].style['top'] = "21px";
                } else {
                    draggableElem[i].style['top'] = "41px";
                }
                
            }
        } 
        if(mobileMenu !== undefined && !mobileMenu && draggableElem.length > 1) {
        
            for (var i = 0; i < draggableElem.length - 1; i++ ) {
                draggableElem[i].style['top'] = "-129px";
            }
        }

    }, [mobileMenu])

    const holdTimeoutRef = useRef(null);

    
    const {setMenuPosition} = useShapesStore();
    
    const handleTouchStart = (event) => {
        
        // Clear any previous timeouts to prevent multiple firings
        clearTimeout(holdTimeoutRef.current);
        // Set a timeout to trigger the hold action
        holdTimeoutRef.current = setTimeout(() => {
        //   console.log(group, position)
          onRightClick(event, group, position, type, true);
          setMenuPosition({ x: event.pageX, y: event.pageY });
        
      }, 800); // 800ms threshold for long press
    };
  
    const handleTouchEnd = () => {
      // Clear the timeout if the touch ends before the threshold
      clearTimeout(holdTimeoutRef.current);
    };
  
    
    
    return(
        <Draggable nodeRef={elemRef} onDrag={dragHandler} onStop={dragEndHandler}>
            <div ref={elemRef}  onClick={(e) => e.preventDefault()} 
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchEnd}
                onTouchEnd={handleTouchEnd}
                onContextMenu={(event) => onRightClick(event, group, position, type, false)} className={`flex flex-col ${!isDragging && "transition-all duration-500"} absolute ${type + group + "dragElem"} cursor-pointer ${type === 'ball' && 'w-11 h-11'} flex justify-center items-center z-[${100000}]`}>
                {children}
            </div>
        </Draggable>
      
    );

};
export default DraggableElement;