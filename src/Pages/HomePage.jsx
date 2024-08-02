import { useCallback, useEffect, useRef, useState } from "react";
import PlayerComponent from "../Components/PlayerComponent";

import football_pitch from "../assets/images/football-field.png";
import football_ball from "../assets/images/football.png";
import lacrosse_pitch from "../assets/images/lacrosse-women.png";
import lacrosse_ball from "../assets/images/lacrosse-ball.png";
import icehockey_pitch from "../assets/images/icehockey.png";
import icehockey_ball from "../assets/images/icehockey-ball.png";
import netball_pitch from "../assets/images/netball.png";
import netball_ball from "../assets/images/net-ball.png";
import futsal_pitch from "../assets/images/futsal.png";
import futsal_ball from "../assets/images/futsal-ball.png";
import floorball_pitch from "../assets/images/floorball.png";
import floorball_ball from "../assets/images/floor-ball.png";
import basketball_pitch from "../assets/images/basketball.png";
import basketball_ball from "../assets/images/basket-ball.png";
import americanfootball_pitch from "../assets/images/americanfootball.png";
import americanfootball_ball from "../assets/images/american-ball.png";
import saveIcon from "../assets/images/save.png"
import ContextMenuComponent from "../Components/ContextMenuComponent";
import football from "../assets/images/football.png"
import FootBall from "../Components/FootBall";
import BidComponent from "../Components/BidComponent";
import DrawingCanvas from "../Components/DrawingCanvas";
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image-more';
import useShapesStore from "../store/shapesStore";
import { FaArrowCircleDown, FaRegSave } from "react-icons/fa";


