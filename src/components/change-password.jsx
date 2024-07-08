"use client";
import UserContext from "../contexts/usercontexts";
import { useContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function ChangePassword() {
  const {
    selectedUser,
    setSelectedUser,
    isChangePasswordOpen,
    setChangePasswordOpen,
    userId,
    getUsers,
  } = useContext(UserContext);

  const [ischangePassword, setChangePassword] = useState("");

  const updatePassword = async () => {
    try {
      await axios.put("http://localhost:8000/users/" + userId, {
        ...selectedUser,
        password: ischangePassword,
      });
      setChangePasswordOpen(false);
      setChangePassword("");
      setSelectedUser({});
      toast.success("Updated the user successfully");
      getUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user! Please try again.");
    }
  };

  return (
    <div
      id="passwordModal"
      className={`modal fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50  ${
        !isChangePasswordOpen ? "hidden" : ""
      } `}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
        <div className="px-6 py-4">
          <div className="text-lg font-medium text-gray-900">
            Change Password
          </div>
          <div className="mt-4" id="changePasswordForm">
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-text"
                onChange={(event) => setChangePassword(event.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                id="closeModalBtn"
                className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-400"
                onClick={() => setChangePasswordOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-400"
                onClick={updatePassword}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
