import React from "react";
import Link from "next/link";

const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Contact", url: "/contact" },
];

const Menu = () => {
  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-lg text-black">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            <li>
              <div className="cursor-pointer hover:drop-shadow-lg hover:bg-black hover:bg-opacity-5 rounded-lg ">
                <Link href={item?.url}>
                  <div className="p-2">{item.name}</div>
                </Link>
              </div>
            </li>
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Menu;
