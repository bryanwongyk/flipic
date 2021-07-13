export default {
    quiz_ID: '000',
    num_questions: 1, // number of questions in the survey
    num_choices: 5, // number of picks that the user needs to make
    topic: "What is your favourite food?",
    questions: [
        {
            question: "What is your go-to food?",
            choices: [
                ({
                    text: 'Burgers',
                    emoji: 'U+1F354',
                }, {
                    text: 'Chips',
                    emoji: 'U+1F35F',
                }),
                ({
                    text: 'Chips',
                    emoji: 'U+1F35F',
                }, {
                    text: 'Pizza',
                    emoji: 'U+1F355',
                }),
                ({
                    text: 'Pizza',
                    emoji: 'U+1F355',
                }, {
                    text: 'Taco',
                    emoji: 'U+1F32E',
                }),
                ({
                    text: 'Taco',
                    emoji: 'U+1F32E',
                }, {
                    text: 'Steak',
                    emoji: 'U+1F969',
                }),
                ({
                    text: 'Steak',
                    emoji: 'U+1F969',
                }, {
                    text: 'Cheese',
                    emoji: 'U+1F9C0',
                }),
            ]
        }
    ]
}