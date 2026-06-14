import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import "./AppLayout.css";

function App() {
  const [count, setCount] = useState(0);
  const sidebarItems = [
    { lable: "home" },
    { lable: "home1" },
    { lable: "home2" },
    { lable: "home3" },
    {
      lable: "dashboard",
      children: [{ lable: "main dashboard" }, { lable: "master dashboard" }],
    },
  ];
  const renderSidebarItems = (items) => {
    return (
      <>
        {items?.map((item, index) => {
          const hasChildren = item.children?.length > 0;

          return (
            <div key={`${item.lable}-${index}`}>
              <div>{item.lable}</div>

              {hasChildren && (
                <div style={{ paddingLeft: "20px" }}>
                  {renderSidebarItems(item.children)}
                </div>
              )}
            </div>
          )
        })}
      </>
    );
  };
  return (
    <>
      <div className="app">
        <nav className="navbar"> nav </nav>
        <div className="container-aside-main">
          <aside className="sidebar">

            <div className="sidebar-content">
              {renderSidebarItems(sidebarItems)}
            </div>
            <div className="sidebar-settings">

              <button >
                Settings
              </button>
              <button >
                Settings
              </button>
            </div>
          </aside>
          <main>
            hi
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
