import { PARTNERSHIP_THEME_CODE } from '@constants';
import { OverrideToken } from 'antd/es/theme/interface';
import { AliasToken } from 'antd/es/theme/internal';

const themeTokenTN: Partial<AliasToken> = {
  colorPrimary: '#FAAD14',
  fontSize: 16,
  borderRadius: 2,
  wireframe: false,
  colorText: '#BFBFBF',
};

const componentTokenTN: OverrideToken = {
  Select: {
    colorBorder: '#1F1F1F',
    colorBgContainer: '#1F1F1F',
  },
};

const themeTokenTNClient: Partial<AliasToken> = {
  colorPrimary: '#FFCE0A',
  colorPrimaryText: 'black',
  fontSize: 16,
  borderRadius: 2,
  wireframe: false,
  colorText: '#BFBFBF',
  fontFamily: 'Roboto , sans-serif',
  'blue-6': '#1890FF',
};

const componentTokenTNClient: OverrideToken = {
  Select: {
    colorBorder: '#1F1F1F',
    colorBgContainer: '#1F1F1F',
  },
  Button: {
    colorTextLightSolid: '#000000',
    borderRadiusLG: 16,
  },
  Modal: {
    borderRadiusLG: 4,
  },
};

const themeTokenTP: Partial<AliasToken> = {
  colorPrimary: '#32D75A',
  // colorPrimaryText: 'black',
  fontSize: 16,
  borderRadius: 2,
  // // borderRadiusLG: 16,
  // // borderRadiusSM: 4,
  // // borderRadiusXS: 2,
  wireframe: false,
  colorText: '#BFBFBF',
  // fontFamily: 'Roboto ,sans-serif',
};

const componentTokenTPClient: OverrideToken = {
  Select: {
    colorBorder: '#1F1F1F',
    colorBgContainer: '#1F1F1F',
  },
  Button: {
    colorTextLightSolid: '#000000',
    borderRadiusLG: 16,
  },
  Modal: {
    borderRadiusLG: 4,
  },
};

const themeTokenTPClient: Partial<AliasToken> = {
  colorPrimary: '#32D75A',
  colorPrimaryText: 'black',
  fontSize: 16,
  borderRadius: 2,
  wireframe: false,
  colorText: '#BFBFBF',
  fontFamily: 'Roboto , sans-serif',
  'blue-6': '#1890FF',
};

const componentTokenTP: OverrideToken = {
  Select: {
    colorBorder: '#1F1F1F',
    colorBgContainer: '#1F1F1F',
  },
  Button: {
    colorTextLightSolid: '#000000',
  },
};

type TPartnerTheme = {
  themeToken: Partial<AliasToken>;
  componentToken: OverrideToken;
};

const themeObj: Record<string, TPartnerTheme> = {
  'thuy-nga': {
    themeToken: themeTokenTN,
    componentToken: componentTokenTN,
  },
  'thuy-nga-client': {
    themeToken: themeTokenTNClient,
    componentToken: componentTokenTNClient,
  },
  'tech-pass': {
    themeToken: themeTokenTP,
    componentToken: componentTokenTP,
  },
  'tech-pass-client': {
    themeToken: themeTokenTPClient,
    componentToken: componentTokenTPClient,
  },
};

export const partnerTheme: TPartnerTheme =
  themeObj[PARTNERSHIP_THEME_CODE || 'tech-pass'];
export default partnerTheme;
