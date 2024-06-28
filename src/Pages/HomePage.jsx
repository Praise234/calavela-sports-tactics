import { useEffect, useRef, useState } from "react";
import PlayerComponent from "../Components/PlayerComponent";
import football_pitch from "../assets/images/football-field.png";
import lacrosse_pitch from "../assets/images/lacrosse-women.png";
import icehockey_pitch from "../assets/images/icehockey.png";
import netball_pitch from "../assets/images/netball.png";
import futsal_pitch from "../assets/images/futsal.png";
import floorball_pitch from "../assets/images/floorball.png";
import basketball_pitch from "../assets/images/basketball.png";
import americanfootball_pitch from "../assets/images/americanfootball.png";

import ContextMenuComponent from "../Components/ContextMenuComponent";
import football from "../assets/images/football.png"
import FootBall from "../Components/FootBall";
import BidComponent from "../Components/BidComponent";
import DrawingCanvas from "../Components/DrawingCanvas";
import rectsquare from "../assets/images/rectsquare.png";
import circle from "../assets/images/circle.png";
import line from "../assets/images/line.png";
import pen from "../assets/images/pen.png";
import polyline from "../assets/images/polyline.png";
import cursor from "../assets/images/cursor.png";
import real from "../assets/images/real.png";
import dotted from "../assets/images/dotted.png";
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image-more';

