// DeleteUser.js

const DeleteUser = ({ user, onConfirm, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded shadow-md">
        <p className="text-lg mb-4">
          Are you sure you want to delete {user && user.Username}'s account?
        </p>
        <div className="flex justify-end">
          <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 mr-2 rounded">
            Delete
          </button>
          <button onClick={onCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
