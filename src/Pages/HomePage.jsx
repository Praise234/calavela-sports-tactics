import { useEffect, useState } from "react";
import PlayerComponent from "../Components/PlayerComponent";
import football_pitch from "../assets/images/football-field.png";
import ContextMenuComponent from "../Components/ContextMenuComponent";
import football from "../assets/images/football.png"
import FootBall from "../Components/FootBall";
import BidComponent from "../Components/BidComponent";

const HomePage = () => {

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedPlayerDetails, setSelectedPlayerDetails] = useState(null);
  const [objType, setObjType] = useState(null);


  const [players, setPlayers] = useState([
    [{ id: 1, color: "#ff0000", name: "", number: 1 }],
    [{ id: 1, color: "#ffff00", name: "", number: 1 }],
    [{ id: 1, color: "#0000ff", name: "", number: 1 }],
    [{ id: 1, color: "#000000", name: "", number: 1 }],
  ]);


  const [bids, setBids] = useState([
    [{ id: 1, color: "#ff0000", name: "" }],
    [{ id: 1, color: "#ffff00", name: ""}],
    [{ id: 1, color: "#0000ff", name: ""}],
    [{ id: 1, color: "#000000", name: ""}],
  ]);

  const [footballs, setFootballs] = useState([
    [{ id: 1, color: "#000000", name: 'f01', img: football, number: 1}],
  ])

  const dragHandler = (id) => {
      const newPlayer = {
        id:  players[id][players[id].length - 1].id + 1,
        color: players[id][0].color,
        name: "",
        number: players[id][players[id].length - 1].number + 1,
      };

      setPlayers((prev) => [...prev.map((group, idx) => id === idx ? [...group, newPlayer] : [...group])]);
    };

  const dragBidHandler = (id) => {
    const newBid = {
      id:  bids[id][bids[id].length - 1].id + 1,
      color: bids[id][0].color,
      name: "",
    };

    setBids((prev) => [...prev.map((group, idx) => id === idx ? [...group, newBid] : [...group])]);
  };



  const dragBallHandler = (id) => {
    const ball = {
      id: footballs[0][footballs.length - 1].id + 1,
      color: "#000000",
      name: "f" + "0" + (footballs[0][footballs.length - 1].id + 1),
      img: football,
      number: footballs[0][footballs.length - 1].number + 1
    };

    
    setFootballs((prev) => [...prev.map((group, idx) => idx === 0 ? [...group, ball] : [...group])]);
  };
  

  const handleContextMenu = (event, group, position, type) => {
    event.preventDefault();
    if (event.button === 2) { // Check if the event is a right-click
      setMenuPosition({ x: event.pageX, y: event.pageY });
      setSelectedPlayerDetails({group:group, position:position, type:type})
      setMenuVisible(true);
      if(type === "player") {
        setObjType("player")
      }
      if(type === "bid") {
        setObjType("bid")
      }
      if(type === "ball") {
        setObjType("ball")
      }
    }
  };

  const handleClick = (event) => {

    if (!event.target.classList.contains('input-class')) {
      setMenuVisible(false);
    }
  };
  
  
  useEffect(() => {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("contextmenu", (event) => event.preventDefault());
      document.removeEventListener("click", handleClick);
    }
  }, [players])
  

  return (
    <div className="bg-custom-primary w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center" id="dragContainer">
        {/* <div></div> */}
        <div className="w-[1250px] p-5" >
          <img src={football_pitch} alt="" className="object-cover"   />
        </div>
        <div className="flex gap-2 items-center justify-center w-full h-[50px] p-5 relative ">
          {players.map((group, idx) =>
            <div className=" h-24  w-11 flex justify-center items-center " key={idx}>
                {group.map((player, id) => (
                    <PlayerComponent
                        onDrag={() => dragHandler(idx)}
                        key={"P" + idx + " " + player.id}
                        color={player.color}
                        player_name={player.name}
                        player_number={player.number}
                        onRightClick = {handleContextMenu}
                        group = {idx}
                        position = {id}
                    />
                ))}
            </div>
          )}

          {bids.map((group, idx) =>
            <div className="relative h-6 w-6 " key={idx}>
                {group.map((player, id) => (
                    <BidComponent
                        onDrag={() => dragBidHandler(idx)}
                        key={"B" + idx + " " + player.id}
                        color={player.color}
                        player_number={player.number}
                        onRightClick = {handleContextMenu}
                        group = {idx}
                        position = {id}
                    />
                ))}
            </div>
          )}  
          
          {footballs.map((item, id) => 
            <div className="relative h-10" key={id}>
              {item.map((football, idx) => <FootBall key={"F" + idx + ' ' + football.id} number = {football.number} onDrag={() => dragBallHandler(idx)} position={idx} img={football.img} onRightClick = {handleContextMenu}  />)}
            </div>
          )}

  
        </div>
      </div>
     {selectedPlayerDetails !== null && objType === "player" && <ContextMenuComponent visible={menuVisible} x={menuPosition.x} y={menuPosition.y} setObjs={setPlayers} setSelectedPlayerDetails = {setSelectedPlayerDetails} selectedPlayerDetails={selectedPlayerDetails} objs={players} />}
     {selectedPlayerDetails !== null && objType === "bid" && <ContextMenuComponent visible={menuVisible} x={menuPosition.x} y={menuPosition.y} setObjs={setBids} setSelectedPlayerDetails = {setSelectedPlayerDetails} selectedPlayerDetails={selectedPlayerDetails} objs={bids} />}
     {selectedPlayerDetails !== null && objType === "ball" && <ContextMenuComponent visible={menuVisible} x={menuPosition.x} y={menuPosition.y} setObjs={setFootballs} setSelectedPlayerDetails = {setSelectedPlayerDetails} selectedPlayerDetails={selectedPlayerDetails} objs={footballs} />}
    </div>
  );
};
export default HomePage;
