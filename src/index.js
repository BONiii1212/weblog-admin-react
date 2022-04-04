import React from 'react';
import * as ReactDOM from 'react-dom';
import Main from './Pages/Main';

// const container = document.getElementById('root');
// const root = ReactDOM.createRoot(container);
// root.render(<Main />);
ReactDOM.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>,
    document.getElementById("root")
  )