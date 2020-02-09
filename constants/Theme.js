/*
 * ============================================
 * Main Theme
 * ============================================
 * Description: Handles all the available theming variables
 * for use with Styled Components and ThemeProvider (via Context API)
 * More info: https://www.styled-components.com/docs/advanced#theming
 */

/*
 * ============================================
 * Typography
 * ============================================
 */

const fontRegular = `
  font-family: space-mono;
  font-size: 14px;
  font-weight: normal;
`;

const fontMedium = `
  font-family: space-mono;
  font-size: 14px;
  font-weight: normal;
`;

const fontBold = `
  font-family: space-mono;
  font-size: 14px;
  font-weight: normal;
`;

/*
 * ============================================
 * Main Defaults
 * ============================================
 * Description: App-wide default variables, consistent with all themes
 */

const defaultTheme = {
  animations: {
    ease: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
    speed: '0.3s'
  },
  spacing: {
    bumper: 15,
    s: 10,
    sm: 20,
    m: 40,
    l: 50,
    xl: 75,
    xxl: 100
  },
  buttons: {
    full: `
      padding: 18px 0;
      width: 100%;
    `,
    block: `
      padding: 15px 40px;
      font-size: 12px;
      width: auto;
    `,
    outline: `
      background-color: transparent;
      border-width: 1px;
    `
  },
  inputs: {
    full: `
      padding: 0 15px;
      border-radius: 30px;
      height: 43px;
      width: 100%;
    `
  },
  variables: {
    borderRadius: 20,
    borderRadiusSmall: 6,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
    buttonShadow: {
      // Spread operator
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.1,
      shadowRadius: 2
    }
  },
  typography: {
    body: `
      ${fontRegular};
      line-height: 20px;
    `,
    bodyLarge: `
      ${fontRegular};
      line-height: 25px;
      font-size: 16px;
    `,
    bodySmall: `
      ${fontRegular};
      font-size: 15px;
    `,
    title: `
      ${fontBold};
      font-size: 30px;
    `,
    titleSmall: `
      ${fontBold};
      font-size: 20px;
    `,
    badge: `
      ${fontBold};
      font-size: 11px;
    `,
    u1: `
      ${fontRegular};
      font-size: 11px;
      text-transform: uppercase;
    `,
    u2: `
      ${fontRegular};
      font-size: 12px;
    `
  }
};

/*
 * ============================================
 * Default Colors
 * ============================================
 * Description: These colors are consistent on all themes
 */

const defaultColors = {
  white: '#FFFFFF',
  black: '#000000',
  base: '#f7f7f7',
  baseSecondary: '#dedede',
  danger: '#FF3850',
  dangerDark: '#E6001C'
};

/*
 * ============================================
 * Themes
 * ============================================
 * Description: This model is required to switch between themes dynamically with ThemeProvider
 * https://www.styled-components.com/docs/advanced#theming
 * Primary: Main accent color of the theme
 * Primary RGB: Used for elements that have transparency
 * Constrast: Contrasting color for text/other elements appearing over the primary color
 */

export default {
  ...defaultTheme,
  colors: {
    ...defaultColors,
    primary: '#3888ff',
    primaryRGB: '56, 136, 255',
    contrast: '#FFFFFF'
  }
};
