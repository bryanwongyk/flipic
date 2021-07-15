import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import ClearIcon from '@material-ui/icons/Clear';
import MoreVert from '@material-ui/icons/MoreVert';
import Share from '@material-ui/icons/Share';
import DeleteForever from '@material-ui/icons/DeleteForever';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import { keys } from '@material-ui/core/styles/createBreakpoints';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import QuizResult from '../Quiz/QuizResult';

const EmojiPicker = styled.div`
	z-index: 1;
	float: left;
	position: absolute;
`;

const EmojiPickerBackdrop = styled.div`
	position: relative;
	z-index: 2;
	float: left;
	width: 275px;
	direction: rtl;
`;

const EmojiPickerCloseButton = styled.div`
	position: absolute;
	z-index: 2;
	top: 10px;
	right: 0;
	background-color: #fff;
	margin-top: -20px;
	border-radius: 50%;
	width: 20px;
	height: 20px;
	box-shadow: 1px 2px 2px 0px #222;
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
	text-align: left;
	display: block;
	margin-left: auto;
	margin-right: auto;
	@media ${bp.sm} {
		width: 40%;
		margin-left: 20px;
		margin-right: 0;
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
	margin-left: auto;
	margin-right: auto;
	@media ${bp.sm} {
		width: 40%;
		margin-left: 20px;
		margin-right: 0;
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
	color: #fff;
	width: 80%;
	margin: 0 auto;
`;

const UserDashboard = styled.div`
	text-align: center;
	background: ${theme.color.background.primary};
`;

const UserDashboardContent = styled.div`
	display: block;
	margin-bottom: 100px;
	margin-top: 72px;
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
	overflow-y: auto;
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
	border-radius: 20px;
	width: 60%;
	border: solid #fff;
	border-width: 0px;
	height: 30px;
	color: #000000;
	margin-top: 20px;
	margin-left: 20px;
	font-size: 14px;
	padding-left: 10px;
	outline: none;
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
	font-family: 'sofia-pro-medium';

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
	border-radius: 20px;
	width: 80%;
	border: solid #fff;
	border-width: 0px;
	height: 30px;
	color: #000000;
	margin-top: 20px;
	font-size: 14px;
	padding-left: 10px;
	font-family: 'sofia-pro-medium';
	outline: none;
`;

const EmojiInput = styled.input`
	text-align: center;
	border-radius: 20px;
	width: 20%;
	border: solid #fff;
	border-width: 0px;
	height: 30px;
	color: #000000;
	margin-top: 20px;
	margin-left: 20px;
	font-size: 25px;
	outline: none;
`;

const URLInput = styled.input`
	border-radius: 20px;
	width: 100%;
	border: solid #fff;
	border-width: 0px;
	height: 30px;
	color: #000000;
	font-size: 14px;
`;

const AddItemButton = styled.button`
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 0px solid;
	border-radius: 20px;
	background-color: #ffffff;
	font-family: 'sofia-pro-bold';
`;

const CreateButton = styled.button`
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 0px solid;
	border-radius: 20px;
	background-color: #ffffff;
	height: 30px;
	font-family: 'sofia-pro-bold';
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
	width: 96%;
	margin: 20px 0px 0px 0px;
	position: relative;
`;

const MyQuizzesContainer = styled.div`
	overflow-y: auto;
	height: 400px;
`;

const MyQuizTitleText = styled.p`
	font-size: 14px;
	margin: 10px 24px;
	text-align: center;
`;

