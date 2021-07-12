import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";
import ClearIcon from "@material-ui/icons/Clear";
import styled from "styled-components";
import Picker from "emoji-picker-react";

const EmojiPicker = styled.div`
  z-index: 10;
  float: right;
`;

const QuizForm = styled.div`
  display: block;
  background-color: #5abe93;
  width: 40%;
  height: 600px;
  padding: 20px;
  border: solid #fff;
  border-width: 2px;
  border-radius: 15px;
  margin: 20px;
  text-align: left;
`;

const MyProfile = styled.div`
  display: block;
  background-color: #b2d9b7;
  width: 40%;
  height: 600px;
  padding: 20px;
  text-align: left;
  border: solid #fff;
  border-width: 2px;
  border-radius: 15px;
  margin: 20px;
`;

const FormLabel = styled.div`
  display: inline-block;
  width: 140px;
  text-align: left;
`;

const QuizItemHeader = styled.div`
  vertical-align: right;
  display: flex;
  width: 55%;
`;

const QuizEmojiHeader = styled.div`
  vertical-align: right;
  display: flex;
  width: 45%;
`;

const UserDashboard = styled.div`
  text-align: center;
`;

const UserDashboardContent = styled.div`
  display: flex;
  margin: 20px;
  justify-content: center;
  align-items: center;
`;

const Options = styled.div`
  display: flex;
`;

const ItemsContainer = styled.div`
  overflow-y: scroll;
  height: 60%;
`;

const QuizURLSection = styled.div`
  margin-top: 30px;
`;

const QuizTitleSection = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 20px;
`;

const FormOptionsSection = styled.div`
  justify-content: flex-end;
  display: flex;
  text-align: left;
`;

const TextInput = styled.input`
  vertical-align: middle;
  border-radius: 20px;
  width: 60%;
  border: solid #fff;
  border-width: 0px;
  height: 30px;
  color: #000000;
  margin-top: 20px;
  margin-left: 20px;
  font-size: 18px;
`;

const ItemInput = styled.input`
  vertical-align: middle;
  border-radius: 20px;
  width: 60%;
  border: solid #fff;
  border-width: 0px;
  height: 30px;
  color: #000000;
  margin-top: 20px;
  font-size: 18px;
`;

const EmojiInput = styled.input`
  vertical-align: middle;
  text-align: center;
  border-radius: 20px;
  width: 40%;
  border: solid #fff;
  border-width: 0px;
  height: 30px;
  color: #000000;
  margin-top: 20px;
  margin-left: 20px;
  font-size: 18px;
`;

const URLInput = styled.input`
  vertical-align: middle;
  border-radius: 20px;
  width: 100%;
  border: solid #fff;
  border-width: 0px;
  height: 30px;
  color: #000000;
  font-size: 18px;
`;

const AddItemButton = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 0px solid;
  border-radius: 20px;
  background-color: #ffffff;
`;

const CreateButton = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 0px solid;
  border-radius: 20px;
  background-color: #ffffff;
  height: 30px;
`;

const CopyURLButton = styled.button`
  padding: 0.25em 1em;
  border: 2px solid;
  border-radius: 3px;
  background-color: #ffffff;
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
  const [inputList, setInputList] = useState([{ item: "", emoji: "" }]);
  const [quizName, setQuizName] = useState("");
  const [quizURL, setQuizURL] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emojiSelectorClicked, setEmojiSelectorClicked] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject.emoji);
    setEmojiSelectorClicked(false);
  };

  const handleEmojiInputClick = () => {
    setEmojiSelectorClicked(true);
  };

  const handleInputChange = (e, index) => {
    const { item, value } = e.target;
    const list = [...inputList];
    list[index][item] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    if (list.length !== 1) {
      list.splice(index, 1);
      setInputList(list);
    }
  };

  const handleAddItemField = () => {
    setNumQuestions(numQuestions + 1);
    setInputList([...inputList, { item: "" }]);
  };

  const handleAddQuestionField = () => {
    setNumQuestions(numQuestions + 1);
    setInputList([...inputList, { item: "" }]);
  };

  const handleOnCreate = () => {
    console.log(inputList);
  };

  return (
    <>
      <UserDashboard>
        <h1>welcome, QuizMaker</h1>
        <UserDashboardContent>
          <MyProfile>
            <h3>My Profile</h3>
            <form action="" class="form-horizontal">
              <QuizTitleSection>
                <FormLabel>Email:</FormLabel>
                <TextInput
                  type="text"
                  name="title"
                  onchange={(text) => setQuizName(text)}
                />
              </QuizTitleSection>

              <QuizTitleSection>
                <FormLabel>Account Created:</FormLabel>
                <TextInput
                  type="text"
                  name="title"
                  onchange={(text) => setQuizName(text)}
                />
              </QuizTitleSection>

              <QuizTitleSection>
                <FormLabel>Field 3:</FormLabel>
                <TextInput
                  type="text"
                  name="title"
                  onchange={(text) => setQuizName(text)}
                />
              </QuizTitleSection>
            </form>

            <h3>My Quizzes</h3>
          </MyProfile>

          <QuizForm>
            <h3>Create a quiz</h3>
            <QuizTitleSection>
              <FormLabel>Question:</FormLabel>
              <TextInput
                type="text"
                name="title"
                onchange={(text) => setQuizName(text)}
              />
            </QuizTitleSection>
            <div className="question-section"></div>
            <Options>
              <QuizItemHeader>Item</QuizItemHeader>
              <QuizEmojiHeader>Emoji</QuizEmojiHeader>
            </Options>
            <ItemsContainer>
              {emojiSelectorClicked && (
                <EmojiPicker>
                  <Picker onEmojiClick={onEmojiClick} />
                </EmojiPicker>
              )}

              {inputList.map((x, i) => {
                return (
                  <Options>
                    <ItemInput
                      type="itemText"
                      name="item"
                      onChange={(e) => handleInputChange(e, i)}
                    />

                    <EmojiInput
                      type="itemText"
                      name="item"
                      defaultValue={"\u{1F601}"}
                      onClick={() => {
                        handleEmojiInputClick();
                      }}
                      onChange={(e) => handleInputChange(e, i)}
                    />

                    {inputList.length !== 1 ? (
                      <IconButton
                        disableRipple
                        style={{ backgroundColor: "transparent" }}
                        onClick={() => {
                          handleRemoveClick(i);
                        }}
                        aria-label="delete"
                      >
                        <ClearIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        disabled
                        style={{ backgroundColor: "transparent" }}
                        onClick={() => {
                          handleRemoveClick();
                        }}
                        aria-label="delete"
                      >
                        <ClearIcon />
                      </IconButton>
                    )}
                  </Options>
                );
              })}
            </ItemsContainer>
            <AddItemButton
              onClick={() => {
                handleAddItemField();
              }}
            >
              Add Item
            </AddItemButton>

            <AddItemButton
              onClick={() => {
                handleAddQuestionField();
              }}
            >
              Add Question
            </AddItemButton>

            <FormOptionsSection>
              <QuizTitleSection>
                <FormLabel>Quiz URL:</FormLabel>
                <URLInput
                  type="text"
                  name="url"
                  onchange={(text) => setQuizURL(text)}
                />
              </QuizTitleSection>

              <CreateButton
                onClick={() => {
                  handleOnCreate();
                }}
              >
                Create
              </CreateButton>
            </FormOptionsSection>
          </QuizForm>
        </UserDashboardContent>
      </UserDashboard>
    </>
  );
};

export default CreatorDashboard;
