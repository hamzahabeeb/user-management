"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UserDetails from "./user-details";
import UserContext from "../contexts/usercontexts";
import DeleteUser from "../components/delete-user";
import AddUser from "../components/add-user";
import ChangePassword from "../components/change-password";

function UserList() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
  const [isSearchString, setSearchString] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/users");
      setUsers(data);
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  const saveUser = async () => {
    try {
      await axios.put("http://localhost:8000/users/" + userId, selectedUser);
      setIsEditOpen(false);
      setUserId("");
      setSelectedUser({});
      toast.success("Updated the user successfully");
      getUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user! Please try again.");
    }
  };

  const handleEditViewClick = (userId) => {
    setUserId(userId);
    setIsEditOpen(true);
    const filteredUser = users.find((user) => user.id === userId);
    setSelectedUser(filteredUser);
  };

  const handleDeleteViewClick = (userId) => {
    setUserId(userId);
    setIsDeleteOpen(true);
    const filteredUser = users.find((user) => user.id === userId);
    setSelectedUser(filteredUser);
  };

  const handleChangePasswordViewClick = (userId) => {
    setUserId(userId);
    setChangePasswordOpen(true);
    const filteredUser = users.find((user) => user.id === userId);
    setSelectedUser(filteredUser);
  };

  const handleAddClickView = () => {
    setIsAddOpen(true);
  };

  const deleteUser = async () => {
    try {
      await axios.delete("http://localhost:8000/users/" + userId);
      setIsDeleteOpen(false);
      setUserId("");
      setSelectedUser({});
      toast.success("Deleted the user successfully");
      getUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user! Please try again.");
    }
  };

  const searchUsers = () => {
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(isSearchString.toLowerCase())
    );
    setUsers(filteredUsers);
  
  };
  
  
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 sm:text-sm border-gray-300 rounded-md"
              onChange={(event) => setSearchString(event.target.value )}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg
                className="h-5 w-5 text-gray-400 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                onClick={searchUsers}
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zM9 6a1 1 0 112 0v6a1 1 0 11-2 0V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div>
            <select
              value=""
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <div>
            <select
              value=""
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditViewClick(user.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteViewClick(user.id)}
                      className="text-red-600 hover:text-red-900 mr-2"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => handleChangePasswordViewClick(user.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Change Password
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination
          <div className="mt-4">
            <nav className="flex justify-end" aria-label="Pagination">
              <ul className="inline-flex items-center">
                <li>
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700'
                    }`}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => paginate(index + 1)}
                      className={`ml-2 px-3 py-1 rounded-md ${
                        currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                      }`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
                    className={`ml-2 px-3 py-1 rounded-md ${
                      currentPage === Math.ceil(filteredUsers.length / usersPerPage)
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-gray-700'
                    }`}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div> */}
      </div>
      <UserContext.Provider
        value={{
          getUsers,
          userId,
          setUserId,
          isEditOpen,
          setIsEditOpen,
          selectedUser,
          setSelectedUser,
          saveUser,
          deleteUser,
          isDeleteOpen,
          setIsDeleteOpen,
          isAddOpen,
          setIsAddOpen,
          setChangePasswordOpen,
          isChangePasswordOpen,
        }}
      >
        <AddUser />
        <UserDetails />
        <DeleteUser />
        <ChangePassword />
      </UserContext.Provider>
    </div>
  );
}

export default UserList;