const ProfileField = styled.p`
	width: 80%;
	text-align: left;
	margin-left: 10px;
	word-wrap: break-word;
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
	const [emojiSelectorClicked, setEmojiSelectorClicked] = useState(false);
	const [quizData, setQuizData] = useState(null);
	const [myQuizzes, setMyQuizzes] = useState(null);
	const [openDel, setOpenDel] = React.useState(false);
	const [openVer, setOpenVer] = React.useState(false);
	const [openShare, setOpenShare] = React.useState(false);
	const [openOptions, setOpenOptions] = React.useState(false);
	const [currentMyQuizSelected, setCurrentMyQuizSelected] = useState(null);
	const [newQuizCreated, setNewQuizCreated] = useState(null);
	const theme = useTheme();
	const [selectedSimpleDialogValue, setSelectedSimpleDialogValue] = React.useState('');
	const [TooltipOpen, setTooltipOpen] = useState(false);
	const [resultsRequested, setResultsRequested] = useState(false);
	useEffect(() => {
		if (!busyGettingAccessToken) {
			setResultsRequested(false);
			LoadAllQuizzes();
		}
	}, [busyGettingAccessToken, numNewQuizzes]);

	const SimpleDialog = props => {
		const { onClose, selectedValue, open } = props;

		const handleClose = () => {
			setTooltipOpen(false);
			onClose(selectedValue);
		};

		const handleListItemClick = value => {
			if (value === 'Share Quiz') {
				setTooltipOpen(true);
				navigator.clipboard.writeText(window.location.origin + '/quiz/' + currentMyQuizSelected.id);
			} else {
				onClose(value);
			}
		};

		return (
			<Dialog hideBackdrop={true} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
				<MuiDialogTitle id="alert-dialog-title">
					<span style={{ color: '#000' }}>Options:</span>
				</MuiDialogTitle>
				<List>
					<ClickAwayListener onClickAway={handleTooltipClose}>
						<div>
							<Tooltip
								PopperProps={{
									disablePortal: true,
								}}
								onClose={handleTooltipClose}
								open={TooltipOpen}
								disableFocusListener
								disableHoverListener
								disableTouchListener
								title="Copied!"
							>
								<ListItem autoFocus button onClick={() => handleListItemClick('Share Quiz')}>
									<ListItemAvatar>
										<Avatar>
											<Share />
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary="Share Quiz" />
								</ListItem>
							</Tooltip>
						</div>
					</ClickAwayListener>
					<ListItem autoFocus button onClick={() => handleListItemClick('Delete Quiz')}>
						<ListItemAvatar>
							<Avatar>
								<DeleteForever />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Delete Quiz" />
					</ListItem>
				</List>
			</Dialog>
		);
	};

	SimpleDialog.propTypes = {
		onClose: PropTypes.func.isRequired,
		open: PropTypes.bool.isRequired,
		selectedValue: PropTypes.string.isRequired,
	};

	const handleSimpleDialogOpen = () => {
		setOpenOptions(true);
	};

	const handleSimpleDialogClose = key => {
		setSelectedSimpleDialogValue(keys);
		setOpenOptions(false);
		handleDialogClickOpen(key);
	};

	const handleDialogClickOpen = key => {
		if (key === 'Delete Quiz') {
			setOpenDel(true);
		}
		if (key === 'Share Quiz') {
			setOpenShare(true);
		}

		if (key === 'Validator') {
			setOpenVer(true);
		}
	};

	const handleDialogClose = key => {
		if (key === 'Delete Quiz') {
			setOpenDel(false);
		}
		if (key === 'Share Quiz') {
			setOpenShare(false);
		}

		if (key === 'Validator') {
			setOpenVer(false);
		}
	};

	const handleTooltipClose = () => {
		setTooltipOpen(false);
	};

	const handleTooltipOpen = () => {
		setTooltipOpen(true);
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

	const POSTQuizDataAndUpdate = data => {
		console.log(accessToken);
		console.log(quizData);
		console.log(JSON.stringify(quizData));

		fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com/api/quiz', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + accessToken },
			body: JSON.stringify(data),
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

	const GetLatestQuizData = () => {
		fetch('http://ec2-54-252-205-131.ap-southeast-2.compute.amazonaws.com/api/quiz-all', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + accessToken },
		})
			.then(response => response.json())
			.then(payload => {
				console.log('GETTING NEW ARRAY FOR NEWEST LINK:', payload);
				setNewQuizCreated(payload.data.slice(-1).pop());
			})
			.catch(error => {
				console.error('Error:', error);
			});
		setOpenShare(true);
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
			//setQuizData(data);
			if (data !== null) {
				POSTQuizDataAndUpdate(data);
				GetLatestQuizData();
			}
		}
	};

	if (resultsRequested) {
		window.scrollTo(0, 0);
		return (
			<div>
				{' '}
				<CreateButton
					onClick={() => {
						setResultsRequested(false);
					}}
				>
					{'< Back To Dashboard'}
				</CreateButton>
				<QuizResult quizId={currentMyQuizSelected.id} didBefore={true} userName={user.nickname}/>
			</div>
		);
	} else {
		window.scrollTo(0, 0);
		return (
			<>
				{busyGettingAccessToken ? (
					<LoadingPage />
				) : (
					<UserDashboard>
						<QuizPageHeading>welcome, {user.nickname}!</QuizPageHeading>
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

								<h3>My Surveys</h3>
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
															top: '18%',
															right: '2%',
															height: '1%',
															width: '1%',
														}}
														onClick={() => {
															setCurrentMyQuizSelected(myQuizzes[i]);
															handleSimpleDialogOpen();
														}}
														aria-label="delete"
													>
														<MoreVert />
													</IconButton>
													<MyQuizBoxes
														onClick={() => {
															setCurrentMyQuizSelected(myQuizzes[i]);
															setResultsRequested(true);
														}}
													>
														<MyQuizTitleText>{myQuizzes[i].name}</MyQuizTitleText>
													</MyQuizBoxes>
													<div>
														<SimpleDialog
															selectedValue={selectedSimpleDialogValue}
															open={openOptions}
															onClose={handleSimpleDialogClose}
														/>
													</div>
													<Dialog
														hideBackdrop={true}
														open={openDel}
														onClose={() => {
															handleDialogClose('Delete Quiz');
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
																You are about to delete "
																{currentMyQuizSelected
																	? currentMyQuizSelected.name
																	: ''}
																". This action cannot be undone. Are you sure?
															</DialogContentText>
														</DialogContent>
														<DialogActions>
															<Button
																onClick={() => {
																	handleDialogClose('Delete Quiz');
																}}
																color="primary"
															>
																No
															</Button>
															<Button
																onClick={() => {
																	HandleDeleteQuiz(currentMyQuizSelected.id);
																	LoadAllQuizzes();
																	handleDialogClose('Delete Quiz');
																}}
																color="primary"
																autoFocus
															>
																Yes
															</Button>
														</DialogActions>
													</Dialog>
												</QuizBoxContainer>
											);
										})}
								</MyQuizzesContainer>
							</MyProfile>

							<QuizForm>
								<h3>Create a Survey</h3>
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
									<EmojiPickerBackdrop>
										<EmojiPickerCloseButton>
											<IconButton
												disableRipple
												style={{ backgroundColor: 'transparent' }}
												onClick={() => {
													setEmojiSelectorClicked(false);
												}}
												aria-label="delete"
											>
												<ClearIcon
													style={{
														fontSize: '14px',
														position: 'absolute',
														marginRight: '-2px',
														marginBottom: '3px',
													}}
												/>
											</IconButton>
										</EmojiPickerCloseButton>
										<EmojiPicker>
											<Picker disableSearchBar={true} onEmojiClick={onEmojiClick} />
										</EmojiPicker>
									</EmojiPickerBackdrop>
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
										hideBackdrop={true}
										open={openShare}
										onClose={() => {
											handleDialogClose('Share Quiz');
										}}
										aria-labelledby="alert-dialog-title"
										aria-describedby="alert-dialog-description"
									>
										<MuiDialogTitle id="alert-dialog-title">
											<span style={{ color: '#000' }}>
												Congratulations on making a new survey!
											</span>
										</MuiDialogTitle>
										<DialogContent>
											<DialogContentText id="alert-dialog-description">
												Here is your survey link: {window.location.origin}/quiz/
												{newQuizCreated ? newQuizCreated.id : ''}
											</DialogContentText>
										</DialogContent>
										<DialogActions>
											<Button
												onClick={() => {
													handleDialogClose('Share Quiz');
												}}
												color="primary"
											>
												Close
											</Button>
											<Button
												onClick={() => {
													navigator.clipboard.writeText(
														window.location.origin +
															'/quiz/' +
															(newQuizCreated ? newQuizCreated.id : ''),
													);
													handleDialogClose('Share Quiz');
												}}
												color="primary"
											>
												Copy
											</Button>
										</DialogActions>
									</Dialog>
									<Dialog
										hideBackdrop={true}
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
	}
};

export default CreatorDashboard;
