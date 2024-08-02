import { useState } from "react";

const ContextMenuComponent = ({
  x,
  y,
  visible,
  selectedPlayerDetails,
  objs,
  setObjs,
  setSelectedPlayerDetails,
}) => {


  const [playerDetails, setPlayerDetails] = useState({
    id: objs[selectedPlayerDetails.group][selectedPlayerDetails.id],
    color:
      objs[selectedPlayerDetails.group][selectedPlayerDetails.position]
        .color,
    name: objs[selectedPlayerDetails.group][selectedPlayerDetails.position]
      .name,
    number:
      objs[selectedPlayerDetails.group][selectedPlayerDetails.position]
        .number,
  });

  const colors = ["#ff0000", "#ffff00", "#0000ff", "#000000"];

  const handleNumberChange = (e, player_num, flag) => {
    if (e.keyCode === 13 || flag) {
      setObjs((currentObjs) => {
        if (
          currentObjs[selectedPlayerDetails.group] &&
          currentObjs[selectedPlayerDetails.group][
            selectedPlayerDetails.position
          ]
        ) {
          let newObjs = [...currentObjs];
          let newGroup = [...newObjs[selectedPlayerDetails.group]];
          newGroup[selectedPlayerDetails.position] = {
            ...newGroup[selectedPlayerDetails.position],
            number: player_num,
          };
          newObjs[selectedPlayerDetails.group] = newGroup;

          return newObjs;
        }
        return currentObjs;
      });
      // setSelectedPlayerDetails(null);
    }
  };

  const handleNameChange = (e, player_name, flag) => {
    if (e.keyCode === 13 || flag) {
      setObjs((currentObjs) => {
        if (
          currentObjs[selectedPlayerDetails.group] &&
          currentObjs[selectedPlayerDetails.group][
            selectedPlayerDetails.position
          ]
        ) {
          let newObjs = [...currentObjs];
          let newGroup = [...newObjs[selectedPlayerDetails.group]];
          newGroup[selectedPlayerDetails.position] = {
            ...newGroup[selectedPlayerDetails.position],
            name: player_name,
          };
          newObjs[selectedPlayerDetails.group] = newGroup;

          return newObjs;
        }
        return currentObjs;
      });
    //   setSelectedPlayerDetails(null);
    }
  };

  const handleColorChange = (color) => {
    setObjs((currentObjs) => {
      if (
        currentObjs[selectedPlayerDetails.group] &&
        currentObjs[selectedPlayerDetails.group][
          selectedPlayerDetails.position
        ]
      ) {
        let newObjs = [...currentObjs];
        let newGroup = [...newObjs[selectedPlayerDetails.group]];
        newGroup[selectedPlayerDetails.position] = {
          ...newGroup[selectedPlayerDetails.position],
          color: color,
        };
        newObjs[selectedPlayerDetails.group] = newGroup;

        return newObjs;
      }
      return currentObjs;
    });
    // setSelectedPlayerDetails(null);
  }

  const handleDeleteObj = () => {
    // console.log(selectedPlayerDetails )
    setObjs((currentObjs) => {
      if (
        currentObjs[selectedPlayerDetails.group] &&
        currentObjs[selectedPlayerDetails.group][selectedPlayerDetails.position]
      ) {
        let newObjs = [...currentObjs];
        let newGroup = [...newObjs[selectedPlayerDetails.group]];
  
        newGroup.splice(selectedPlayerDetails.position, 1);

      
  
        newObjs[selectedPlayerDetails.group] = newGroup;
  
        return newObjs;
      }
      return currentObjs;
    });
  
    setSelectedPlayerDetails(null);
  }

  const handleSaveObj = (e) => {

    handleNameChange(e, playerDetails.name, true);
    handleNumberChange(e, playerDetails.number, true);
    handleColorChange(playerDetails.color);
    setSelectedPlayerDetails(null);
  };

  // console.log(selectedPlayerDetails)
  

  const elem =  (
    <ul className="input-class flex flex-col gap-3">
      {selectedPlayerDetails.type === "player" && (<><li>
        <input
          type="number"
          min={0}
          max={40}
          name="player_num"
          value={playerDetails.number}
          onChange={(event) =>
            setPlayerDetails((prev) => ({
              ...prev,
              number: event.target.value,
            }))
          }
          className="input-class w-full bg-transparent border-2 border-custom-gray h-9 rounded-lg px-2"
          onClick={(e) => e.preventDefault()}
          onKeyDown={(e) => handleNumberChange(e, playerDetails.number, false)}
        />
      </li>
      <li>
        <input
          type="text"
          name="player_name"
          value={playerDetails.name}
          onChange={(event) =>
            setPlayerDetails((prev) => ({
              ...prev,
              name: event.target.value,
            }))
          }
          className="input-class w-full bg-transparent border-2 border-custom-gray h-9 rounded-lg px-2"
          onClick={(e) => e.preventDefault()}
          onKeyDown={(e) => handleNameChange(e, playerDetails.name, false)}
        />
      </li></>)}

      {(selectedPlayerDetails.type === "player" || selectedPlayerDetails.type === "bid") && (<li className="flex justify-center items-center w-full gap-3">
        {colors.map((color, idx) => (
          <div key={idx} className={`${
            objs[selectedPlayerDetails.group][
              selectedPlayerDetails.position
            ].color === color && "border-[3px] border-[#828282] "
          }  rounded-full flex justify-center items-center  w-[25.3px] h-[26.2px] cursor-pointer`}>
              <div
              style={{ backgroundColor: color }}
              className={`text-center rounded-full w-[16px] h-[16.45px]`}
              onClick={() => handleColorChange(color)}
            ></div>
          </div>
        ))}
      </li>)}

      <li>
        <button className="flex justify-center items-center bg-[#000] border-none text-white mx-auto mt-2 w-full" onClick={handleDeleteObj}>Delete</button>
      </li>
      {selectedPlayerDetails.type === "player" &&  <li>
        <button className="flex justify-center items-center bg-[#006400] border-none text-white mx-auto mt-2 w-full" onClick={handleSaveObj}>Save</button>
      </li>}
    </ul>
  );

  return (
    <>
      {visible && (
        <div
          style={{
            position: "absolute",
            left: x - 30 + "px",
            top: y + 30 + "px",
          }}
          className="absolute shadow-lg bg-custom-white text-custom-black z-[10000000] w-[200px] p-4"
        >
          {elem}
        </div>
      )}
    </>
  );
};

export default ContextMenuComponent;