const HomePage = () => {
  
  // const [menuVisible, setMenuVisible] = useState(false);
  // const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedPlayerDetails, setSelectedPlayerDetails] = useState(null);
  const [objType, setObjType] = useState(null);
  const {
    shapesMenu, lineTypes,
    setSelectedShape, setSelectedLineType, 
    selectedShape, selectedLineType,
    setSelectedColor, selectedColor,
    menuVisible, setMenuVisible,
    menuPosition, setMenuPosition,
    colors
  } = useShapesStore();
  
  
  

  

  
  

  const [fields, setFields] = useState([{name: "football_pitch", img: football_pitch, ball_img: football_ball},
    {name: "lacrosse_pitch", img: lacrosse_pitch, ball_img: lacrosse_ball},
    {name: "icehockey_pitch", img: icehockey_pitch, ball_img: icehockey_ball},
    {name: "netball_pitch", img: netball_pitch, ball_img: netball_ball},
    {name: "futsal_pitch", img: futsal_pitch, ball_img: futsal_ball},
    {name: "floorball_pitch", img: floorball_pitch, ball_img: floorball_ball},
    {name: "basketball_pitch", img: basketball_pitch, ball_img: basketball_ball},
    {name: "americanfootball_pitch", img: americanfootball_pitch, ball_img: americanfootball_ball}]);

  const [selectedField, setSelectedField] = useState({...fields[0], mbImg: ""});
  
 
  
  const rotateImage = useCallback((imageSrc, callback) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.height;
      canvas.height = img.width;
      const ctx = canvas.getContext('2d');
      ctx.rotate(90 * Math.PI / 180);
      ctx.drawImage(img, 0, -img.height);
      const newImageSrc = canvas.toDataURL();
      callback(newImageSrc);
    };
    img.src = imageSrc;
  }, []);


  useEffect(() => {
    rotateImage(selectedField.img, (newImageSrc) => {
      setSelectedField((prev) => ({...prev, mbImg: newImageSrc}))
    });
  },[selectedField.mbImg])

  
  
  
  
  
  useEffect(() => {
    setSelectedShape(shapesMenu[shapesMenu.length - 1]);
    setSelectedLineType(lineTypes[0]);
    setSelectedColor(colors[0]);

  }, [fields])
  
  // console.log(fields)
  
  
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
  
  
  
  const [footballs, setFootballs] = useState([
    [{ id: 1, color: "#000000", name: 'f01', img: football, number: 1}],
  ]);


  const [updateFlag, setUpdateFlag] = useState(false);
  const [updateMbFlag, setUpdateMbFlag] = useState(false);
  const [updateSecFlag, setUpdateSecFlag] = useState(false);
  const [updateSecMbFlag, setUpdateSecMbFlag] = useState(false);
  
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
      id: footballs[0][footballs[0].length - 1].id + 1,
      color: "#000000",
      name: "f" + "0" + (footballs[0][footballs[0].length - 1].id + 1),
      img: selectedField.ball_img,
      number: footballs[0][footballs[0].length - 1].number + 1
    };
    
    
    setFootballs((prev) => [...prev.map((group, idx) => idx === 0 ? [...group, ball] : [...group])]);
  };

  // console.log(footballs)
  
  
  const handleContextMenu = (event, group, position, type, mbFlag) => {
    event.preventDefault();
    if (event.button === 2 || mbFlag) { // Check if the event is a right-click
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

    

    document.getElementById('cont').style.width = "450px";
    document.getElementById('curs').style.display = "none";
    document.getElementById('line').style.display = "none";
    document.getElementById('field').style.display = "none";
    document.getElementById('col').style.display = "none";
    document.getElementById('mb-menu').style.display = "none";
    document.getElementById('btnSave').style.display = "none";
    document.getElementById('mobileField').style.display = "none";
    
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

  const saveAsImageMb = () => {
   
    

    document.getElementById('mb-menu').style.display = "none";
   
    
    const plas = document.getElementsByClassName('pla');
    const pname = document.getElementsByClassName('pname');
    if (plas.length > 0) {
      for (let i = 0; i < plas.length; i++) {
        // plas[i].style.display = "block";
        // plas[i].style.alignItems = "";
        // plas[i].style.justifyContent = "";
        plas[i].style.paddingBottom = "12px";
        if(pname.length > 0 && i < pname.length ) {

          pname[i].style.marginBottom = "2px";
        }
        plas[i].style.marginBottom = "2px";
      }
    }


    setUpdateMbFlag(true); // Set the flag to trigger useEffect
  };

  useEffect(() => {
    if (updateFlag) {
      // Only run html2canvas if the update flag is true
      html2canvas(targetDivRef.current)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = 'tactical-board.png';
          link.href = imgData;
          link.click();
          setUpdateFlag(false); // Reset the flag after processing
          setUpdateSecFlag(true);
          
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [updateFlag]); // Dependency array includes only updateFlag

  useEffect(() => {
    if (updateMbFlag) {
      // Only run html2canvas if the update flag is true
      html2canvas(targetDivRef.current)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = 'tactical-board.png';
          link.href = imgData;
          link.click();
          setUpdateMbFlag(false)
          setUpdateSecMbFlag(true)
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [updateMbFlag]); // Dependency array includes only updateFlag

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
      document.getElementById('field').style.display = "flex";
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
  }, [updateSecFlag]); 

  useEffect(() => {
    
    if (updateSecMbFlag) {
      
    
      document.getElementById('mb-menu').style.display = "flex";
     
      
      const plas = document.getElementsByClassName('pla');
      const pname = document.getElementsByClassName('pname');
      if (plas.length > 0) {
        for (let i = 0; i < plas.length; i++) {
          // plas[i].style.display = "flex";
          // plas[i].style.alignItems = "center";
          // plas[i].style.justifyContent = "center";
          plas[i].style.paddingBottom = "0";
          if(pname.length > 0 && i < pname.length) {
            pname[i].style.marginBottom = "0";
          }
          plas[i].style.marginBottom = "0";
        }
      }


      
      setUpdateSecMbFlag(false);
    }
  }, [updateSecMbFlag]); 


  const container = document.getElementById('capture');

  // console.log(selectedColor.color)

  const [mobileMenu, setMobileMenu] = useState(true);

  


  return (
    <div className="bg-custom-primary w-screen h-screen flex justify-center items-center "   >
      
      
      <div className="lg:flex lg:flex-col lg:justify-center items-center bg-custom-primary   " id="dragContainer" ref={targetDivRef}>
        <div className="h-[100vh] w-[100vw] lg:h-[70vh] lg:w-[1250px] lg:p-5 lg:relative bg-custom-primary  " id="capture">
          <DrawingCanvas drawMode={selectedShape.name} lineType={selectedLineType.name} color={selectedColor.color} />
          {selectedField.mbImg !== "" && selectedField.mbImg !== undefined && <img id="mobileField" src={selectedField.mbImg} alt="Rotated Image" className="lg:h-full lg:w-full lg:static block lg:hidden " />}
          <img src={selectedField.img} alt="Rotated Image" className="lg:h-full lg:w-full lg:static hidden lg:block" />
  
        </div>




        

        <div className="hidden lg:flex gap-2 items-center justify-center w-full h-[50px] p-5 relative   " >
          {players.map((group, idx) =>
            <div className=" relative h-[125px]  w-11 min-w-11  flex justify-center items-center " key={idx}>
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
            <div className="relative  h-[65px] w-6 " key={idx}>
                {group.length > 0 && group.map((bid, id) => (
                  <BidComponent
                  onDrag={() => dragBidHandler(idx)}
                  key={"B" + idx + " " + bid.id}
                  color={bid.color}
                  player_number={bid.number}
                  onRightClick = {handleContextMenu}
                  group = {idx}
                  position = {id}
                  container = {container}
                    />
                ))}
            </div>
          )}  
          
          {footballs.map((item, idx) => 
            <div className="relative h-[85px] w-[45px] " key={idx}>
              {item.length > 0 && item.map((football, id) => <FootBall container = {container} key={"F" + idx + ' ' + football.id} number = {football.number} onDrag={() => dragBallHandler(idx)} position={id} group = {idx} img={selectedField.ball_img} onRightClick = {handleContextMenu}  />)}
            </div>
          )}

          

          <div className="flex flex-row gap-3 h-[50px] w-[450px]  " id="cont">
            <div className="  flex flex-col group h-full relative " id="curs"> 
              <ul className="hidden absolute bottom-full w-full group-hover:block bg-[rgba(0,0,0,.6)]">
                {shapesMenu.map((item, index) => item.name !== selectedShape.name && <li key={index} className="hover:bg-[rgba(0,0,0,.7)] cursor-pointer flex justify-center py-2 px-1 lg:py-4 lg:px-2 " onClick={() => setSelectedShape({name: item.name, img:item.img})}><img className="h-6 w-20 lg:w-auto lg:h-10" src={item.img} /> </li>)}
              </ul>
              <div className="block cursor-pointer bg-[rgba(0,0,0,.6)] px-1 lg:px-4 py-1"><img className="h-6 w-20 lg:w-auto lg:h-10" src={selectedShape.img} /></div>
            </div>

            <div className="  flex flex-col group h-full relative " id="line"> 
              <ul className="hidden absolute bottom-full w-full  group-hover:block bg-[rgba(0,0,0,.6)]">
                {lineTypes.map((item, index) => item.name !== selectedLineType.name && <li key={index} className="hover:bg-[rgba(0,0,0,.7)] cursor-pointer flex justify-center py-2 px-1 lg:py-4 lg:px-2 " onClick={() => setSelectedLineType({name: item.name, img:item.img})}><img className="h-6 w-20 lg:w-auto lg:h-10" src={item.img} /> </li>)}
              </ul>
              <div className="block cursor-pointer bg-[rgba(0,0,0,.6)] px-1 lg:px-4 py-1"><img className="h-6 w-20 lg:w-auto lg:h-10" src={selectedLineType.img} /></div>
            </div>

            <div className="  flex flex-col group h-full relative " id="col"> 
              <ul className="hidden absolute bottom-full w-full  group-hover:block bg-[rgba(0,0,0,.6)]">
                {colors.map((color, index) => color.color !== selectedColor.color && <li key={index} className="hover:bg-[rgba(0,0,0,.7)] cursor-pointer flex justify-center py-2 px-1 lg:py-4 lg:px-2 " 
                onClick={() => setSelectedColor({id: color.id, color:color.color})}><div className="h-6 w-6 lg:h-10 lg:w-10 rounded-full" style={{backgroundColor: color.color}} /> </li>)}
              </ul>
              <div className="block cursor-pointer bg-[rgba(0,0,0,.6)] px-1 lg:px-4 py-1 "><div className="h-6 w-6 lg:h-10 lg:w-10 rounded-full" style={{backgroundColor: selectedColor.color}} /></div>
            </div>

            <div className="  flex flex-col group h-ful relative  " id="field"> 
              <ul className="hidden  absolute bottom-full w-full group-hover:block bg-[rgba(0,0,0,.6)]">
                { fields.map((field, index) => field.name !== selectedField.name && <li key={index} className="hover:bg-[rgba(0,0,0,.7)] cursor-pointer flex justify-center py-2 px-1 lg:py-4 lg:px-2 " onClick={() => setSelectedField({name: field.name, img:field.img, ball_img: field.ball_img})}><img className="w-28 h-6 lg:h-10 lg:w-auto" src={field.img} /> </li>)}
              </ul>
              <div className="block cursor-pointer bg-[rgba(0,0,0,.6)] px-1 lg:px-4 py-1  "><img className="w-28 h-6 lg:h-10 lg:w-auto" src={selectedField.img} /></div>
            </div>


          

              <button onClick={() => {saveAsImage();}} className="btn btn-primary w-20 h-9 hidden lg:flex justify-center lg:h-12 lg:w-auto" id="btnSave">
                {/* <img className="object-cover w-4 h-4 lg:h-9 lg:pb-2 lg:w-auto" src={saveIcon} alt="" /> */}
                <FaRegSave size={30} className="hidden lg:block " />
              </button>
              
          </div>

          

  
        </div>


        



        <div onClick={() => setMobileMenu(prev => !prev)} id="mb-menu" className={`absolute bg-[#fff] transition-all right-3 duration-500 ${mobileMenu ? "bottom-[135px] rotate-0" : "bottom-0 rotate-180"} z-40 flex justify-center items-center h-6 w-6 rounded-full  lg:hidden`}>
          <FaArrowCircleDown size={24}  className="  text-[#000]"/>
      
        </div>
        <div className= {`flex lg:hidden gap-2 flex-col transition-all duration-500 lg:flex-row items-center lg:justify-center w-full bottom-0 bg-[#fff] lg:bg-transparent h-[150px] lg:h-[50px]  ${mobileMenu ?  "p-5 bottom-[0px]" : "bottom-[-170px]  p-0  lg:bottom-0"} lg:p-0 absolute lg:relative  `} >
          <div className="flex items-center gap-4 ">
            {players.map((group, idx) =>
              <div className="h-14 lg:h-24 w-6 lg:w-11  flex justify-center items-center " key={idx}>
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
                          mobileMenu = {mobileMenu}
                      />
                    ))}
              </div>
            )}

            {bids.map((group, idx) =>
              <div className="relative h-5 w-3 lg:h-6 lg:w-6 " key={idx}>
                  {group.length > 0 && group.map((bid, id) => (
                    <BidComponent
                      onDrag={() => dragBidHandler(idx)}
                      key={"B" + idx + " " + bid.id}
                      color={bid.color}
                      player_number={bid.number}
                      onRightClick = {handleContextMenu}
                      group = {idx}
                      position = {id}
                      container = {container}
                      mobileMenu = {mobileMenu}
                    />
                  ))}
              </div>
            )}  
            
            {footballs.map((item, idx) => 
              <div className="relative  h-11 lg:h-10 w-[45px]" key={idx}>
                {item.length > 0 && item.map((football, id) => <FootBall mobileMenu = {mobileMenu} container = {container} key={"F" + idx + ' ' + football.id} number = {football.number} onDrag={() => dragBallHandler(idx)} position={id} group = {idx} img={selectedField.ball_img} onRightClick = {handleContextMenu}  />)}
              </div>
            )}
          </div>

          <div className="flex flex-row gap-3 h-[50px] " id="cont">
            <div className="  flex flex-col group h-full relative " id="curs"> 
              <ul className="hidden absolute bottom-full w-full group-hover:block bg-[rgba(0,0,0,.6)]">
                {shapesMenu.map((item, index) => item.name !== selectedShape.name && <li key={index} className="hover:bg-[rgba(0,0,0,.7)] cursor-pointer flex justify-center py-2 px-1 lg:py-4 lg:px-2 " onClick={() => setSelectedShape({name: item.name, img:item.img})}><img className="h-6 w-20 lg:w-auto lg:h-10" src={item.img} /> </li>)}
              </ul>
              <div className="block cursor-pointer bg-[rgba(0,0,0,.6)] px-1 lg:px-4 py-1"><img className="h-6 w-20 lg:w-auto lg:h-10" src={selectedShape.img} /></div>
            </div>

            <div className="  flex flex-col group h-full relative " id="line"> 
              <ul className="hidden absolute bottom-full w-full  group-hover:block bg-[rgba(0,0,0,.6)]">
                {lineTypes.map((item, index) => item.name !== selectedLineType.name && <li key={index} className="hover:bg-[rgba(0,0,0,.7)] cursor-pointer flex justify-center py-2 px-1 lg:py-4 lg:px-2 " onClick={() => setSelectedLineType({name: item.name, img:item.img})}><img className="h-6 w-20 lg:w-auto lg:h-10" src={item.img} /> </li>)}
              </ul>
              <div className="block cursor-pointer bg-[rgba(0,0,0,.6)] px-1 lg:px-4 py-1"><img className="h-6 w-20 lg:w-auto lg:h-10" src={selectedLineType.img} /></div>
            </div>

            <div className="  flex flex-col group h-full relative " id="col"> 
              <ul className="hidden absolute bottom-full w-full  group-hover:block bg-[rgba(0,0,0,.6)]">
                {colors.map((color, index) => color.color !== selectedColor.color && <li key={index} className="hover:bg-[rgba(0,0,0,.7)] cursor-pointer flex justify-center py-2 px-1 lg:py-4 lg:px-2 " 
                onClick={() => setSelectedColor({id: color.id, color:color.color})}><div className="h-6 w-6 lg:h-10 lg:w-10 rounded-full" style={{backgroundColor: color.color}} /> </li>)}
              </ul>
              <div className="block cursor-pointer bg-[rgba(0,0,0,.6)] px-1 lg:px-4 py-1 "><div className="h-6 w-6 lg:h-10 lg:w-10 rounded-full" style={{backgroundColor: selectedColor.color}} /></div>
            </div>

            <div className="  flex flex-col group h-ful relative  " id="field"> 
              <ul className="hidden  absolute bottom-full w-full group-hover:block bg-[rgba(0,0,0,.6)]">
                { fields.map((field, index) => field.name !== selectedField.name && <li key={index} className="hover:bg-[rgba(0,0,0,.7)] cursor-pointer flex justify-center py-2 px-1 lg:py-4 lg:px-2 " onClick={() => setSelectedField({name: field.name, img:field.img, ball_img: field.ball_img})}><img className="w-28 h-6 lg:h-10 lg:w-auto" src={field.img} /> </li>)}
              </ul>
              <div className="block cursor-pointer bg-[rgba(0,0,0,.6)] px-1 lg:px-4 py-1  "><img className="w-28 h-6 lg:h-10 lg:w-auto" src={selectedField.img} /></div>
            </div>


          

            {/* <div className="  flex flex-col group  h-[200px]  ">  */}
              <button onClick={() => {saveAsImage();}} className="btn btn-primary w-20 h-9 hidden lg:flex justify-center lg:h-12 lg:w-auto" id="btnSave">
                {/* <img className="object-cover w-4 h-4 lg:h-9 lg:pb-2 lg:w-auto" src={saveIcon} alt="" /> */}
                <FaRegSave size={30} className="hidden lg:block " />
              </button>
              <button onClick={() => {setMobileMenu(prev => !prev); saveAsImageMb();}} className="btn btn-primary w-20 h-9 flex lg:hidden justify-center lg:h-12 lg:w-auto" id="btnSave">
                {/* <img className="object-cover w-4 h-4 lg:h-9 lg:pb-2 lg:w-auto" src={saveIcon} alt="" /> */}
                <FaRegSave size={22} className="-mt-[4px] lg:mt-0 block lg:hidden" />
              </button>
            {/* </div> */}
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