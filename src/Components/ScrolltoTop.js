import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ScrollToTopOnNavigate() {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top of the page when a navigation occurs
    const unlisten = navigate(() => {
      window.scrollTo(0, 0);
    });

    // Cleanup the listener when the component unmounts
    return unlisten;
  }, [navigate]);
  return null; // This component doesn't render anything
}

export default ScrollToTopOnNavigate;
