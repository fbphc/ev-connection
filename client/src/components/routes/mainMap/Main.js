import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormGroup, Input } from "reactstrap";

import MainMapComp from "../mainMap/MainMapComp.js";
import ModalSearchRoute from "./ModalSearchRoute.js";
import useAuth from "../../../context/authContext/useAuth.js";
import { MainButton } from "../../../components.styled/styledComponents.js";

function MainMap() {
  const { isAuthenticated } = useAuth();
  const [chargerFilter, setChargerFilter] = useState({
    typeOfCharger: "all",
  });
  const navigate = useNavigate();
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="w-75 text-light">
        <div className="mt-3 mx-2">
          <MainButton onClick={toggle}>Calculate Route </MainButton>
        </div>

        <div className="d-flex align-items-center mt-2">
          <p className="mx-2 h5">Filter by charger:</p>
          <FormGroup className="my-1 mx-1">
            <Input
              name="typeOfCharger"
              type="select"
              onChange={(e) =>
                setChargerFilter({
                  ...chargerFilter,
                  typeOfCharger: e.target.value,
                })
              }
            >
              <option value="all">All</option>
              <option value="type01">type01</option>
              <option value="type02">type02</option>
              <option value="type03">type03</option>
              <option value="type04">type04</option>
            </Input>
          </FormGroup>
        </div>
      </div>
      <MainMapComp chargerFilter={chargerFilter} />
      {!isAuthenticated && (
        <div className="text-light lead">
          <p className="lead d-inline mx-2">
            To see wall-boxes addresses please
          </p>
          <MainButton onClick={() => navigate("/login")}> Log-In</MainButton>
        </div>
      )}

      <div>
        <ModalSearchRoute modal={modal} toggle={toggle} />
      </div>
    </>
  );
}
export default MainMap;
