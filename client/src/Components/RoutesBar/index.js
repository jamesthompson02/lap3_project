import React from 'react';
import { Nav, Navbar, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RoutesBar = () => {
  // const back = useNavigate();
  // const handleBackButton = () => {
  //   back(-1);
  // };
  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      bg="dark"
      variant="dark"
      data-testid="navBar"
    >
      <Navbar.Toggle
        aria-controls="navbarScroll"
        data-bs-target="#navbarScroll"
      />
      <Navbar.Collapse id="navbarScroll">
        <Nav>
          <NavLink eventKey="1" as={Link} to="/">
            Home
          </NavLink>
          <NavLink eventKey="2" as={Link} to="/about">
            About
          </NavLink>
          <NavLink eventKey="3" as={Link} to="/quiz">
            Quiz
          </NavLink>
          <NavLink eventKey="4" as={Link} to="/leaderboard">
            LeaderBoard
          </NavLink>
          <NavLink eventKey="5" as={Link} to="/quiz-categories">
            QuizCategories
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default RoutesBar;