const HomePage = () => {

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedPlayerDetails, setSelectedPlayerDetails] = useState(null);
  const [objType, setObjType] = useState(null);
  const [shapes, setShapes] = useState([
    {name: 'rectangle', img: rectsquare}, 
    {name: 'circle', img: circle}, 
    {name: 'line', img: line},
    {name: 'freehand', img: pen},
    {name: 'polyline', img: polyline},
    {name: 'cursor', img: cursor},
  ]);
  const [lineTypes, setLineTypes] = useState([{name: 'real', img: real}, {name: 'dotted', img: dotted}]);
  const [selectedShape, setSelectedShape] = useState(shapes[shapes.length - 1]);
  const [selectedLineType, setSelectedLineType] = useState(lineTypes[0]);

  const [fields, setFields] = useState([
    {name: "football_pitch", img: football_pitch},
    {name: "lacrosse_pitch", img: lacrosse_pitch},
    {name: "icehockey_pitch", img: icehockey_pitch},
    {name: "netball_pitch", img: netball_pitch},
    {name: "futsal_pitch", img: futsal_pitch},
    {name: "floorball_pitch", img: floorball_pitch},
    {name: "basketball_pitch", img: basketball_pitch},
    {name: "americanfootball_pitch", img: americanfootball_pitch}

  ]);
  const [selectedField, setSelectedField] = useState(fields[0]);

 


  const [players, setPlayers] = useState([
    [{ id: 1, color: "#ff0000", name: "", number: 1 }],
    [{ id: 2, color: "#ffff00", name: "", number: 1 }],
    [{ id: 3, color: "#0000ff", name: "", number: 1 }],
    [{ id: 4, color: "#000000", name: "", number: 1 }],
  ]);



  const [bids, setBids] = useState([
    [{ id: 1, color: "#ff0000", name: "" }],
    [{ id: 2, color: "#ffff00", name: ""}],
    [{ id: 3, color: "#0000ff", name: ""}],
    [{ id: 4, color: "#000000", name: ""}],
  ]);

  const [colors, setColors] = useState([
    { id: 1, color: "#ff0000",},
    { id: 2, color: "#ffff00"},
    { id: 3, color: "#0000ff",},
    { id: 4, color: "#000000",},
  ]);

  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const [footballs, setFootballs] = useState([
    [{ id: 1, color: "#000000", name: 'f01', img: football, number: 1}],
  ]);

  const [updateFlag, setUpdateFlag] = useState(false);
  const [updateSecFlag, setUpdateSecFlag] = useState(false);

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
  }, [players]);


  const targetDivRef = useRef(null);
  const saveAsImage = () => {
    setPlayers(prev => prev.map(group => group.slice(0, -1)));
    setBids(prev => prev.map(group => group.slice(0, -1)));
    setFootballs(prev => prev.map(group => group.slice(0, -1)));

    

    document.getElementById('cont').style.width = "383px";
    document.getElementById('curs').style.display = "none";
    document.getElementById('line').style.display = "none";
    document.getElementById('col').style.display = "none";
    document.getElementById('btnSave').style.display = "none";
    
    const plas = document.getElementsByClassName('pla');
    if (plas.length > 0) {
      for (let i = 0; i < plas.length; i++) {
        plas[i].style.display = "block";
        plas[i].style.alignItems = "";
        plas[i].style.justifyContent = "";
      }
    }


    setUpdateFlag(true); // Set the flag to trigger useEffect
  };

  useEffect(() => {
    if (updateFlag) {
      // Only run html2canvas if the update flag is true
      html2canvas(targetDivRef.current)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = 'my-image.png';
          link.href = imgData;
          link.click();
          setUpdateFlag(false); // Reset the flag after processing
          setUpdateSecFlag(true)
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [updateFlag]); // Dependency array includes only updateFlag

  const dragUpdateHandler = (id) => {

    setPlayers(prev => prev.map((group, index) => {
      // Calculate new values for the new player
      const newId = group.length > 0 ? group[group.length - 1].id + 1 : 1;
      const newColor = group.length > 0 ? group[group.length - 1].color : colors[index].color;  // Assuming 'colors' is defined elsewhere
      const newNumber = group.length > 0 ? group[group.length - 1].number + 1 : 1;
    
      // Create the new player object
      const newPlayer = {
        id: newId,
        color: newColor,
        name: "",  // Assuming the name is initially empty
        number: newNumber,
      };
    
      // Return a new group array containing all old players plus the new one
      return [...group, newPlayer];
    }));
    
  };



const dragUpdateBidHandler = (id) => {

  setBids(prev => prev.map((group,index) => {
    // Calculate new values for the new bid
    const newId = group.length > 0 ? group[group.length - 1].id + 1 : 1;
    const newColor = group.length > 0 ? group[group.length - 1].color : colors[index].color; // Assuming 'colors' is defined elsewhere in your code
  
    // Create the new bid object
    const newBid = {
      id: newId,
      color: newColor,
      name: "", // Assuming name is always empty for new bids
    };
  
    // Return a new group array containing all old bids plus the new one
    return [...group, newBid];
  }));
  
};



const dragUpdateBallHandler = (id) => {
 

  setFootballs(prev => prev.map(group => {
    // Calculate new values for the new football
    const newId = group.length > 0 ? group[group.length - 1].id + 1 : 1;
    const newName = group.length > 0 ? `f0${newId}` : "f01";
    const newNumber = group.length > 0 ? group[group.length - 1].number + 1 : 1;
  
    // Create the new football object
    const newFootball = {
      id: newId,
      color: "#000000",
      name: newName,
      number: newNumber,
      img: football,
    };
  
    // Return a new group array containing all old footballs plus the new one
    return [...group, newFootball];
  }));
  
};

  useEffect(() => {
    if (updateSecFlag) {
      dragUpdateBallHandler();
      dragUpdateBidHandler();
      dragUpdateHandler();
      document.getElementById('cont').style.width = "";
      document.getElementById('curs').style.display = "flex";
      document.getElementById('line').style.display = "flex";
      document.getElementById('col').style.display = "flex";
      document.getElementById('btnSave').style.display = "flex";
      const plas = document.getElementsByClassName('pla');
      if (plas.length > 0) {
        for (let i = 0; i < plas.length; i++) {
          plas[i].style.display = "flex";
          plas[i].style.alignItems = "center";
          plas[i].style.justifyContent = "center";
        }
      }


      
      setUpdateSecFlag(false);
    }
  }, [updateSecFlag]); // Dependency array includes only updateFlag


  const container = document.getElementById('capture');

  

  return (
    <div className="bg-custom-primary w-screen h-screen flex justify-center items-center"   >
      <div className="flex flex-col justify-center items-center bg-custom-primary" id="dragContainer" ref={targetDivRef}>
          <div className="w-[1250px] p-5 relative bg-custom-primary " id="capture" >
            <DrawingCanvas drawMode={selectedShape.name} lineType = {selectedLineType.name} color = {selectedColor.color} />
              <img src={selectedField.img} alt="" className="object-cover"   />
          </div>


        <div className="flex gap-2 items-center justify-center w-full h-[50px] p-5 relative" >
          {players.map((group, idx) =>
            <div className=" h-24  w-11 flex justify-center items-center" key={idx}>
                {group.length > 0 && group.map((player, id) => (
                    <PlayerComponent
                        onDrag={() => dragHandler(idx)}
                        key={"P" + idx + " " + player.id}
                        color={player.color}
                        player_name={player.name}
                        player_number={player.number}
                        onRightClick = {handleContextMenu}
                        group = {idx}
                        position = {id}
                        container = {container}
                        />
                      ))}
            </div>
          )}

          {bids.map((group, idx) =>
            <div className="relative h-6 w-6 " key={idx}>
                {group.length > 0 && group.map((player, id) => (
                  <BidComponent
                  onDrag={() => dragBidHandler(idx)}
                  key={"B" + idx + " " + player.id}
                  color={player.color}
                  player_number={player.number}
                  onRightClick = {handleContextMenu}
                  group = {idx}
                  position = {id}
                  container = {container}
                    />
                ))}
            </div>
          )}  
          
          {footballs.map((item, id) => 
            <div className="relative h-10 w-[45px]" key={id}>
              {item.length > 0 && item.map((football, idx) => <FootBall container = {container} key={"F" + idx + ' ' + football.id} number = {football.number} onDrag={() => dragBallHandler(idx)} position={idx} img={football.img} onRightClick = {handleContextMenu}  />)}
            </div>
          )}

          <div className="flex gap-3 h-[50px]" id="cont">
            <div className="  flex flex-col group h-[200px] relative" id="curs"> 
              <ul className="hidden absolute bottom-full w-full group-hover:block bg-[rgba(0,0,0,.6)]">
                {shapes.map((item, index) => item.name !== selectedShape.name && <li key={index} className="hover:bg-[rgba(0,0,0,.7)] cursor-pointer flex justify-center py-4 px-2 " onClick={() => setSelectedShape({name: item.name, img:item.img})}><img className="h-10" src={item.img} /> </li>)}
              </ul>
              <div className="block cursor-pointer bg-[rgba(0,0,0,.6)] px-4 py-1"><img className="h-10" src={selectedShape.img} /></div>
            </div>

            <div className="  flex flex-col group h-[200px]  relative " id="line"> 
              <ul className="hidden absolute bottom-full w-full  group-hover:block bg-[rgba(0,0,0,.6)]">
                {lineTypes.map((item, index) => item.name !== selectedLineType.name && <li key={index} className="hover:bg-[rgba(0,0,0,.7)] cursor-pointer flex justify-center py-4 px-2 " onClick={() => setSelectedLineType({name: item.name, img:item.img})}><img className="h-10" src={item.img} /> </li>)}
              </ul>
              <div className="block cursor-pointer bg-[rgba(0,0,0,.6)] px-4 py-1"><img className="h-10" src={selectedLineType.img} /></div>
            </div>

            <div className="  flex flex-col group h-[200px] relative " id="col"> 
              <ul className="hidden absolute bottom-full w-full  group-hover:block bg-[rgba(0,0,0,.6)]">
                {colors.map((color, index) => color.color !== selectedColor.color && <li key={index} className="hover:bg-[rgba(0,0,0,.7)] cursor-pointer flex justify-center py-4 px-2 " 
                onClick={() => setSelectedColor({id: color.id, color:color.color})}><div className="h-10 w-10 rounded-full" style={{backgroundColor: color.color}} /> </li>)}
              </ul>
              <div className="block cursor-pointer bg-[rgba(0,0,0,.6)] px-4 py-1 "><div className="h-10 w-10 rounded-full" style={{backgroundColor: selectedColor.color}} /></div>
            </div>

            <div className="  flex flex-col group h-[200px] relative  " id="line"> 
              <ul className="hidden  absolute bottom-full w-full group-hover:block bg-[rgba(0,0,0,.6)]">
                {fields.map((field, index) => field.name !== selectedField.name && <li key={index} className="hover:bg-[rgba(0,0,0,.7)] cursor-pointer flex justify-center py-4 px-2 " onClick={() => setSelectedField({name: field.name, img:field.img})}><img className="h-10" src={field.img} /> </li>)}
              </ul>
              <div className="block cursor-pointer bg-[rgba(0,0,0,.6)] px-4 py-1  "><img className="h-10" src={selectedField.img} /></div>
            </div>


          

            <div className="  flex flex-col group h-[200px]  "> 
              <button onClick={saveAsImage} className="btn btn-primary " id="btnSave">Save as PNG</button>
            </div>
          </div>

          

  
        </div>
      </div>
     {selectedPlayerDetails !== null && objType === "player" && <ContextMenuComponent visible={menuVisible} x={menuPosition.x} y={menuPosition.y} setObjs={setPlayers} setSelectedPlayerDetails = {setSelectedPlayerDetails} selectedPlayerDetails={selectedPlayerDetails} objs={players} />}
     {selectedPlayerDetails !== null && objType === "bid" && <ContextMenuComponent visible={menuVisible} x={menuPosition.x} y={menuPosition.y} setObjs={setBids} setSelectedPlayerDetails = {setSelectedPlayerDetails} selectedPlayerDetails={selectedPlayerDetails} objs={bids} />}
     {selectedPlayerDetails !== null && objType === "ball" && <ContextMenuComponent visible={menuVisible} x={menuPosition.x} y={menuPosition.y} setObjs={setFootballs} setSelectedPlayerDetails = {setSelectedPlayerDetails} selectedPlayerDetails={selectedPlayerDetails} objs={footballs} />}
    </div>
  );
};
export default HomePage