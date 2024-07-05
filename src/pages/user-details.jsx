"use client";
import UserContext from "../contexts/usercontexts";
import { useContext } from "react";

function UserDetails() {
  const { isEditOpen, setIsEditOpen, selectedUser, setSelectedUser, saveUser } =
    useContext(UserContext);

  const saveAll = () => {
    saveUser();
  };

  return (
    <div
      className={`modal fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-10 ${
        !isEditOpen ? "hidden" : ""
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative max-h-full overflow-auto">
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-900"
          onClick={() => setIsEditOpen(false)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-6">User Details</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              value={selectedUser.name}
              onChange={(event) =>
                setSelectedUser({ ...selectedUser, name: event.target.value })
              }
              type="text"
              placeholder="John Doe"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              value={selectedUser.email}
              onChange={(event) =>
                setSelectedUser({ ...selectedUser, email: event.target.value })
              }
              type="email"
              placeholder="john.doe@example.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              value={selectedUser.role}
              onChange={(event) =>
                setSelectedUser({ ...selectedUser, role: event.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="status"
            >
              Status
            </label>
            <select
              id="status"
              value={selectedUser.status}
              onChange={(event) =>
                setSelectedUser({ ...selectedUser, status: event.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              id="phone"
              value={selectedUser.phone}
              onChange={(event) =>
                setSelectedUser({ ...selectedUser, phone: event.target.value })
              }
              type="text"
              placeholder="+1 234 567 890"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              id="address"
              value={selectedUser.address}
              onChange={(event) =>
                setSelectedUser({
                  ...selectedUser,
                  address: event.target.value,
                })
              }
              type="text"
              placeholder="123 Main St, City, Country"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dateOfRegistration"
            >
              Date of Registration
            </label>
            <input
              id="dateOfRegistration"
              value={selectedUser.dateOfRegistration}
              onChange={(event) =>
                setSelectedUser({
                  ...selectedUser,
                  dateOfRegistration: event.target.value,
                })
              }
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastLogin"
            >
              Last Login
            </label>
            <input
              id="lastLogin"
              value={selectedUser.lastLogin}
              onChange={(event) =>
                setSelectedUser({
                  ...selectedUser,
                  lastLogin: event.target.value,
                })
              }
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={saveAll}
            >
              Save
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => setIsEditOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDetails;
