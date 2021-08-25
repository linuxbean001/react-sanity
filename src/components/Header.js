import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../assets/css/style.css';

function Header() {
   const [sidebar, setSidebar] = useState(false);

   const showSidebar = () => setSidebar(!sidebar);

  return (
   <Container className=" mt-5 mb-2">
      <Row>
         <Col className="Nav">
            <nav className="Nav">
               <Link className="" to="/"><img src="https://www.arcadeagroup.com/logo.svg" alt="Arcadea Group"/></Link>
            </nav>
            <Link to="#" className="Nav__hamburger" onClick={showSidebar}>
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="Nav__hamburger__open">
                     <path d="M3 11L13 11" stroke="#221F1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                     <path d="M3 5L13 5" stroke="#221F1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
               </Link>
            <div className={sidebar ? 'navi active' : 'navi'}>  
               <div className="navi " onClick={showSidebar}>
                  <Link className="navigation" to="#">Philosophy</Link>
                  <Link className="navigation" to="#">Perspectives</Link>
                  <Link className="navigation" to="#">People</Link>
                  <Link className="navigation" to="#">Blog</Link>
                  <Link className="navigation" to="mailto:info@arcadeagroup.com">
                     Contact
                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.66669 11.3333L11.3334 4.66663" stroke="#221F1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M4.66669 4.66663H11.3334V11.3333" stroke="#221F1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                     </svg>
                  </Link>
               </div>
            </div>
         </Col>
      </Row>
   </Container>
  );
}

export default Header;
