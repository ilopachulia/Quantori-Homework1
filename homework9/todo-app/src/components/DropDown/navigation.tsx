import { Fragment, useEffect } from "react";
import "./navigation.css";

import { NavLink, Outlet, useLocation } from "react-router-dom";
import { makeHttpRequest } from "../../HelperFunctions/makeHttpRequest";
import { useDispatch } from "react-redux";
import { setTasks } from "../../store/task/task.action";
import { ITask } from "../../shared-Interfaces/sharedInterfaces";

const Navigation = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const category = pathname.split("/").pop();

  useEffect(() => {
    let url = "http://localhost:3004/tasks";
    if (category !== "all") {
      url += `?category=${category}`;
    }
    makeHttpRequest(url)
      .then((data) => {
        const tasks = data as ITask[];
        dispatch(setTasks(tasks));
      })
      .catch((error) => console.error(error));
  }, [dispatch, category]);

  return (
    <Fragment>
      <nav className="navigation">
        <NavLink to="/all" className="navlink">
          All
        </NavLink>
        <NavLink to="/home" className="navlink">
          Home Tasks
        </NavLink>
        <NavLink to="/health" className="navlink">
          Health Tasks
        </NavLink>
        <NavLink to="/work" className="navlink">
          Work Tasks
        </NavLink>
        <NavLink to="/other" className="navlink">
          Other Tasks
        </NavLink>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
