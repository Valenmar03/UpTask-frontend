import { Outlet } from "react-router-dom";
import Tabs from "../components/profile/Tabs";

export default function ProfileLayout() {
   return (
      <>
         <Tabs/>
         <div className="md:mx-28 lg:mx-60">
            <Outlet/>
         </div>
      </>
   );
}
