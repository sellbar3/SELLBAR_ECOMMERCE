"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import "./SubMenu.css";

const MENUS = [
  {
    key: "all",
    label: "All",
    href: "/sell",
    groups: [
      {
        title: "Sell old devices",
        links: [
          ["📱 Sell Phone", "/sell"],
          ["💻 Sell Laptop", "/sell/laptops"],
          ["📲 Sell Tablet", "/sell/tablets"],
          ["⌚ Sell Smartwatch", "/sell"],
        ],
      },
      {
        title: "Buy refurbished",
        links: [
          ["Refurbished iPhones", "/buy-refurbished"],
          ["Refurbished MacBooks", "/buy-refurbished"],
          ["Refurbished Tablets", "/buy-refurbished"],
          ["Refurbished Smartwatches", "/buy-refurbished"],
        ],
      },
    ],
  },
  {
    key: "sell-phone",
    label: "Sell Phone",
    href: "/sell",
    groups: [
      {
        title: "Select brand to sell",
        links: ["Apple iPhone", "Samsung", "OnePlus", "Xiaomi", "Vivo", "Oppo", "Realme", "Google Pixel"].map(
          (b) => [`Sell ${b}`, "/sell"]
        ),
      },
    ],
  },
  {
    key: "sell-gadgets",
    label: "Sell Gadgets",
    href: "/sell",
    groups: [
      {
        links: [
          ["💻 Sell Old Laptop", "/sell/laptops"],
          ["📲 Sell Old Tablet", "/sell/tablets"],
          ["⌚ Sell Smartwatch", "/sell"],
          ["📺 Sell Smart TV", "/sell"],
          ["🎮 Sell Gaming Console", "/sell"],
          ["🎧 Sell Earbuds / Audio", "/sell"],
        ],
      },
    ],
  },
  {
    key: "buy-refurbished",
    label: "Buy Refurbished Devices",
    href: "/buy-refurbished",
    groups: [
      {
        title: "Certified refurbished",
        links: [
          ["Refurbished Mobile Phones", "/buy-refurbished"],
          ["Refurbished MacBooks", "/buy-refurbished"],
          ["Refurbished Laptops & Desktops", "/buy-refurbished"],
          ["Refurbished Smartwatches", "/buy-refurbished"],
        ],
      },
    ],
  },
  {
    key: "find-new",
    label: "Find New Gadget",
    href: "/buy-refurbished",
    groups: [
      {
        links: [
          ["Compare smartphone specs", "/buy-refurbished"],
          ["Upcoming smartphone launches", "/buy-refurbished"],
          ["Best camera phones", "/buy-refurbished"],
          ["Best 5G phones under ₹20,000", "/buy-refurbished"],
        ],
      },
    ],
  },
  {
    key: "buy-laptop",
    label: "Buy Laptop",
    href: "/buy-refurbished",
    groups: [
      {
        title: "Laptops by category",
        links: [
          ["Apple MacBook Air & Pro", "/buy-refurbished"],
          ["Windows thin & light laptops", "/buy-refurbished"],
          ["Gaming laptops", "/buy-refurbished"],
          ["Laptops under ₹25,000", "/buy-refurbished"],
        ],
      },
    ],
  },
  {
    key: "store",
    label: "SELLBAR Store",
    href: "/about",
    groups: [
      {
        links: [
          ["Find nearest store", "/about"],
          ["Book in-store valuation", "/about"],
        ],
      },
    ],
  },
  {
    key: "more",
    label: "More",
    href: null,
    right: true,
    groups: [
      {
        links: [
          ["🛠 Doorstep mobile repair", "/repair"],
          ["↩️ Warranty & return policy", "/faq"],
          ["🏢 Corporate buyback", "/about"],
          ["🤝 Partner with us", "/contact"],
        ],
      },
    ],
  },
];

export default function SubMenu() {
  const [open, setOpen] = useState(null);
  const timer = useRef(null);

  const enter = (key) => {
    clearTimeout(timer.current);
    setOpen(key);
  };

  const leave = () => {
    timer.current = setTimeout(() => setOpen(null), 150);
  };

  return (
    <nav className="sm" aria-label="Main menu">
      <div className="sm-inner">
        {MENUS.map((menu) => {
          const isOpen = open === menu.key;

          return (
            <div
              key={menu.key}
              className="sm-item"
              onMouseEnter={() => enter(menu.key)}
              onMouseLeave={leave}
            >
              {menu.href ? (
                <Link
                  href={menu.href}
                  className={`sm-label ${isOpen ? "on" : ""}`}
                  onClick={() => setOpen(null)}
                >
                  {menu.label} <i aria-hidden="true">⌄</i>
                </Link>
              ) : (
                <button
                  type="button"
                  className={`sm-label ${isOpen ? "on" : ""}`}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : menu.key)}
                >
                  {menu.label} <i aria-hidden="true">⌄</i>
                </button>
              )}

              {isOpen && (
                <div className={`sm-drop ${menu.right ? "right" : ""}`}>
                  <div className="sm-panel">
                    {menu.groups.map((group, index) => (
                      <div className="sm-group" key={index}>
                        {group.title && <h4>{group.title}</h4>}
                        {group.links.map(([text, href]) => (
                          <Link
                            key={text}
                            href={href}
                            onClick={() => setOpen(null)}
                          >
                            {text}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}