import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import ClearIcon from '@material-ui/icons/Clear';
import MoreVert from '@material-ui/icons/MoreVert';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import bp from '../../Theme/breakpoints';
import theme from '../../Theme/theme';
import Footer from '../../Navigation/Footer/Footer';
import useUserMetadata from '../../../hooks/useUserMetadata';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import LoadingPage from '../LoadingPage/LoadingPage';

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

const ProfileFormLabel = styled.div`
	display: inline-block;
	text-align: left;
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

const ProfileTitleSection = styled.div`
	display: flex;
	margin-bottom: 15px;
	margin-top: 20px;
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
	width: 100%;
	height: 100%;
	border: solid #fff;
	border-width: 2px;
	border-radius: 15px;
	background-color: #fa885e;
	box-shadow: 1px 2px 5px 0px #222;
`;

const QuizBoxContainer = styled.div`
	display: inline-block;
	width: 22%;
	height: 28%;
	margin: 20px;
	position: relative;
`;

const MyQuizzesContainer = styled.div`
	overflow-y: scroll;
	height: 400px;
`;

const MyQuizTitleText = styled.p`
	font-size: 14px;
	margin: 10px;
	text-align: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const ProfileField = styled.p`
	width: 100%;
	text-align: left;
	margin-left: 10px;
`;

const ProfileFieldsContainer = styled.div`
	margin-bottom: 20px;
`;

