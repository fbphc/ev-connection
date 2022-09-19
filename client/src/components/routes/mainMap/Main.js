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
          <p className="mx-2 px-1 fs-6">Filter by charger:</p>
          <FormGroup className="my-1 mx-1">
            <Input
              className="w-75"
              bsSize="sm"
              name="typeOfCharger"
              type="select"
              bsSize="5"
              onChange={(e) =>
                setChargerFilter({
                  ...chargerFilter,
                  typeOfCharger: e.target.value,
                })
              }
            >
              <option value="all">All</option>
              <option value="type01">Type 1</option>
              <option value="type02">Type 2</option>
              <option value="type03">CCS</option>
              <option value="type04">CHAdeMO</option>
            </Input>
          </FormGroup>
        </div>
      </div>
      <MainMapComp chargerFilter={chargerFilter} />
      {!isAuthenticated && (
        <div className="text-light lead">
          <p className="lead d-inline mx-2">
            To see wall-boxes addresses please{" "}
            <span className="danger">
              <b>Log-In</b>
            </span>
          </p>
        </div>
      )}

      <div>
        <ModalSearchRoute modal={modal} toggle={toggle} />
      </div>
    </>
  );
}
export default MainMap;
