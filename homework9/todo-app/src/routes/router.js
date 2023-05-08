import { Routes, Route } from "react-router-dom";
import App from "../App";
import Navigation from "../components/DropDown/navigation";
import List from "../components/List/List";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<App />} />
        <Route path="tasks/:params" element={<List />} />
      </Route>
    </Routes>
  );
}

export default Router;
