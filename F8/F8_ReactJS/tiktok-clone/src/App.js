import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { DefautLayout } from './layouts';
import { publicRoutes } from './routes';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, idx) => {
            return (
              <Route
                key={idx}
                path={route.path}
                element={
                  route.layout ? (
                    <route.layout>
                      <route.component />
                    </route.layout>
                  ) : (
                    <DefautLayout>
                      <route.component />
                    </DefautLayout>
                  )
                }
              ></Route>
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
