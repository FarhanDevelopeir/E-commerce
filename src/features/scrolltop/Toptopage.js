import React, { Component, useEffect, useState } from 'react';


function Toptopage() {
    const [isbutton, setisbutton]= useState(false);
  const handleScrollToTop = () => {
    // Smooth scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Adjust the threshold as needed (e.g., 200)
      if (scrollY > 200) {
        setisbutton(true);
      } else {
        setisbutton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
    //   window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
    return (
        isbutton && (
            <button className="scroll-to-top-button" onClick={handleScrollToTop}>
              <span>&uarr;</span>
            </button>
          )
    //   <button className="scroll-to-top-button" onClick={handleScrollToTop}>
    //     <span>&uarr;</span>
    //   </button>
    );
  }


export default Toptopage;
