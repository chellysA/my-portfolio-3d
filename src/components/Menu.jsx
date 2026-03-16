import React from "react";

const Menu = (props) => {
  const { setSection, menuOpened, setMenuOpened } = props;
  return (
    <>
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpened(!menuOpened);
        }}
        className="z-20 fixed top-4 md:top-6 right-4 md:right-12 p-2 md:p-3 bg-white/80 border border-purple-200 shadow-md w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center backdrop-blur-sm"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <span
            className={`absolute h-0.5 w-4 md:w-5 rounded-full bg-purple-700 transition-transform duration-200 ${
              menuOpened ? "rotate-45" : "-translate-y-1"
            }`}
          />
          <span
            className={`absolute h-0.5 w-4 md:w-5 rounded-full bg-purple-700 transition-opacity duration-150 ${
              menuOpened ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-4 md:w-5 rounded-full bg-purple-700 transition-transform duration-200 ${
              menuOpened ? "-rotate-45" : "translate-y-1"
            }`}
          />
        </div>
      </button>
      <div
        className={`z-10 fixed top-0 right-0 bottom-0 bg-white/95 transition-all overflow-hidden flex flex-col backdrop-blur-sm ${
          menuOpened
            ? "w-full md:w-80 shadow-[-4px_0_30px_rgba(0,0,0,0.18)]"
            : "w-0"
        }`}
      >
        <div className="flex-1 flex items-start justify-center flex-col gap-1 p-8">
          <MenuButton label="About" icon="🏠" onClick={() => setSection(0)} />
          <MenuSeparator />
          <MenuButton label="Skills" icon="✨" onClick={() => setSection(1)} />
          <MenuSeparator />
          <MenuButton
            label="Projects"
            icon="📁"
            onClick={() => setSection(2)}
          />
          <MenuSeparator />
          <MenuButton
            label="Certifications"
            icon="📜"
            onClick={() => setSection(3)}
          />
          <MenuSeparator />
          <MenuButton label="Contact" icon="✉️" onClick={() => setSection(4)} />
        </div>
      </div>
    </>
  );
};
const MenuButton = (props) => {
  const { label, icon, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 py-2 text-lg md:text-xl font-semibold cursor-pointer text-gray-800 hover:text-purple-700 hover:bg-purple-50 rounded-lg px-2 transition-colors"
    >
      {icon && (
        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-100 text-base">
          {icon}
        </span>
      )}
      <span>{label}</span>
    </button>
  );
};

const MenuSeparator = () => (
  <div className="w-full h-px bg-gradient-to-r from-purple-100 via-purple-200/60 to-transparent my-1" />
);
export default Menu;
