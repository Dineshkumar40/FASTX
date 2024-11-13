import React, { useState } from "react";
import axiosInstance from './AxiosInstance';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from './Slice';
import { useSelector } from 'react-redux'


function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logFormData, setLogFormData] = useState({
    userId:"",   
    password: "",
    
  });

  const [formData, setFormData] = useState({
    userId:"",   
    password: "",
    confirmPassword: "", 
  });
 
  const { confirmPassword, ...dataToSubmit } = formData;

  const [error, setError] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const loghandleChange = (e) => {
    const { name, value } = e.target;
    setLogFormData({
      ...logFormData,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const RoleType1 = useSelector((state) => state.auth);
  console.log('RoleType1',RoleType1)
  const loghandleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log("logFormData", logFormData);
        const response = await axiosInstance.post('/login/checkAuth', logFormData);

        console.log('Reservation successful:', response.data);
        const { roleType, userId, jwtToken} = response.data;
        console.log('response.data',roleType,userId,jwtToken);
        if (userId && roleType && jwtToken ) {
          console.log('response.data1',roleType,userId,jwtToken);
          dispatch(login({ userId, roleType, jwtToken }));
          console.log('response.data2',roleType,userId,jwtToken);
          console.log("hi Admin1");

          if(roleType === 'Administrator' )
          {
              console.log("hi Admin2");
                navigate('/AdminHome');
            }
            else
            {
              console.log("hi User");


                navigate('/HomePage');
            }


          localStorage.removeItem('UserId')
          // localStorage.removeItem('RoleType')
          // localStorage.removeItem('JWTToken')
          // console.log('hi',localStorage.getItem("UserId"));
          // console.log(localStorage.getItem("RoleType"));
          // console.log(localStorage.getItem("JWTToken"));



          localStorage.setItem("UserId", userId);
          // localStorage.setItem("RoleType", roleType);
          // localStorage.setItem("JWTToken", jwtToken);


          // console.log('hi',localStorage.getItem("UserId"));
          // console.log(localStorage.getItem("RoleType"));
          // console.log(localStorage.getItem("JWTToken"));
        }
        
        

    } catch (ex) {
        console.error('Error submitting reservation:', ex);

        setError("Invalid Credentials");
    }
};


const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
        console.log('formData',formData)
      const response = await axiosInstance.post('/login/toAuth', dataToSubmit);    
      console.log("Form submitted successfully", response.data);    
  
      setError("Login Successfull Proceed to logIn");

    } catch (error) {
      console.error('Error submitting reservation:', error);
      setError("UserId Already Exists , Try Something");
    }
  
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-transparent bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-6">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`text-lg font-semibold px-4 py-2 rounded-t-md ${
              isLogin ? "text-red-600 border-b-2 border-red-600" : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`text-lg font-semibold px-4 py-2 rounded-t-md ${
              !isLogin ? "text-red-600 border-b-2 border-red-600" : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <form className="space-y-4" onSubmit={loghandleSubmit}>
            <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
            <div>
              <label htmlFor="signup-firstname" className="block text-sm font-medium text-gray-700">
                Enter UserId
              </label>
              <input
                type="text"
                id="signup-firstname"
                name="userId"
                value={logFormData.userId}
                onChange={loghandleChange}
                placeholder="Your first name"
                className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>


            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
                Enter Password
              </label>
              <input
                type="password"
                id="login-password"
                name="password"
                value={logFormData.password}
                onChange={loghandleChange}
                placeholder="••••••••"
                className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Login
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
            <div>
              <label htmlFor="signup-firstname" className="block text-sm font-medium text-gray-700">
              Enter UserId
              </label>
              <input
                type="text"
                id="signup-firstname"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                placeholder="Your first name"
                className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>


            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                Enter Password
              </label>
              <input
                type="password"
                id="signup-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            <div>
              <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="signup-confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-red-600 hover:underline focus:outline-none"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-red-600 hover:underline focus:outline-none"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
