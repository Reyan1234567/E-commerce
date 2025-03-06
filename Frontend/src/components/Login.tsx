import api from "./axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useAuthStore } from "../Global/store";

type inputData = {
  username: string;
  password: string;
};

const Login = () => {
  // const setAccesstoken = useAuthStore((state) => state.setAccesstoken);
  // const setRefreshtoken = useAuthStore((state) => state.setRefreshtoken);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputData>();

  const onsubmit = async (d: inputData) => {
    try {
      const response = await api.post("http://localhost:3300/login", d, {
        withCredentials: true,
      });
      
      if (response.status === 201) {
        localStorage.setItem("accessToken", response.data.accessToken)
        localStorage.setItem("refreshToken", response.data.refreshToken)
        navigate("/home");
      } else {
        errorNotification();
      }
    } catch (err) {
      console.log(err);
      errorNotification();
    }
  };

  const errorNotification = () => {
    toast.error("Wrong credentials, Try again", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onsubmit(data))}
      className="fieldset w-sm bg-base-200 border border-base-300 p-4 rounded-box"
    >
      <legend className="fieldset-legend"></legend>
      <h1 className="text-2xl font-bold">Welcome Back</h1>

      <label className="fieldset-label">Username</label>
      <input
        type="text"
        className="input w-full"
        placeholder="Email"
        {...register("username", { required: "Username is required" })}
      />
      {errors.username && <p className="text-red-500">Username is required</p>}
      <label className="fieldset-label">Password</label>
      <input
        type="password"
        className="input w-full"
        placeholder="Password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && <p className="text-red-500">Password is required</p>}

      <button className="btn btn-neutral mt-4" type="submit">
        Login
      </button>
      <p className="mt-2">
        Don't have an account?{" "}
        <Link to="/signUp" className="underline">
          create an account
        </Link>
      </p>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </form>
  );
};

export default Login;
