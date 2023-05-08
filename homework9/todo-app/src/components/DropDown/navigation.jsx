import React, { Fragment, useEffect } from "react";
import classes from "./navigation.module.css";

import { NavLink, Outlet, useLocation } from "react-router-dom";
import { makeHttpRequest } from "../../HelperFunctions/makeHttpRequest";
import { useDispatch } from "react-redux";
import { setTasks } from "../../store/task/task.action";

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
        dispatch(setTasks(data));
      })
      .catch((error) => console.error(error));
  }, [dispatch, category]);

  return (
    <Fragment>
      <nav className={classes.navigation}>
        <NavLink to="/all" className={classes.navlink}>
          All
        </NavLink>
        <NavLink to="/home" className={classes.navlink}>
          Home Tasks
        </NavLink>
        <NavLink to="/health" className={classes.navlink}>
          Health Tasks
        </NavLink>
        <NavLink to="/work" className={classes.navlink}>
          Work Tasks
        </NavLink>
        <NavLink to="/other" className={classes.navlink}>
          Other Tasks
        </NavLink>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
