// material-ui

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 *
 */

import logo from 'assets/logo/logo.svg';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Berry" width="100" />
     *
     */

    <img src={logo} alt="MonBudget" width="150" />
  );
};

export default Logo;
