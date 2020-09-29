import styled from "styled-components";
export const StyledAddFoodDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const StyledAddFoodForm = styled.form`
  background: #698f9b;
  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  width: 40vw;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const StyledAddFoodTitle = styled.h1`
  color: #698f9b;
`;
export const StyledAddFoodFormH4 = styled.h4`
  color: white;
`;
export const StyledAddFoodDivInput = styled.div`
  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  background: white;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const StyledAddFoodInput = styled.input`
  border: none;
  width: 100%;
  border-radius: 100px;
`;
export const StyledSuggestionDiv = styled.div`
  color: #698f9b;
  background: white;
  border: 1px solid #32a1ce;
`;
export const StyledSuggestionsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;
export const StyledMainAddressDiv = styled.div`
width`;

export const StyledAddButton = styled.button`
  background: #2b8029;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: white;
  font-family: "Chewy", cursive;
  width: 100px;
  height: 40px;
  font-size: 20px;
  margin: 10px;
  :hover {
    background: #228b22;
  }
`;

export const StyledFileUploadComponent = styled.div`
  width: 100%;
`;
export const StyledFileUploadLabel = styled.label`
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  color: white;
  :hover {
    background: grey;
  }
`;
export const StyledFileUploadInput = styled.input`
  display: none;
`;
