"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UserDetails from "./user-details";
import UserContext from "../contexts/usercontexts";
import DeleteUser from "../components/delete-user";
import AddUser from "../components/add-user";

function UserList() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

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

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddClickView}
          >
            Add User
          </button>
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
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                      onClick={() => handleEditViewClick(user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteViewClick(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
        }}
      >
        <AddUser />
        <UserDetails />
        <DeleteUser />
      </UserContext.Provider>
    </div>
  );
}

export default UserList;
