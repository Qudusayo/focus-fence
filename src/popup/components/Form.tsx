import React from "react";
import styled from "@emotion/styled";
import { config } from "../config";
import Checkmark from "../assets/checkmark";
import { useEffect, useState } from "react";
import Pin from "../assets/pin";

export type FormType = {
  value: string;
  setValue: (e: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  taskStatus: "pending" | "ongoing" | "completed";
  setShowFooter?: (e: boolean) => void;
};

const Container = styled.form``;

const FormInput = styled.label<{
  bgColor?: string;
}>`
  position: relative;
  border: 1px solid red;
  border-radius: 24px;
  padding: 12px;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  gap: 0.75em;
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : "transparent"};
  border: 1px solid
    ${(props) =>
      props.bgColor
        ? props.bgColor === "transparent"
          ? "#303030"
          : props.bgColor
        : "#303030"};
  transition: all 0.3s linear;
`;

const Input = styled.input<{
  bgColor?: string;
}>`
  border: none;
  outline: none;
  flex: 1;
  /* background-color: ${config.colors.bg}; */
  background-color: transparent;
  color: ${(props) =>
    props.bgColor === config.colors.white ? "#000" : config.colors.white};
  font-family: "Kumbh Sans";
  font-size: 0.9em;
  box-sizing: border-box;
  transition: all 0.3s linear;

  &:disabled {
    cursor: not-allowed;
  }
`;

const Button = styled.button<{
  bgWhite?: boolean;
}>`
  outline: none;
  border: none;
  border-radius: 1em;
  padding: 0.75em 1.25em;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.bgWhite ? "#fff" : config.colors.green};
  color: ${(props) => (props.bgWhite ? config.colors.green : "#fff")};
  font-family: "Kumbh Sans";
  font-size: 0.9em;
  cursor: pointer;
`;

export default function Form({
  value,
  setValue,
  handleSubmit,
  taskStatus,
}: FormType) {
  const [bgColor, setBgColor] = useState("transparent");
  const [isFormPinned, setIsFormPinned] = useState(false);

  const pinInput = () => {
    if (!isFormPinned) {
      chrome?.storage?.sync?.set({ pinned: true }, function () {
        setIsFormPinned(true);
      });
    } else {
      chrome?.storage?.sync?.set({ pinned: false }, function () {
        setIsFormPinned(false);
      });
    }
  };

  useEffect(() => {
    if (taskStatus === "completed") {
      setBgColor(config.colors.green);
    } else if (value && taskStatus === "ongoing") {
      setBgColor(config.colors.white);
    } else if (value) {
      setBgColor(config.colors.bg);
    } else {
      setBgColor("transparent");
    }
  }, [taskStatus, value]);

  useEffect(() => {
    chrome?.storage?.sync?.get(["pinned"], function (result) {
      if (result?.pinned) {
        setIsFormPinned(true);
      } else {
        setIsFormPinned(false);
      }
    });
  }, []);

  return (
    <Container onSubmit={handleSubmit}>
      <FormInput
        bgColor={taskStatus === "ongoing" ? config.colors.white : bgColor}
      >
        <Input
          bgColor={taskStatus === "ongoing" ? config.colors.white : bgColor}
          type="text"
          placeholder="Enter new task..."
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={taskStatus !== "pending"}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5em",
            cursor: "pointer",
          }}
        >
          <button
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              outline: "none",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
            onClick={pinInput}
          >
            <Pin
              fill={
                isFormPinned ? config.colors.green : config.colors.auxiliary
              }
            />
          </button>
          <Button
            bgWhite={taskStatus === "completed"}
            disabled={taskStatus === "completed"}
          >
            {taskStatus === "pending" ? (
              "Start"
            ) : (
              <Checkmark
                fill={taskStatus === "ongoing" ? "#fff" : config.colors.green}
                width={20}
                height={25}
              />
            )}
          </Button>
        </div>
      </FormInput>
    </Container>
  );
}
