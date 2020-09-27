import styled from "styled-components";

export const StyledMainDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  width: 95vw;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    width: 100vw;
  }
`;
export const SearchNFoodList = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    width: 80%;
  }
`;
export const StyledMap = styled.div`
  padding: 40px 0px 0px 0px;
  width: 50%;
  margin-left: 10px;
  @media (max-width: 768px) {
    padding: 10px 0px 0px 0px;
    margin: 0px;
    width: 80%;
  }
`;
export const StyledSearchBar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: center;
  background: white;
  width: 100%;
  height: 30px;
  box-shadow: 0px 4px 4px 2px rgba(0, 0, 0, 0.25);
`;

/* export const StyledInnerSearchBar = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  border: none;
`; */
export const StyledSearchInput = styled.input`
  width: 100vw;
  border: none;
`;
export const StyledFoodList = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: 80vh;
  @media (max-width: 768px) {
    display: none;
  }
`;
export const StyledFoodListRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const StyledFoodItem = styled.div`
  color: white;
  background: rgba(59, 152, 182, 0.4);
  border-radius: 10px;
  width: 40%;
  height: 200px;
  margin: 15px 20px 20px 0px;
  box-shadow: 0px 4px 4px 3px rgba(0, 0, 0, 0.25);
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  :hover {
    background: #008cba;
    width: 41%;
    height: 210px;
  }
`;
export const StyledFoodImage = styled.img`
  width: 50%;
  height: 50%;
  padding: 10px;
  border-radius: 25px;
`;

export const StyledTitle = styled.h3`
  margin: 0px;
`;
