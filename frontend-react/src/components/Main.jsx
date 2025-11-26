import React from "react";

const Main = () => {
  return (
    <>
      <div className="container">
        <div className="p-5 text-center bg-light-dark rounded">
          <h1 className="text-light">Stock Prediction App</h1>
          <p className="text-light">
            This stock prediction appplication utilizes machine learning
            techniques, specifically employing Keras, TenserFlow, and LSTM
            models, integrated withiin Django framework. It forecasts future
            stock prices by analyzing 100-day and 200-day moving averages,
            essential indicators widely used by stock analysts to inform trading
            and investment decisions.
          </p>
          <Button text="Login" class="btn-outline-info" />
        </div>
      </div>
    </>
  );
};

export default Main;
