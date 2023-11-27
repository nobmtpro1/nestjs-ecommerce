import { ROUTE_CART, ROUTE_HOME, ROUTE_LOGIN } from "constants/routes";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "ultils/helpers";

const Header = () => {
  const accountReducer = useSelector((state) => state.account);

  return (
    <header className="mb-10">
      <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link class="flex items-center" to={ROUTE_HOME}>
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </Link>
          <div class="flex items-center lg:order-2 gap-5">
            {accountReducer?.account?.profile ? (
              <>
                <a className="flex items-center gap-2">
                  <img
                    src={accountReducer?.account?.profile?.avatar}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm">
                    {accountReducer?.account?.profile?.name}
                  </span>
                </a>
                <a href="#" className="text-red-400 text-sm" onClick={logout}>
                  Logout
                </a>
              </>
            ) : (
              <Link
                to={ROUTE_LOGIN}
                class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log in
              </Link>
            )}

            <Link
              to={ROUTE_CART}
              class="text-white bg-zinc-800 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              <i class="fa-solid fa-cart-shopping"></i>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
