import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import ClearIcon from '@material-ui/icons/Clear';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import bp from '../../Theme/breakpoints';
import theme from '../../Theme/theme';
import Footer from '../../Navigation/Footer/Footer';
import useUserMetadata from '../../../hooks/useUserMetadata';

const EmojiPicker = styled.div`
	z-index: 10;
	float: right;
`;

const QuizForm = styled.div`
	width: 90%;
	background-color: #5abe93;
	height: 600px;
	padding: 20px;
	border: solid #fff;
	border-width: 2px;
	border-radius: 15px;
	margin-bottom: 40px;
	margin-left: 20px;
	text-align: left;
	display: block;
	@media ${bp.sm} {
		width: 40%;
	}
`;

const MyProfile = styled.div`
	width: 90%;
	display: block;
	background-color: #b2d9b7;
	height: 600px;
	padding: 20px;
	text-align: left;
	border: solid #fff;
	border-width: 2px;
	border-radius: 15px;
	margin-bottom: 40px;
	margin-left: 20px;
	@media ${bp.sm} {
		width: 40%;
	}
`;

const FormLabel = styled.div`
	display: inline-block;
	width: 140px;
	text-align: left;
`;

const QuizItemHeader = styled.div`
	vertical-align: right;
	display: flex;
	width: 75%;
`;

const QuizEmojiHeader = styled.div`
	vertical-align: right;
	display: flex;
	width: 25%;
`;

const QuizPageHeading = styled.h1`
	padding-top: 50px;
	font-size: 72px;
	color: #fff;
`;

const UserDashboard = styled.div`
	text-align: center;
	background: ${theme.color.background.primary};
`;

const UserDashboardContent = styled.div`
	display: block;
	margin-bottom: 100px;
	margin-top: 100px;
	align-items: center;
	flex-direction: column;
	@media ${bp.sm} {
		display: flex;
		justify-content: center;
		flex-direction: row;
	}
`;

const Options = styled.div`
	display: flex;
`;

const ItemsContainer = styled.div`
	overflow-y: scroll;
	height: 50%;
`;

const QuizURLSection = styled.div`
	margin-top: 30px;
`;

const QuizTitleSection = styled.div`
	display: flex;
	align-items: flex-end;
	margin-bottom: 20px;
`;

const QuizPrivacySelector = styled.div`
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
	-webkit-user-select: text;
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

const SelectWrapper = styled.div`
	border-radius: 36px;
	width: 60%;
	display: inline-block;
	overflow: hidden;
	background: #ffffff;
	border: 0px solid #ffffff;
	margin-left: 20px;
`;

const Select = styled.select`
	border-radius: 20px;
	width: 100%;
	height: 30px;
	background: white;
	color: black;
	padding-left: 5px;
	font-size: 14px;
	border: solid #fff;
	border-width: 0px;

	option {
		color: black;
		background: white;
		display: block;
		white-space: pre;
		min-height: 20px;
		padding: 0px 2px 1px;
	}
`;

const ItemInput = styled.input`
	-webkit-user-select: text;
	border-radius: 20px;
	width: 80%;
	border: solid #fff;
	border-width: 0px;
	height: 30px;
	color: #000000;
	margin-top: 20px;
	font-size: 18px;
`;

const EmojiInput = styled.input`
	-webkit-user-select: text;
	text-align: center;
	border-radius: 20px;
	width: 20%;
	border: solid #fff;
	border-width: 0px;
	height: 30px;
	color: #000000;
	margin-top: 20px;
	margin-left: 20px;
	font-size: 18px;
`;

const URLInput = styled.input`
	-webkit-user-select: text;
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

const MyQuizBoxes = styled.div`
	display: inline-block;
	width: 20%;
	height: 20%;
	margin: 20px;
	border: solid #fff;
	border-width: 2px;
	border-radius: 15px;
	background-color: #fa885e;
`;

