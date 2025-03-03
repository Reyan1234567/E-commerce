import axios from "axios";
import { useForm } from "react-hook-form";

type inputData = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputData>();
  const onsubmit = (data: inputData) =>{
    const response=axios.post("http://localhost:3300/login",data)
    
    if(response.status===201){
        
    }


};
  

  return (
    <form
      onSubmit={handleSubmit((data)=>onsubmit(data))}
      className="fieldset w-sm bg-base-200 border border-base-300 p-4 rounded-box"
    >
      <legend className="fieldset-legend"></legend>
      <h1 className="text-2xl font-bold">Welcome Back</h1>

      <label className="fieldset-label">Email</label>
      <input
        type="email"
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
        Don't have an account{" "}
        <a className="underline" href="#">
          create an account
        </a>
      </p>
    </form>
  );
};

export default Login;
