import styled from "styled-components";
import Deck from "./Deck";
import theme from "../Theme/theme";

const StyledDeck = () => {
  return (
    <DeckWrapper>
      <Deck />
    </DeckWrapper>
  );
};

const DeckWrapper = styled.div`
  background: ${theme.color.background.primary};
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;

  & > div {
    position: absolute;
    width: 100vw;
    height: 100vh;
    will-change: transform;
    display: flex;
    align-items: center;
    justify-content: center;
    touch-action: none;
  }

  & > div > div {
    background-color: white;
    background-size: auto 85%;
    background-repeat: no-repeat;
    background-position: center center;
    width: 45vh;
    max-width: 300px;
    height: 85vh;
    max-height: 570px;
    will-change: transform;
    border-radius: 10px;
    box-shadow: 0 12.5px 100px -10px rgba(50, 50, 73, 0.4),
      0 10px 10px -10px rgba(50, 50, 73, 0.3);
  }
`;

export default StyledDeck;
