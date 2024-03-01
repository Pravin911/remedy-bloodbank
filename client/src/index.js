import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider
    store={store}
  >
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#D24545',
          colorBorder: '#D24545',
          borderRadius: 5,
        },
      }}
    >
    <App />
    </ConfigProvider>
  </Provider>
);

reportWebVitals();
