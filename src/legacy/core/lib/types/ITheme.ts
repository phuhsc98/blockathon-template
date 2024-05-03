import { MapToken } from 'antd/es/theme/interface';
import { SeedToken } from 'antd/es/theme/interface/seeds';
import { AliasToken } from 'antd/es/theme/interface/alias';
// import { AliasToken, SeedToken } from 'antd/es/theme/internal';
import { ICustomToken } from '../theme';

export interface ITheme extends AliasToken, MapToken, SeedToken, ICustomToken {}
