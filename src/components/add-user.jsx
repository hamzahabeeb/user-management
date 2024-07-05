"use client";

import UserContext from "../contexts/usercontexts";
import { useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function AddUser() {
  const { register, handleSubmit } = useForm();
  const { isAddOpen, setIsAddOpen, getUsers } = useContext(UserContext);
  const addUserAll = async (data) => {
    try {
      await axios.post("http://localhost:8000/users", data);
      toast.success("User Added Successfully!");
      setIsAddOpen(false);
      getUsers();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      id="modal"
      className={`modal fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50  ${
        !isAddOpen ? "hidden" : ""
      } `}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">User Details</h2>
        </div>
        <form onSubmit={handleSubmit(addUserAll)}>
          <div className="p-4 space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                {...register("name")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                onChange=""
                placeholder="Name"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                {...register("email")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                onChange=""
                placeholder="Email"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="role"
              >
                Role
              </label>
              <select
                {...register("role")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="role"
                name="role"
                onChange=""
              >
                <option value="Admin">admin</option>
                <option value="User">user</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                {...register("status")}
                id="status"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="p-4 border-t flex justify-end space-x-2">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
              type="button"
              onClick={() => setIsAddOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
