import React, { useEffect, useState } from "react";
import "./App.css";
import { connect } from "react-redux";
import { Table } from "antd";
import { FireOutlined, FireFilled } from "@ant-design/icons";
import { FallOutlined, RiseOutlined } from "@ant-design/icons/lib";
import {
  updateLocalFavorite,
  toggleFavorite,
  initApp,
} from "./redux/currency-reducer";
import { RootState } from "./redux/redux-store";
import "antd/dist/antd.css";
import { Currency } from "./redux/currency-reducer.types";

interface CurrencyTableProps {
  currency: any;
  favoriteCurrency: Array<string>;
  toggleFavorite: typeof toggleFavorite;
}

interface FavoriteIconProps {
  id: string;
  toggleFavorite: typeof toggleFavorite;
  filled: boolean;
}

const FavoriteIcon = (props: FavoriteIconProps) => {
  const handleFavoriteIconClick = () => {
    props.toggleFavorite(props.id);
  };

  return (
    <div>
      {props.filled ? (
        <FireFilled onClick={() => handleFavoriteIconClick()} />
      ) : (
        <FireOutlined onClick={() => handleFavoriteIconClick()} />
      )}
    </div>
  );
};

const CurrencyTable = (props: CurrencyTableProps) => {
  const columns = [
    {
      title: "Название валюты",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Сокращенное название",
      dataIndex: "charCode",
      key: "charCode",
    },
    {
      title: "Курс",
      key: "value",
      render: (data: Currency) => (
        <div>
          <span>
            {data.value > data.prevValue ? <RiseOutlined /> : <FallOutlined />}
          </span>
          <span>{data.value}</span>
        </div>
      ),
    },
    {
      title: "Избранное",
      key: "isFavorite",
      sortOrder: "descend" as "descend",
      sorter: (a: any, b: any) => a.isFavorite - b.isFavorite,
      render: (data: Currency) => (
        <div>
          <FavoriteIcon
            id={data.id}
            toggleFavorite={props.toggleFavorite}
            filled={props.favoriteCurrency.some(
              (element) => element === data.id
            )}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="App">
      <Table dataSource={props.currency} columns={columns} />
    </div>
  );
};

function App(props: any) {
  const [isInit, doInitApp] = useState(false);

  useEffect(() => {
    const onbeforeunloadFn = () => {
      props.updateLocalFavorite();
    };

    window.addEventListener("beforeunload", onbeforeunloadFn);
    return () => {
      window.removeEventListener("beforeunload", onbeforeunloadFn);
    };
  });

  if (!isInit) {
    props.initApp();
    doInitApp(true);
  }

  return (
    <div className="App">
      <CurrencyTable
        currency={props.currency}
        toggleFavorite={props.toggleFavorite}
        favoriteCurrency={props.favoriteCurrency}
      />
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    currency: state.currencyState.currency,
    favoriteCurrency: state.currencyState.favoriteCurrency,
  };
};

export default connect(mapStateToProps, {
  initApp,
  toggleFavorite,
  updateLocalFavorite,
})(App);
