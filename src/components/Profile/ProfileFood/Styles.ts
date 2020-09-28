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
  height: 90vh;
  width: 50%;
`;

export const StyledProfileFoodElement = styled.div`
  display: flex;
  background: #698f9b;
  box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 18px;
  width: 40vw;
  height: 120px;
  margin: 20px;
`;

export const StyledProfileFoodInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px;
  width: 50%;
  color: white;
`;
export const StyledProfileFoodButtons = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const StyledEditButton = styled.button`
  background: #2b8029;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  color: white;
  border: none;
  width: 50px;
  height: auto;
  font-size: 100%;
`;

export const StyledDeleteButton = styled.button`
  background: #bc1f1f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  color: white;
  font-family: "Chewy", cursive;
  width: 50px;
  height: auto;
  font-size: 100%;
`;
export const StyledPictureDiv = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledFoodPicture = styled.img`
  width: 50%;
  height: 80%;
  border-radius: 15px;
  @media (max-width: 768px) {
    width: 80%;
    height: 50%;
    border-radius: 10px;
  }
`;
export const StyledProfileFoodTitle = styled.h2`
  margin: 0px;
`;
export const StyledProfileTitle = styled.h1`
  margin-bottom: 0px;
  color: #698f9b;
  font-size: 40px;
`;
