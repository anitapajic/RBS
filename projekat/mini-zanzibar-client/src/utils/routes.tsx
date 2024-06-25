import { Routes, Route} from "react-router";
import HomePage from "../pages/HomePage/HomePage";
import NameSpacePage from "../pages/NameSpacePage/NameSpacePage";
import ACLPage from "../pages/ACLPage/ACLPage";





export default function MyRoutes() {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="/namespace" element={<NameSpacePage />} />
      <Route path="/acl" element={<ACLPage />} />

    </Routes>
  );
}
