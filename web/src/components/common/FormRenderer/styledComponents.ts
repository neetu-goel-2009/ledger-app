import styled from "styled-components";

export const Button = styled.button`
  width: 300px;
  height: 45px;
  background-color: #2196F3;
  color: #fff;
  border-radius: 25px;
  border: none;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);

  &:hover {
    background-color: #E64A19;
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 45px;
  background: white;
  color: #424242;
  padding: 12px 16px;
  font-size: 14px;
  border: 2px solid #E0E0E0;
  border-radius: 12px;
  margin-left: 10px;
  transition: all 0.3s ease;
  font-family: 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif;

  &:focus {
    outline: none;
    border-color: #2196F3;
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  &:hover {
    border-color: #2196F3;
  }

  option {
    color: #212121;
    background: white;
    font-weight: 400;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 8px 12px;
  }
`;
