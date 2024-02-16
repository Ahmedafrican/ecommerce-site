
import './App.css';
import {Navigate, RouterProvider , createHashRouter } from 'react-router-dom'
import Home from './Components/Home/Home';
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import NotFound from './Components/NotFound/NotFound'
import Layout from './Components/Layout/Layout'
import AuthContextProvider from './Contexts/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Address from './Components/Address/Address';
import Orders from './Components/Orders/Orders';
import BrandsDetails from './Components/BrandsDetails/BrandsDetails';




function App() {
  let queryClient = new QueryClient()
  
  let routers = createHashRouter([
    {
        path:'',element:<Layout/>,children:[
            {path:'',element:<Navigate to={'home'}/>},
            {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
            {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
            {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
            {path:'login',element:<Login/>},
            {path:'address/:cartId',element:<ProtectedRoute><Address/></ProtectedRoute>},
            {path:'productDetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
            {path:'BrandsDetails/:id',element:<ProtectedRoute><BrandsDetails/></ProtectedRoute>},
            {path:'allorders',element:<ProtectedRoute><Orders/></ProtectedRoute>},
            {path:'register',element:<Register/>},
            {path:'*',element:<NotFound/>}
        ]
    }
])
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
      <RouterProvider router={routers}>

      </RouterProvider>
    </AuthContextProvider>
    <ReactQueryDevtools/>
    </QueryClientProvider>
    
    

      
  );
}

export default App;
