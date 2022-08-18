import React from 'react';

const Footer = () => {
  const style = {
    backgroundColor: 'black',
    borderTop: '1px solid #E7E7E7',
    textAlign: 'center',
    padding: '20px',
    // position: 'fixed',
    // left: '0',
    // bottom: '0',
    height: '60px',
    width: '100%',
    color: 'white',
  };
  return (
    <footer className="d-flex flex-column h-100">
      <div style={style}>&copy; {new Date().getFullYear()}</div>
    </footer>
  );
};

export default Footer;
