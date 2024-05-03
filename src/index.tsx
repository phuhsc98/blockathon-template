import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from '@ant-design/cssinjs';

import { BrowserRouter } from 'react-router-dom';
import { AppClientContext } from './legacy/app-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <StyleProvider
    hashPriority='high'
    transformers={[legacyLogicalPropertiesTransformer]}>
    <AppClientContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppClientContext>
  </StyleProvider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
