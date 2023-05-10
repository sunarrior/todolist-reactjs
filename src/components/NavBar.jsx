import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { HiOutlineUserCircle } from "react-icons/hi";

function UserMenus() {
  const userMenus = [{ name: "Logout", url: "/logout" }];
  return (
    <div className="z-50 my-1 text-sm text-gray-700 font-medium mx-6 md:my-0">
      <Menu>
        <Menu.Button className="hover:text-indigo-500">
          <HiOutlineUserCircle size={30} className="" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userMenus.map((item) => (
            <Menu.Item key={item.name}>
              <Link to={item.url}>
                <button
                  type="button"
                  className="w-full rounded-md p-2 hover:bg-indigo-500 hover:text-gray-200"
                >
                  {item.name}
                </button>
              </Link>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default function NavBar({ children }) {
  return (
    <>
      {/* <!-- component --> */}
      <div className="relative">
        <div className="fixed z-40 top-0 w-full">
          <nav className="bg-white shadow">
            <div className="mx-auto py-3 flex justify-end">
              <div className="flex">
                <UserMenus />
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="mt-20">{children}</div>
    </>
  );
}
