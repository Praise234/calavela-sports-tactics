import DraggableElement from "./DraggableElement";



    const PlayerComponent = ({color, player_name, player_number, onDrag, onRightClick, group, position}) => {

    

        return(
            <DraggableElement  group={group} onDrag={onDrag}  position={position} onRightClick={onRightClick} type= "player" >
                <p className="font-[800] text-[14px] -mt-16 ">{player_name}</p>
                <div className="absolute flex flex-col justify-center items-center ">
                    <div style={{backgroundColor: color}} className={`w-10 h-10 rounded-full bg-[${color}] flex justify-center items-center cursor-pointer font-[800] text-[18px]  `}>{player_number}</div>
                </div>
            </DraggableElement>
        );

    };
    export default PlayerComponent;