import React, { useEffect } from 'react';

const LobbyRoom = ({
  roomName,
  display,
  userList,
  hostStatus,
  hostFunc,
  username,
  onClick,
}) => {
  useEffect(() => {
    if (display === 'flex') {
      console.log(username);
      if (userList.length === 1) {
        hostFunc(true);
        console.log(hostStatus);
      } else if (userList.length > 1 && username === userList[0]) {
        hostFunc(true);
        console.log(hostStatus);
      } else {
        console.log(hostStatus);
      }
    }
  }, [display, userList]);

<<<<<<< HEAD
    const displayAllUsers = userList.map(username => {
        return <li key={newKeyGenerator()}>{username}</li>
    })
    

    return (
        <div style={{display: display, flexDirection: "column", minHeight: "calc(100vh - 105px)", alignItems: "center", justifyContent: "center"}}>
            <h2>Welcome to {roomName}</h2>
            <div style={{display: "flex", flexDirection: "column", border: "1px solid black", alignItems: "center", margin: "2rem 0", borderRadius: "10px"}}>
                <ul style={{listStyle: "none", padding: "2rem"}}>
                    <li style={{textDecoration: "underline"}}>UserList:</li>
                    {displayAllUsers}
                </ul>
            </div>

            { hostStatus ? <button style={{maxWidth: "150px"}}>Start Game</button> : console.log("")}
            
        </div>
    );
}
=======
  function newKeyGenerator() {
    let newKey = '';
    for (let i = 0; i <= 24; i++) {
      let newNum = Math.floor(Math.random() * 10);
      newKey += newNum;
    }
    return newKey;
  }

  const displayAllUsers = userList.map((username) => {
    return <li key={newKeyGenerator()}>{username}</li>;
  });

  return (
    <div style={{ display: display, flexDirection: 'column' }}>
      <h2>Welcome to {roomName}</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ul style={{ listStyle: 'none' }}>{displayAllUsers}</ul>
      </div>

      {hostStatus ? (
        <button onClick={onClick} style={{ maxWidth: '150px' }}>
          Start Game
        </button>
      ) : (
        console.log('')
      )}
    </div>
  );
};
>>>>>>> a4d702d0779ea3d70d93a8751496d8fea05a111a

export default LobbyRoom;
