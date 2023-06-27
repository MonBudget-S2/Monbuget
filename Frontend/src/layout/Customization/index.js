import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui

import { SET_BORDER_RADIUS, SET_FONT_FAMILY } from 'store/actions';

// ==============================|| LIVE CUSTOMIZATION ||============================== //

const Customization = () => {
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);

  // state - border radius
  const [borderRadius] = useState(customization.borderRadius);
 

  useEffect(() => {
    dispatch({ type: SET_BORDER_RADIUS, borderRadius });
  }, [dispatch, borderRadius]);

  let initialFont;
  switch (customization.fontFamily) {
    case `'Inter', sans-serif`:
      initialFont = 'Inter';
      break;
    case `'Poppins', sans-serif`:
      initialFont = 'Poppins';
      break;
    case `'Roboto', sans-serif`:
    default:
      initialFont = 'Poppins';
      break;
  }

  // state - font family
  const [fontFamily] = useState(initialFont);
  useEffect(() => {
    let newFont = `'Poppins', sans-serif`;
    
    dispatch({ type: SET_FONT_FAMILY, fontFamily: newFont });
  }, [dispatch, fontFamily]);

  return (
    <>
    </>
  );
};

export default Customization;
