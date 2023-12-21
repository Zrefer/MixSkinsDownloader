import { FC } from 'react';
import { Routes, Route } from 'react-router';

import { MainPage, NotFoundPage, UserPage } from '../../pages';

const App: FC = function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="user" element={<UserPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
export default App;
