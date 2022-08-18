import React, { useState } from 'react';

const RoomCheckBox = ({room}) => {

    const [ checked, setChecked ] = useState(false);

    function checkBox() {
        // if (!checked) {
        //     setChecked(true)
        // } else {
        //     setChecked(false)
        // }

        let newChecked = checked;
        newChecked = !newChecked;
        setChecked(newChecked);
    }

    function newKeyGenerator() {
        let newKey = '';
        for (let i = 0; i <= 24; i++) {
            let newNumberForKey = Math.floor(Math.random() * 10);
            newKey += newNumberForKey;
        }
        return newKey;
    }

    const addKey = newKeyGenerator();

    return (
        <div>
           <input id={addKey} type="checkbox" checked={checked} className="room-checkbox form-check-input" onChange={checkBox}/>
            <label  htmlFor={addKey} className="room-checkbox-label">{room}</label>  
        </div>
               
        
        
    );
}

export default RoomCheckBox;
