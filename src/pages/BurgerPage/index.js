import React, { useState } from "react";

import "./style.css";

import Burger from "../../components/Burger";
import BuildControls from "../../components/BuildControls";
import Modal from "../../components/General/Modal";
import OrderSummary from "../../components/OrderSummary";

const BurgerPage = (props) => {
  const [confirmOrder, setConfirmOrder] = useState(false);

  const continueOrder = () => {
    props.history.push({
      pathname: "/ship",
    });

    closeConfirmModal();
  };

  const showConfirmModal = () => {
    setConfirmOrder(true);
  };

  const closeConfirmModal = () => {
    setConfirmOrder(false);
  };

  return (
    <div>
      <Modal show={confirmOrder} closeConfirmModal={closeConfirmModal}>
        <OrderSummary onCancel={closeConfirmModal} onContinue={continueOrder} />
      </Modal>

      <Burger />
      <BuildControls showConfirmModal={showConfirmModal} />
    </div>
  );
};

export default BurgerPage;