const CreatorDashboard = () => {
	const [busyGettingAccessToken, setIsBusyGettingAccessToken] = useState(true);

	const { accessToken, user } = useUserMetadata(setIsBusyGettingAccessToken);
	// const { UserMetadata } = useUserMetadata();

	const [inputList, setInputList] = useState([{ item: '', emoji: '\u{1F601}' }]);
	const [quizName, setQuizName] = useState('');
	const [quizPrivacy, setQuizPrivacy] = useState('Public');
	const [numItems, setNumItems] = useState(0);
	const [numNewQuizzes, setNumNewQuizzes] = useState(0);
	const [currentEmojiSelectionField, setCurrentEmojiSelectionField] = useState(0);
	const [emojiSelectorClicked, setEmojiSelectorClicked] = useState(null);
	const [quizData, setQuizData] = useState(null);
	const [myQuizzes, setMyQuizzes] = useState(null);
	const [openDel, setOpenDel] = React.useState(false);
	const [openVer, setOpenVer] = React.useState(false);
	const theme = useTheme();

	const handleDialogClickOpen = key => {
		if (key === 'Deleter') {
			setOpenDel(true);
		}

		if (key === 'Validator') {
			setOpenVer(true);
		}
	};

	const handleDialogClose = key => {
		if (key === 'Deleter') {
			setOpenDel(false);
		}

		if (key === 'Validator') {
			setOpenVer(false);
		}
	};
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
		if (!busyGettingAccessToken) {
			LoadAllQuizzes();
		}
	}, [busyGettingAccessToken, numNewQuizzes]);

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

	const ValidateFields = () => {
		if (quizName === '') {
			return 1;
		}

		for (let i = 0; i < inputList.length; i++) {
			if (inputList[i].item === '') {
				return 1;
			}
		}

		return 0;
	};

	const ClearAllFields = () => {
		setQuizName('');
		setInputList([{ item: '', emoji: '\u{1F601}' }]);
	};

	const POSTQuizDataAndUpdate = () => {
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
				setNumNewQuizzes(numNewQuizzes + 1);
				ClearAllFields();
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};

	const HandleDeleteQuiz = quizId => {
		fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com/api/quiz/' + quizId, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + accessToken },
		})
			.then(response => response.json())
			.then(payload => {
				console.log('Delete QUIZ Success:', payload);
				setMyQuizzes(payload.data);
			})
			.catch(error => {
				console.error('Error:', error);
			});
		setNumNewQuizzes(numNewQuizzes - 1);
	};

	const handleOnCreate = () => {
		if (ValidateFields() === 1) {
			handleDialogClickOpen('Validator');
		} else {
			console.log(quizName);
			console.log(quizPrivacy);
			console.log([quizName].concat([quizPrivacy]).concat(inputList));
			let data = {
				name: quizName,
				quizCreator: user.nickname,
				privacyType: quizPrivacy,
				items: inputList,
			};
			console.log(data);
			setQuizData(data);
			POSTQuizDataAndUpdate();
		}
	};

	return (
		<>
			{busyGettingAccessToken ? (
				<LoadingPage />
			) : (
				<UserDashboard>
					<QuizPageHeading>welcome, QuizMaker</QuizPageHeading>
					<UserDashboardContent>
						<MyProfile>
							<h3>My Profile</h3>
							<ProfileFieldsContainer>
								<ProfileTitleSection>
									<ProfileFormLabel>User: </ProfileFormLabel>
									<ProfileField>{user.nickname}</ProfileField>
								</ProfileTitleSection>
								<ProfileTitleSection>
									<ProfileFormLabel>Email: </ProfileFormLabel>
									<ProfileField>{user.email}</ProfileField>
								</ProfileTitleSection>
							</ProfileFieldsContainer>

							<h3>My Quizzes</h3>
							<MyQuizzesContainer>
								{myQuizzes &&
									myQuizzes.map((x, i) => {
										return (
											<QuizBoxContainer>
												<IconButton
													disableRipple
													style={{
														backgroundColor: 'transparent',
														position: 'absolute',
														top: '10%',
														left: '65%',
														height: '1%',
														width: '1%',
													}}
													onClick={() => {
														handleDialogClickOpen('Deleter');
													}}
													aria-label="delete"
												>
													<MoreVert />
												</IconButton>
												<MyQuizBoxes>
													<Dialog
														open={openDel}
														onClose={() => {
															handleDialogClose('Deleter');
														}}
														aria-labelledby="alert-dialog-title"
														aria-describedby="alert-dialog-description"
													>
														<MuiDialogTitle id="alert-dialog-title">
															<span style={{ color: '#000' }}>
																Do you want to delete this quiz?
															</span>
														</MuiDialogTitle>
														<DialogContent>
															<DialogContentText id="alert-dialog-description">
																This action cannot be undone. Are you sure?
															</DialogContentText>
														</DialogContent>
														<DialogActions>
															<Button
																onClick={() => {
																	handleDialogClose('Deleter');
																}}
																color="primary"
															>
																No
															</Button>
															<Button
																onClick={() => {
																	HandleDeleteQuiz(myQuizzes[i].id);
																	handleDialogClose('Deleter');
																}}
																color="primary"
																autoFocus
															>
																Yes
															</Button>
														</DialogActions>
													</Dialog>
												</MyQuizBoxes>
												<MyQuizTitleText>{myQuizzes[i].name}</MyQuizTitleText>
											</QuizBoxContainer>
										);
									})}
							</MyQuizzesContainer>
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
											<ItemInput
												type="itemText"
												name="item"
												value={inputList[i].item}
												onChange={e => handleInputChange(e, i)}
											/>
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
								<Dialog
									open={openVer}
									onClose={() => {
										handleDialogClose('Validator');
									}}
									aria-labelledby="alert-dialog-title"
									aria-describedby="alert-dialog-description"
								>
									<MuiDialogTitle id="alert-dialog-title">
										<span style={{ color: '#000' }}>You have some incomplete fields!</span>
									</MuiDialogTitle>
									<DialogContent>
										<DialogContentText id="alert-dialog-description">
											Double check to make sure you have filled in everything.
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button
											onClick={() => {
												handleDialogClose('Validator');
											}}
											color="primary"
										>
											Ok
										</Button>
									</DialogActions>
								</Dialog>
							</FormOptionsSection>
						</QuizForm>
					</UserDashboardContent>
					<Footer />
				</UserDashboard>
			)}
		</>
	);
};

export default CreatorDashboard;
