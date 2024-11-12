import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import utr1 from "../../assets/UTR1.jpeg";
import utr2 from "../../assets/UTR2.jpeg";
import utr3 from "../../assets/UTR3.jpeg";
const OrderTracking = ({ isAfterPayment = false }) => {
  const [error, setError] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null);
  const generateOrderID = () => {
    const min = 1000000000;
    const max = 9999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const getOrderIDForUTR = (utr) => {
    const orderData = JSON.parse(localStorage.getItem("orderData")) || {};
    if (orderData[utr]) {
      return orderData[utr];
    } else {
      const newOrderId = generateOrderID();
      orderData[utr] = newOrderId;
      localStorage.setItem("orderData", JSON.stringify(orderData));
      return newOrderId;
    }
  };
  const handleUTRSave = () => {
    if (isAfterPayment && value.length === 12) {
      const newOrderId = getOrderIDForUTR(value);
      setOrderId(newOrderId);
      localStorage.setItem("utrNumber", value);
      setError(false);
    } else {
      setError(true);
    }
  };
  const handleSubmit = () => {
    if (isAfterPayment && !error && value.length === 12) {
      navigate(`/ThankYou?OrderNo=${orderId}`);
    } else {
      setError(true);
    }
  };
  return (
    <Container>
      <Row>
        <Col>
          <div className="text-center mt-5">
            {isAfterPayment && (
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#727272",
                  textAlign: "center",
                }}
              >
                Your Order is Confirmed!
              </h1>
            )}
            {isAfterPayment && (
              <div className="mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  width={44}
                  height={44}
                  data-name="Layer 1"
                  viewBox="0 0 122.88 122.88"
                >
                  <title>confirm</title>
                  <path
                    className="cls-1"
                    d="M61.44,0A61.44,61.44,0,1,1,0,61.44,61.44,61.44,0,0,1,61.44,0Z"
                  />
                  <path
                    className="cls-2"
                    d="M42.37,51.68,53.26,62,79,35.87c2.13-2.16,3.47-3.9,6.1-1.19l8.53,8.74c2.8,2.77,2.66,4.4,0,7L58.14,85.34c-5.58,5.46-4.61,5.79-10.26.19L28,65.77c-1.18-1.28-1.05-2.57.24-3.84l9.9-10.27c1.5-1.58,2.7-1.44,4.22,0Z"
                  />
                </svg>
              </div>
            )}
            {isAfterPayment && (
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#023FFF",
                  textAlign: "center",
                }}
              >
                {`Payment confirmation is pending`}
              </h3>
            )}
            {isAfterPayment && (
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#727272",
                  textAlign: "center",
                }}
              >
                {`We Will Notify You In Email Or Phone.`}
              </h3>
            )}
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#727272",
                textAlign: "center",
              }}
              className="mt-4"
            >
              {`${
                isAfterPayment ? "Enter Your UTR Number" : "Track Your Order"
              }`}
            </h3>
            {!isAfterPayment && (
              <div className="Footer__Content Rte">
                Enter your order id and track your order here.
              </div>
            )}
            <Form
              method="post"
              action="#"
              acceptCharset="UTF-8"
              className="my-3"
            >
              <Form.Control
                size="lg"
                className="Utr-number"
                type={isAfterPayment ? "number" : "text"}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleUTRSave}
                placeholder={
                  isAfterPayment ? "UTR / Transaction number" : "Order Id"
                }
              />
              {error && (
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#FF0000",
                    textAlign: "center",
                    marginTop: "5px",
                  }}
                >
                  {isAfterPayment
                    ? "UTR number must be exactly 12 characters."
                    : `Invalid order id.`}
                </div>
              )}
              <div className="d-flex justify-content-center">
                {isAfterPayment && (
                  <Button
                    type="button"
                    onClick={() => {
                      navigate(-1);
                    }}
                    variant="dark"
                    className="mt-3 me-2"
                    style={{
                      background: "var(--them-color)",
                      borderColor: "var(--them-color)",
                    }}
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={handleSubmit}
                  variant="dark"
                  className="mt-3"
                  style={{
                    background: "var(--them-color)",
                    borderColor: "var(--them-color)",
                  }}
                >
                  {isAfterPayment ? "Submit" : "Track"}
                </Button>
              </div>
            </Form>
          </div>
          {isAfterPayment && (
            <div className="utr-image d-flex justify-content-center">
              <img src={utr1} alt="" width={"100%"} />
              <img src={utr2} alt="" width={"100%"} />
              <img src={utr3} alt="" width={"100%"} />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default OrderTracking;