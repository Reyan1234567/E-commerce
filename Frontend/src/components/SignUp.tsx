import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="fieldset w-sm bg-base-200 border border-base-300 p-4 rounded-box">
      <legend className="fieldset-legend"></legend>
      <h1 className="text-2xl font-bold">Create an account</h1>

      <label className="fieldset-label">Username</label>
      <input type="text" className="input w-full" placeholder="Username" />

      <label className="fieldset-label">Email</label>
      <input type="email" className="input w-full" placeholder="Email" />

      <label className="fieldset-label">Password</label>
      <input type="password" className="input w-full" placeholder="Password" />

      <button className="btn btn-neutral mt-4">Sign up</button>
      <p className="mt-2">Already have an account? <Link className="underline" to="/login">Sign-in</Link></p>
    </div>
  );
};

export default SignUp;
