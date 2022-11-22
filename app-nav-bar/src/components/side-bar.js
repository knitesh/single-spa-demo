import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Chevron } from "./icons";
import { sidebarData } from "./constants";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";

import { auth$, login } from "@nitex/utility";

import NameComponent from "./name-component.js";

const Sidebar = () => {
  const printItem = (item, index) => {
    const groupTemplate = (data, content, open, isFirst = false) => {
      return (
        <>
          <AccordionHeader className="w-full flex item-center justify-between px-4 py-3 text-white/70 hover:text-white transition-all duration-400">
            <div className="flex items-center space-x-3">
              {content}
              <span>{data.text}</span>
            </div>

            <Chevron
              className={`h-6 w-6 transition duration-300 ${
                open ? "rotate-90" : ""
              }`}
            />
          </AccordionHeader>

          <AccordionBody className={!isFirst ? "pl-4" : ""}>
            {data.menu.map(printItem)}
          </AccordionBody>
        </>
      );
    };

    switch (item.type) {
      case "group":
        return (
          <li
            key={index}
            className="py-3 px-4 text-sm font-semibold text-white/30 uppercase list-none"
          >
            {item.text}
          </li>
        );
      case "firstLink":
        return (
          <li className="list-none" key={index}>
            <a
              href={item.link}
              className="flex item-center space-x-3 text-sm text-white/70 px-4 py-3 hover:text-white transition-all duration-400"
            >
              <svg
                className="w-5 h-5 p-1.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{item.text}</span>
            </a>
          </li>
        );
      case "secondLink":
        return (
          <li className="list-none" key={index}>
            <Link
              to={item.link}
              className="flex item-center space-x-3 text-sm text-white/70 px-4 py-3 hover:text-white transition-all duration-400"
            >
              <svg
                className="w-5 h-5 p-1.5"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 8 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z"
                ></path>
              </svg>
              <span>{item.text}</span>
            </Link>
          </li>
        );
      case "firstGroup":
        return (
          <AccordionItem key={index}>
            {({ open }) => <>{groupTemplate(item, item.icon, open, true)}</>}
          </AccordionItem>
        );
      case "secondGroup":
        return (
          <AccordionItem key={index}>
            {({ open }) => (
              <div>
                {groupTemplate(
                  item,
                  <svg
                    className="w-5 h-5 p-1.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>,
                  open
                )}
              </div>
            )}
          </AccordionItem>
        );
      case "thirdGroup":
        return (
          <AccordionItem key={index}>
            {({ open }) => (
              <div>
                {groupTemplate(
                  item,
                  <svg
                    className="w-5 h-5 p-1.5"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 8 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z"
                    ></path>
                  </svg>,
                  open
                )}
              </div>
            )}
          </AccordionItem>
        );
      default:
        return null;
    }
  };
  const [pending, setPending] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    let timeout;
    const sub = auth$.subscribe(({ pending, error }) => {
      // redirecting to /home when logged in will be done in the navbar. Cohesive code FTW!
      setPending(pending);
      setError(error);
      timeout = setTimeout(() => {
        setError();
      }, 2000);
    });
    return () => {
      clearInterval(timeout);
      sub.unsubscribe();
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = document.forms.login.elements;
    login("exampleuser", "examplepassword");
  };

  return (
    <div
      className="h-screen bg-[#405189] w-[300px] shadow-lg"
      style={{ height: "100vh", width: "100" }}
    >
      <div className="flex py-4 px-3 items-center space-x-3">
        <svg
          className="w-10 h-10 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>
        <span className="font-semibold text-3xl text-white/70">Dummy App</span>
      </div>
      <div className="mt-3 mr-2 font-light">
        <NameComponent />
        <form name="login" className="login-form" onSubmit={onSubmit}>
          <div className="mt-3 px-4">
            <button type="submit" class="submit" disabled={pending}>
              {pending ? "Loading..." : "Submit"}
            </button>
          </div>
          {error && <div className="login-error">{error}</div>}
        </form>
      </div>

      <div className="mt-3 font-light">
        <Accordion className="">{sidebarData.map(printItem)}</Accordion>
      </div>
    </div>
  );
};

export default Sidebar;
