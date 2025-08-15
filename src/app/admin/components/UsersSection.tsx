import React from "react";
import { Users, UserPlus, Edit, X } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  status: string;
  subscription: string;
  registered: string;
}

interface UserForm {
  name: string;
  email: string;
  status: string;
  subscription: string;
  registered: string;
}

interface UsersSectionProps {
  users: User[];
  showUserModal: boolean;
  setShowUserModal: (show: boolean) => void;
  userForm: UserForm;
  handleAddUser: () => void;
  handleUserFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleUserFormSubmit: (e: React.FormEvent) => void;
}

const UsersSection: React.FC<UsersSectionProps> = ({
  users,
  showUserModal,
  setShowUserModal,
  userForm,
  handleAddUser,
  handleUserFormChange,
  handleUserFormSubmit,
}) => (
  <div className="w-full">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-red-500 flex items-center gap-3">
      <Users size={36} className="-mt-1" /> User Management
    </h2>
    <div className="flex items-center justify-between mb-8 mt-8">
      <div className="flex items-center gap-2 text-xl font-bold text-white">
        <Users size={24} className="text-red-400" /> All Users
      </div>
      <button
        onClick={handleAddUser}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg text-base transition"
      >
        <UserPlus size={20} /> Add New User
      </button>
    </div>
    {/* Modal for Add User */}
    {showUserModal && (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-[#232b3b]/70 rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-white/20 backdrop-blur-lg" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            onClick={() => setShowUserModal(false)}
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <h3 className="text-2xl font-bold text-red-500 mb-6 flex items-center gap-2">
            <UserPlus size={24} /> Add New User
          </h3>
          <form onSubmit={handleUserFormSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Name</label>
              <input
                name="name"
                value={userForm.name}
                onChange={handleUserFormChange}
                className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none"
                required
                placeholder="e.g., Alice Smith"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                name="email"
                value={userForm.email}
                onChange={handleUserFormChange}
                className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none"
                required
                placeholder="e.g., alice@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Status</label>
              <select
                name="status"
                value={userForm.status}
                onChange={handleUserFormChange}
                className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Subscription</label>
              <input
                name="subscription"
                value={userForm.subscription}
                onChange={handleUserFormChange}
                className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none"
                placeholder="e.g., Premium"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Registered</label>
              <input
                name="registered"
                value={userForm.registered}
                onChange={handleUserFormChange}
                className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none"
                placeholder="e.g., 2022-01-01"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowUserModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg text-base transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg text-base transition"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    <div className="bg-[#232b3b] rounded-xl shadow p-0 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-[#232b3b]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">USER ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">NAME</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">EMAIL</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">STATUS</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">SUBSCRIPTION</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">REGISTERED</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="bg-[#232b3b] divide-y divide-gray-700">
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-400">
                No user data available. This section would be populated dynamically.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-100">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-700 text-green-100' : 'bg-red-700 text-red-100'}`}>{user.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.subscription}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.registered}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-red-500 hover:text-red-400 mr-3"><Edit size={18} /></button>
                  <button className="text-gray-400 hover:text-gray-300"><X size={18} /></button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default UsersSection; 