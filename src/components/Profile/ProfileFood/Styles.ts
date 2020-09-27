import styled from "styled-components";
export const StyledMainFoodProfileOrganizer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const StyledMainProfileFood = styled.div`
  overflow: scroll;

  display: flex;
  flex-direction: column;

  align-items: center;
  margin: 20px;
  height: 80vh;
  width: 50%;
`;

export const StyledProfileFoodElement = styled.div`
  display: flex;
  align-items: center;
  background: #698f9b;
  box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 18px;
  width: 40vw;
  height: 150px;
  margin: 20px;
`;

export const StyledProfileFoodInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
export const StyledProfileFoodButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
`;

export const StyledEditButton = styled.button`
  background: #2b8029;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  color: white;
  border: none;
`;

export const StyledDeleteButton = styled.button`
  background: #bc1f1f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  color: white;
  font-family: "Chewy", cursive;
`;
export const StyledPictureDiv = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledFoodPicture = styled.img`
  width: 100%;
  height: 100%;
`;
