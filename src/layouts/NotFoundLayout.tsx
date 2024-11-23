import LogoDark from "../components/LogoDark";
import Logo from "../components/Logo";
import { Outlet } from "react-router-dom";

export default function NotFoundLayout() {
    const theme = () => {
        const themeLS = localStorage.getItem("theme");
        if (themeLS) {
            return themeLS;
        }
        if (window.matchMedia("(prefers-color-scheme:dark").matches) {
            return "dark";
        }
        return "light";
    }
  return (
    <section className="max-w-screen-sm mx-auto mt-10 p-5">
    <div className="shadow-xl rounded-md bg-white dark:bg-[#303030] dark:shadow-neutral-900 p-10">
        <div className=" w-64 mx-auto">
            {theme() === "light" ? <LogoDark /> : <Logo /> }
        </div>
            <Outlet />
        </div>
    </section>
  )
}
