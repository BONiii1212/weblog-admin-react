import React from 'react';
import * as ReactDOM from 'react-dom';
import {AppProviders} from'./context'
import App from './App';

// const container = document.getElementById('root');
// const root = ReactDOM.createRoot(container);
// root.render(<Main />);
ReactDOM.render(
    <AppProviders>
      <App />
    </AppProviders>,  
    document.getElementById("root")
  )