const CreatorDashboard = () => {
	const { accessToken } = useUserMetadata();
	const { UserMetadata } = useUserMetadata();
	const [inputList, setInputList] = useState([{ item: '', emoji: '\u{1F601}' }]);
	const [quizName, setQuizName] = useState('');
	const [quizPrivacy, setQuizPrivacy] = useState('Public');
	const [numItems, setNumItems] = useState(0);
	const [numNewQuizzes, setNumNewQuizzes] = useState(0);
	const [currentEmojiSelectionField, setCurrentEmojiSelectionField] = useState(0);
	const [emojiSelectorClicked, setEmojiSelectorClicked] = useState(null);
	const [quizData, setQuizData] = useState(null);
	const [myQuizzes, setMyQuizzes] = useState(null);

	const LoadAllQuizzes = () => {
		fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com/api/quiz-all', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + accessToken },
		})
			.then(response => response.json())
			.then(payload => {
				console.log('GOT QUIZ Success:', payload);
				setMyQuizzes(payload.data);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};

	useEffect(() => {
		LoadAllQuizzes();
		console.log(accessToken);
		console.log('preparing all quizzes:');
		console.log(myQuizzes);
	}, [accessToken, numNewQuizzes]);

	const onEmojiClick = (event, emojiObject) => {
		const list = [...inputList];
		console.log(emojiObject.emoji);
		list[currentEmojiSelectionField].emoji = emojiObject.emoji;
		setInputList(list);
		setEmojiSelectorClicked(false);
	};

	const handleEmojiInputClick = i => {
		setEmojiSelectorClicked(true);
		setCurrentEmojiSelectionField(i);
	};

	const handleInputChange = (e, index) => {
		const { item, value } = e.target;
		const list = [...inputList];
		list[index].item = value;
		setInputList(list);
	};

	const handleRemoveClick = index => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	const handlePrivacySet = e => {
		const privacySetting = e.target.value;
		console.log(privacySetting);
		setQuizPrivacy(quizPrivacy.slice(0, 0) + privacySetting);
	};

	const handleAddItemField = () => {
		setNumItems(numItems + 1);
		setInputList([...inputList, { item: '', emoji: '\u{1F601}' }]);
	};

	const POSTQuizData = () => {
		console.log(accessToken);

		console.log(quizData);
		console.log(JSON.stringify(quizData));

		fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com/api/quiz', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + accessToken },
			body: JSON.stringify(quizData),
		})
			.then(response => response.json())
			.then(payload => {
				console.log('Success:', payload);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};

	const handleOnCreate = () => {
		console.log(quizName);
		console.log(quizPrivacy);
		console.log([quizName].concat([quizPrivacy]).concat(inputList));
		let data = {
			name: quizName,
			quizCreator: 'grady',
			privacyType: quizPrivacy,
			items: inputList,
		};
		console.log(data);
		setQuizData(data);
		POSTQuizData();
		setNumNewQuizzes(numNewQuizzes + 1);
	};

	return (
		<UserDashboard>
			<QuizPageHeading>welcome, QuizMaker</QuizPageHeading>
			<UserDashboardContent>
				<MyProfile>
					<h3>My Profile</h3>
					<QuizTitleSection>
						<FormLabel>Email:</FormLabel>
						<span>{}</span>
					</QuizTitleSection>

					<h3>My Quizzes</h3>
					{myQuizzes &&
						myQuizzes.map((x, i) => {
							return (
								<MyQuizBoxes>
									<p>{myQuizzes[i].name}</p>
								</MyQuizBoxes>
							);
						})}
				</MyProfile>

				<QuizForm>
					<h3>Create a quiz</h3>
					<QuizTitleSection>
						<FormLabel>Question:</FormLabel>
						<TextInput
							type="text"
							name="quizName"
							autoCapitalize="off"
							autoComplete="off"
							autoCorrect="off"
							value={quizName}
							onChange={e => setQuizName(e.target.value)}
						/>
					</QuizTitleSection>
					<QuizPrivacySelector>
						<FormLabel>Results Privacy:</FormLabel>
						<SelectWrapper>
							<Select onChange={e => handlePrivacySet(e)}>
								<option value="Public">Public</option>
								<option value="Private">Private</option>
							</Select>
						</SelectWrapper>
					</QuizPrivacySelector>
					<div className="question-section"></div>
					<Options>
						<QuizItemHeader>Item</QuizItemHeader>
						<QuizEmojiHeader>Emoji</QuizEmojiHeader>
					</Options>
					{emojiSelectorClicked && (
						<EmojiPicker>
							<Picker onEmojiClick={onEmojiClick} />
						</EmojiPicker>
					)}
					<ItemsContainer>
						{inputList.map((x, i) => {
							return (
								<Options>
									<ItemInput type="itemText" name="item" onChange={e => handleInputChange(e, i)} />
									<EmojiInput
										type="itemText"
										name="item"
										value={inputList[i].emoji}
										onChange={() => null}
										onClick={() => {
											handleEmojiInputClick(i);
										}}
									/>
									{inputList.length !== 1 ? (
										<IconButton
											disableRipple
											style={{ backgroundColor: 'transparent' }}
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
											style={{ backgroundColor: 'transparent' }}
											onClick={() => {
												handleRemoveClick();
											}}
											aria-label="delete"
										>
											<ClearIcon />
										</IconButton>
									)}{' '}
								</Options>
							);
						})}
					</ItemsContainer>
					<FormOptionsSection>
						<AddItemButton
							onClick={() => {
								handleAddItemField();
							}}
						>
							Add Item
						</AddItemButton>
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
			<Footer />
		</UserDashboard>
	);
};

export default CreatorDashboard;
