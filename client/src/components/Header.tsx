import React, { useContext } from "react";
import { AppState } from "../AppContext";

const Header = () => {
  const { token } = useContext(AppState);
  return (
    <header className=" py-5 bg-yellow-300 text-white" draggable>
      <div className="container mx-auto flex justify-between align-middle  ">
        <h1 className="text-3xl">Kanban</h1>
        <div className="space-x-2 flex">
          <h5 className="bg-pink-700 rounded px-3 py-1 capitalize  shadow ">
            {token.user.firstName} {token.user.lastName}
          </h5>
          <button className="bg-blue-700 px-3 py-1 rounded shadow  ">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
