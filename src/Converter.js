import React, { useEffect, useState } from "react";
import { Card, Form, Input, Select } from "antd";
import { SiBitcoinsv } from "react-icons/si";
function Converter() {
  const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates";

  const defaultFirstSelectValue = "Bitcoin";
  const defaultSecondSelectValue = "Ether";

  const [cryptoList, setCryptoList] = useState([]);
  const [inputValue, setInputValue] = useState("0");
  const [firstSelect, setFirstSelect] = useState(defaultFirstSelectValue);
  const [SecondSelect, setSecondSelect] = useState(defaultFirstSelectValue);
  const [result, setResult] = useState("0");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (cryptoList.length === 0) return;
    const firstSelectRate = cryptoList.find((item) => {
      return item.value === firstSelect;
    }).rate;
    const SecondSelectRate = cryptoList.find((item) => {
      return item.value === SecondSelect;
    }).rate;

    const resultvalue = (inputValue * SecondSelectRate) / firstSelectRate;
    setResult(resultvalue.toFixed(6));

    console.log(firstSelectRate, SecondSelectRate);
  }, [inputValue, firstSelect, SecondSelect]);

  async function fetchData() {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();

    const data = jsonData.rates;
    const tempArray = Object.entries(data).map((item) => {
      return {
        value: item[1].name,
        label: item[1].name,
        rate: item[1].value,
      };
    });
    setCryptoList(tempArray);
  }

  return (
    <div className="Container">
      <Card
        className="Crypto-card"
        title={
          <h1>
            <SiBitcoinsv />
            Crypto-Converter
          </h1>
        }
      >
        <Form size="large">
          <Form.Item>
            <Input onChange={(event) => setInputValue(event.target.value)} />
          </Form.Item>
        </Form>
        <div className="select-box">
          <Select
            style={{ width: "155px" }}
            defaultValue={defaultFirstSelectValue}
            options={cryptoList}
            onChange={(value) => setFirstSelect(value)}
          />
          <Select
            style={{ width: "155px" }}
            defaultValue={defaultSecondSelectValue}
            options={cryptoList}
            onChange={(value) => setSecondSelect(value)}
          />
        </div>
        <p>
          {inputValue} {firstSelect} == {result} {SecondSelect}
        </p>
      </Card>
    </div>
  );
}

export default Converter;
