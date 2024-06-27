// src/App.js

// import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import User from './components/getuser/User';
import Add from './components/adduser/Add';
import Edit from './components/updateuser/Edit';
import Subscription from './components/Subscription';
import SubscriptionReport from './components/SubscriptionReport';
// 


function App() {
  const route = createBrowserRouter([
    {
      path: '/',
      element: <User />,
    },
    {
      path: '/add',
      element: <Add />,
    },
    {
      path: '/edit/:id',
      element: <Edit />,
    },
    {
      path: '/subscriptions',
      element: <Subscription />,
    },
    {
      path: '/subscription-report',
      element: <SubscriptionReport />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
