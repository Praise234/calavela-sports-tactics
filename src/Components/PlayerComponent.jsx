import DraggableElement from "./DraggableElement";



    const PlayerComponent = ({color, player_name, player_number, onDrag, onRightClick, group, position, mobileMenu}) => {


        


        

    

        return(
            <DraggableElement  group={group} onDrag={onDrag}  position={position} onRightClick={onRightClick} type= "player" mobileMenu={mobileMenu} >
                {player_name !== "" && <p className="font-[800] text-center text-[12px] lg:text-[14px] -mt-16 text-white w-full pname">{player_name}</p>}
                <div style={{ backgroundColor: color, display: "flex", alignItems:"center", justifyContent: "center" }} className="w-8 h-8 lg:w-10 lg:h-10 rounded-full text-center cursor-pointer font-bold text-white text-[11px] lg:text-[16px] pla"  >
                  {player_number}
                </div>


            </DraggableElement>
        );

    };
    export default PlayerComponent;