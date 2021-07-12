import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";
import ClearIcon from "@material-ui/icons/Clear";
import styled from "styled-components";

const QuizForm = styled.div`
  background-color: #5abe93;
  width: 450px;
  min-height: 200px;
  max-height: 450px;
  height: min-content;
  padding: 20px;
  display: block;
  justify-content: space-evenly;
  border: solid #fff;
  border-width: 2px;
  border-radius: 15px;
  margin: 20px;
`;

const UserDashboard = styled.div`
  text-align: center;
`;

const UserDashboardContent = styled.div`
  display: flex;
  margin: 20px;
`;

const MyProfile = styled.div`
  background-color: #b2d9b7;
  width: 450px;
  min-height: 200px;
  max-height: 450px;
  height: min-content;
  padding: 20px;
  display: block;
  justify-content: space-evenly;
  border: solid #fff;
  border-width: 2px;
  border-radius: 15px;
  margin: 20px;
`;

const Options = styled.div`
  display: block;
`;

const ItemsContainer = styled.div`
  overflow-y: scroll;
  max-height: 200px;
`;

const QuizURLSection = styled.div`
  margin-top: 30px;
`;

const QuizTitleSection = styled.div`
  margin-bottom: 20px;
`;

const FormOptionsSection = styled.div`
  margin-top: 10px;
  justify-content: flex-end;
  display: flex;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const CreatorDashboard = () => {
  const classes = useStyles();
  const [inputList, setInputList] = useState([{ item: "" }]);
  const [quizName, setQuizName] = useState("");
  const [quizURL, setQuizURL] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);

  const handleInputChange = (e, index) => {
    const { item, value } = e.target;
    const list = [...inputList];
    list[index][item] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddField = () => {
    setNumQuestions(numQuestions + 1);
    setInputList([...inputList, { item: "" }]);
  };

  const handleOnCreate = () => {
    return null;
  };

  return (
    <>
      <UserDashboard>
        <h1>welcome, QuizMaker</h1>
        <UserDashboardContent>
          <MyProfile>
            <h3>My Profile</h3>
            <div className="quizTitle-section">
              <span>Quiz Title:</span>
              <input
                type="text"
                name="title"
                onchange={(text) => setQuizName(text)}
              />
            </div>
            <div className="question-section"></div>

            <div className="quizURL-section">
              <span>Quiz URL:</span>
              <input
                type="text"
                name="url"
                onchange={(text) => setQuizURL(text)}
              />
            </div>
          </MyProfile>

          <QuizForm>
            <h3>Create a quiz</h3>
            <QuizTitleSection>
              <span>Quiz Title:</span>
              <input
                type="text"
                name="title"
                onchange={(text) => setQuizName(text)}
              />
            </QuizTitleSection>
            <div className="question-section">
              <div className="question-text">{"Items:"}</div>
            </div>
            <ItemsContainer>
              {inputList.map((x, i) => {
                return (
                  <Options>
                    <IconButton
                      disableRipple
                      style={{ backgroundColor: "transparent" }}
                      onClick={() => {
                        handleRemoveClick();
                      }}
                      aria-label="delete"
                    >
                      <ClearIcon />
                    </IconButton>
                    <input
                      type="itemText"
                      name="item"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </Options>
                );
              })}
            </ItemsContainer>

            <QuizURLSection>
              <span>Quiz URL:</span>
              <input
                type="text"
                name="url"
                onchange={(text) => setQuizURL(text)}
              />
            </QuizURLSection>

            <FormOptionsSection>
              <Button
                onClick={() => {
                  handleAddField();
                }}
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<AddIcon />}
              >
                Add Item
              </Button>

              <Button
                onClick={() => {
                  handleOnCreate();
                }}
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SendIcon />}
              >
                Create
              </Button>
            </FormOptionsSection>
          </QuizForm>
        </UserDashboardContent>
      </UserDashboard>
    </>
  );
};

export default CreatorDashboard;
