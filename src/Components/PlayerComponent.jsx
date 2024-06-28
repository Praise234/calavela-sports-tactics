import DraggableElement from "./DraggableElement";



    const PlayerComponent = ({color, player_name, player_number, onDrag, onRightClick, group, position}) => {

    

        return(
            <DraggableElement  group={group} onDrag={onDrag}  position={position} onRightClick={onRightClick} type= "player" >
                <p className="font-[800] text-[14px] -mt-16 text-white">{player_name}</p>
                <div style={{ backgroundColor: color, display: "flex", alignItems:"center", justifyContent: "center" }} className="w-10 h-10 rounded-full text-center cursor-pointer font-bold text-white pla"  >
                  {player_number}
                </div>


            </DraggableElement>
        );

    };
    export default PlayerComponent;