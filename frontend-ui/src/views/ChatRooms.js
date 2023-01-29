import { Outlet } from "react-router-dom"
import NavBar from "../components/Chat/NavBar";
import { NavLink } from "react-router-dom";

export default function ChatRooms() {
  const testClasses = ["CSE232", "WRA101", "MTH132", "ISB202", "CSE231", "MTH314"];
  
  const rows = testClasses.map((course) => {
    return (
      <NavLink to={course} key={course}>
        <div className="rounded p-4 my-2 bg-gray-100 hover:bg-gray-200">{course}</div>
      </NavLink>
    );
  });

  return (
    <div>
      <div className='sticky top-0 z-50'>
        <NavBar />
      </div>
      <div className="flex">
        <div className="p-4">
          { rows }
        </div>
        <div className="flex-1">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}