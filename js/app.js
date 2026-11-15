/* Bandage Exams - exam player (runs entirely in the browser, no backend). */

const EMPTY_EXAM = {
    id: '',
    title: 'No Exam Selected',
    description: '',
    authorName: '',
    authorInfo: '',
    questions: [],
    durationMinutes: 50
};

let examCatalog = {};
let activeExam = { ...EMPTY_EXAM };
let activeExamQuestions = [];
let deferredInstallPrompt = null;

function escapeHtml(value) {
    return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function shuffleQuestions(questions) {
    const shuffled = [...questions];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }

    return shuffled;
}

function getOptionLetter(index) {
    return String.fromCharCode(65 + index);
}

function getChoiceText(question, answerIndex) {
    if (answerIndex === null || answerIndex === undefined || answerIndex < 0) {
        return 'Not answered';
    }

    const answerLetter = getOptionLetter(answerIndex);
    const answerText = question.choices[answerIndex] || '';
    return `${answerLetter}. ${answerText}`;
}

function getDurationDisplay(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function getFirstExam(catalog) {
    const exams = Object.values(catalog);
    return exams.length ? exams[0] : { ...EMPTY_EXAM };
}

/* Turns the plain-text question blocks in js/exams-data.js into question objects. */
function parseQuestionBlocks(input) {
    const normalized = String(input || '').replace(/\r/g, '').trim();
    if (!normalized) {
        throw new Error('This exam has no questions.');
    }

    const blocks = normalized
        .split(/\n\s*---+\s*\n/g)
        .map((block) => block.trim())
        .filter(Boolean);

    return blocks.map((block, index) => {
        const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
        const result = {
            lecture: '',
            question: '',
            explanation: '',
            imageUrl: '',
            choices: []
        };
        let answerLetter = '';

        lines.forEach((line) => {
            const lectureMatch = line.match(/^LECTURE\s*:\s*(.+)$/i);
            if (lectureMatch) {
                result.lecture = lectureMatch[1].trim();
                return;
            }

            const questionMatch = line.match(/^QUESTION\s*:\s*(.+)$/i);
            if (questionMatch) {
                result.question = questionMatch[1].trim();
                return;
            }

            const explanationMatch = line.match(/^EXPLANATION\s*:\s*(.+)$/i);
            if (explanationMatch) {
                result.explanation = explanationMatch[1].trim();
                return;
            }

            const imageMatch = line.match(/^IMAGE_URL\s*:\s*(.+)$/i);
            if (imageMatch) {
                result.imageUrl = imageMatch[1].trim();
                return;
            }

            const answerMatch = line.match(/^ANSWER\s*:\s*([A-E])$/i);
            if (answerMatch) {
                answerLetter = answerMatch[1].toUpperCase();
                return;
            }

            const choiceMatch = line.match(/^([A-E])\s*:\s*(.+)$/i);
            if (choiceMatch) {
                result.choices.push({
                    label: choiceMatch[1].toUpperCase(),
                    text: choiceMatch[2].trim()
                });
            }
        });

        if (!result.question) {
            throw new Error(`Question block ${index + 1} is missing QUESTION.`);
        }

        if (result.choices.length < 2) {
            throw new Error(`Question block ${index + 1} must have at least 2 choices.`);
        }

        if (!answerLetter) {
            throw new Error(`Question block ${index + 1} is missing ANSWER.`);
        }

        const availableLetters = result.choices.map((choice) => choice.label);
        if (!availableLetters.includes(answerLetter)) {
            throw new Error(`Question block ${index + 1} has ANSWER ${answerLetter}, but that choice does not exist.`);
        }

        result.correct = answerLetter;
        return result;
    });
}

function buildCatalog(definitions) {
    const catalog = {};

    (definitions || []).forEach((definition) => {
        try {
            const questions = parseQuestionBlocks(definition.questions).map((question) => ({
                question: question.question,
                choices: question.choices.map((choice) => choice.text),
                correct: question.correct,
                lecture: question.lecture || 'General',
                image: question.imageUrl || '',
                explanation: question.explanation || ''
            }));

            catalog[definition.id] = {
                id: definition.id,
                title: definition.title,
                description: definition.description || '',
                durationMinutes: definition.durationMinutes || questions.length || 50,
                authorName: definition.authorName || '',
                authorInfo: definition.authorInfo || '',
                questions
            };
        } catch (error) {
            console.error(`Exam "${definition.title}" was skipped:`, error.message);
        }
    });

    return catalog;
}

const state = {
    currentView: 'view-selection',
    currentExamId: '',
    currentQuestionIndex: 0,
    answers: [],
    reviewMarks: [],
    visited: [],
    timeRemaining: 0,
    timerInterval: null
};

const app = {
    init() {
        const installAppBtn = document.getElementById('install-app-btn');
        if (installAppBtn) {
            installAppBtn.onclick = async () => {
                if (!deferredInstallPrompt) {
                    return;
                }

                deferredInstallPrompt.prompt();
                await deferredInstallPrompt.userChoice;
                deferredInstallPrompt = null;
                installAppBtn.hidden = true;
            };
        }

        document.querySelectorAll('[data-go-home]').forEach((element) => {
            element.addEventListener('click', () => this.goHome());
        });

        this.refreshExamCatalog();
        this.showView(state.currentView);
    },

    goHome() {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
        this.showView('view-selection');
    },

    refreshExamCatalog() {
        examCatalog = buildCatalog(window.BANDAGE_EXAMS);
        activeExam = getFirstExam(examCatalog);
        activeExamQuestions = [...activeExam.questions];
        state.currentExamId = activeExam.id;

        this.renderExamSelection();
        this.applyCurrentExamUi();
    },

    showView(viewId) {
        document.querySelectorAll('.view').forEach((view) => view.classList.remove('active'));
        const nextView = document.getElementById(viewId);
        if (nextView) {
            nextView.classList.add('active');
            state.currentView = viewId;
            window.scrollTo(0, 0);
        }
    },

    renderExamSelection() {
        const list = document.getElementById('exam-selection-list');
        if (!list) {
            return;
        }

        list.innerHTML = '';
        const exams = Object.values(examCatalog);

        if (!exams.length) {
            list.innerHTML = '<p class="exam-empty">No exams are available yet.</p>';
            return;
        }

        exams.forEach((exam, index) => {
            const label = document.createElement('label');
            label.className = 'exam-choice';
            label.htmlFor = `event-${exam.id}`;
            label.innerHTML = `
                <input type="radio" name="exam-event" value="${escapeHtml(exam.id)}" id="event-${escapeHtml(exam.id)}" ${index === 0 ? 'checked' : ''}>
                <span class="exam-choice-body">
                    <span class="exam-choice-title">${escapeHtml(exam.title)}</span>
                    <span class="exam-choice-desc">${escapeHtml(exam.description)}</span>
                </span>
                <span class="exam-choice-meta">${exam.questions.length} questions<br>${exam.durationMinutes} min</span>
            `;
            list.appendChild(label);
        });
    },

    getSelectedExamId() {
        const selectedExam = document.querySelector('input[name="exam-event"]:checked');
        return selectedExam ? selectedExam.value : state.currentExamId;
    },

    setCurrentExam(examId) {
        const nextExam = examCatalog[examId] || getFirstExam(examCatalog);
        activeExam = nextExam;
        activeExamQuestions = [...nextExam.questions];
        state.currentExamId = nextExam.id;
        this.applyCurrentExamUi();
    },

    applyCurrentExamUi() {
        document.querySelectorAll('.current-exam-title').forEach((element) => {
            element.textContent = activeExam.title || 'No Exam Selected';
        });

        document.querySelectorAll('.current-exam-description').forEach((element) => {
            element.textContent = activeExam.description || '';
        });

        document.querySelectorAll('.current-exam-count').forEach((element) => {
            element.textContent = activeExam.questions.length;
        });

        document.querySelectorAll('.current-exam-duration').forEach((element) => {
            element.textContent = activeExam.durationMinutes;
        });
    },

    selectExamAndProceed() {
        this.setCurrentExam(this.getSelectedExamId());
        if (!activeExam.id || !activeExam.questions.length) {
            alert('There are no exams ready to open yet.');
            return;
        }
        this.showView('view-candidate-dashboard');
    },

    startExam() {
        if (state.currentView === 'view-instructions-2') {
            const checkbox = document.getElementById('agree-checkbox');
            if (checkbox && !checkbox.checked) {
                alert("Please check the 'ready' box to confirm you have read the instructions before continuing.");
                return;
            }
        }

        this.setCurrentExam(state.currentExamId);
        this.resetExamState();
        activeExamQuestions = shuffleQuestions(activeExam.questions);
        this.showView('view-exam');
        this.startTimer();
        this.initQuestionPalette();
        this.loadQuestion(0);
    },

    endTest() {
        if (!document.getElementById('end-test-btn').disabled) {
            const attempted = state.answers.filter((answer) => answer !== null).length;
            document.getElementById('modal-attempted-count').textContent = attempted;
            document.getElementById('modal-total-count').textContent = activeExamQuestions.length;
            document.getElementById('end-test-modal').style.display = 'flex';
        }
    },

    closeEndTestModal() {
        document.getElementById('end-test-modal').style.display = 'none';
    },

    confirmEndTest() {
        document.getElementById('end-test-modal').style.display = 'none';
        clearInterval(state.timerInterval);
        this.finishExam();
    },

    finishExam() {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
        this.saveCurrentAnswer();

        const total = activeExamQuestions.length;
        let attempted = 0;
        let correct = 0;
        const lectureMap = new Map();

        state.answers.forEach((answer, index) => {
            const question = activeExamQuestions[index];
            const lectureName = question.lecture || 'Unknown Lecture';
            const answerLetter = answer !== null ? getOptionLetter(answer) : null;
            const isCorrect = answerLetter !== null && answerLetter === question.correct;

            if (answer !== null) {
                attempted++;
                if (isCorrect) {
                    correct++;
                }
            }

            if (!lectureMap.has(lectureName)) {
                lectureMap.set(lectureName, {
                    lecture: lectureName,
                    total: 0,
                    attempted: 0,
                    correct: 0,
                    questions: []
                });
            }

            const lectureData = lectureMap.get(lectureName);
            lectureData.total++;
            if (answer !== null) {
                lectureData.attempted++;
            }
            if (isCorrect) {
                lectureData.correct++;
            }

            lectureData.questions.push({
                number: index + 1,
                question: question.question,
                yourAnswer: getChoiceText(question, answer),
                correctAnswer: getChoiceText(question, question.correct.charCodeAt(0) - 65),
                explanation: question.explanation,
                status: answer === null ? 'missed' : (isCorrect ? 'correct' : 'wrong')
            });
        });

        document.getElementById('res-total').textContent = total;
        document.getElementById('res-attempted').textContent = attempted;
        document.getElementById('res-correct').textContent = correct;
        document.getElementById('res-incorrect').textContent = attempted - correct;
        document.getElementById('res-score').textContent = total ? Math.round((correct / total) * 100) : 0;

        const strongLectures = [];
        const intermediateLectures = [];
        const weakLectures = [];

        const lectureResults = Array.from(lectureMap.values()).map((lectureData) => {
            const score = lectureData.total ? Math.round((lectureData.correct / lectureData.total) * 100) : 0;

            if (score >= 75) {
                strongLectures.push(`${lectureData.lecture} (${score}%)`);
            } else if (score >= 40) {
                intermediateLectures.push(`${lectureData.lecture} (${score}%)`);
            } else {
                weakLectures.push(`${lectureData.lecture} (${score}%)`);
            }

            return {
                ...lectureData,
                score
            };
        });

        this.renderLectureStrength('strong-lectures', strongLectures);
        this.renderLectureStrength('intermediate-lectures', intermediateLectures);
        this.renderLectureStrength('weak-lectures', weakLectures);
        this.renderLectureReview(lectureResults);
        this.showView('view-completion');
    },

    resetExamState() {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
        state.currentQuestionIndex = 0;
        state.answers = new Array(activeExam.questions.length).fill(null);
        state.reviewMarks = new Array(activeExam.questions.length).fill(false);
        state.visited = new Array(activeExam.questions.length).fill(false);
        state.timeRemaining = activeExam.durationMinutes * 60;

        this.renderTimer();

        const endBtn = document.getElementById('end-test-btn');
        const reviewCheckbox = document.getElementById('mark-review-check');
        const modal = document.getElementById('end-test-modal');

        if (endBtn) {
            endBtn.disabled = true;
            endBtn.classList.remove('active');
        }
        if (reviewCheckbox) {
            reviewCheckbox.checked = false;
        }
        if (modal) {
            modal.style.display = 'none';
        }
    },

    renderTimer() {
        const text = getDurationDisplay(state.timeRemaining);
        document.querySelectorAll('.timer-text').forEach((element) => {
            element.textContent = text;
        });
    },

    renderLectureStrength(elementId, lectures) {
        const list = document.getElementById(elementId);
        list.innerHTML = '';

        if (!lectures.length) {
            const item = document.createElement('li');
            item.textContent = 'None';
            list.appendChild(item);
            return;
        }

        lectures.forEach((lecture) => {
            const item = document.createElement('li');
            item.textContent = lecture;
            list.appendChild(item);
        });
    },

    renderLectureReview(lectureResults) {
        const container = document.getElementById('lecture-review-list');
        container.innerHTML = '';

        lectureResults.forEach((lectureData) => {
            const section = document.createElement('section');
            section.className = 'lecture-review-section';

            const header = document.createElement('div');
            header.className = 'lecture-review-header';
            header.innerHTML = `
                <h4>${escapeHtml(lectureData.lecture)}</h4>
                <div class="lecture-meta">Correct ${lectureData.correct}/${lectureData.total} | Attempted ${lectureData.attempted}/${lectureData.total} | Score ${lectureData.score}%</div>
            `;

            const questionList = document.createElement('div');
            questionList.className = 'lecture-question-list';

            lectureData.questions.forEach((questionData) => {
                const questionItem = document.createElement('div');
                questionItem.className = 'review-question-item';

                const statusClass =
                    questionData.status === 'correct'
                        ? 'review-answer-correct'
                        : questionData.status === 'wrong'
                            ? 'review-answer-wrong'
                            : 'review-answer-missed';

                questionItem.innerHTML = `
                    <div class="review-question-text">Q${questionData.number}. ${escapeHtml(questionData.question)}</div>
                    <div class="review-answer-line ${statusClass}"><strong>Your answer:</strong> ${escapeHtml(questionData.yourAnswer)}</div>
                    <div class="review-answer-line"><strong>Correct answer:</strong> ${escapeHtml(questionData.correctAnswer)}</div>
                    ${questionData.explanation ? `<div class="review-answer-line review-explanation">${escapeHtml(questionData.explanation)}</div>` : ''}
                `;

                questionList.appendChild(questionItem);
            });

            section.appendChild(header);
            section.appendChild(questionList);
            container.appendChild(section);
        });
    },

    startTimer() {
        const endBtn = document.getElementById('end-test-btn');
        const halfTime = (activeExam.durationMinutes * 60) / 2;

        state.timerInterval = setInterval(() => {
            if (state.timeRemaining <= 0) {
                this.finishExam();
                return;
            }

            state.timeRemaining--;

            if (state.timeRemaining <= halfTime) {
                endBtn.disabled = false;
                endBtn.classList.add('active');
            }

            this.renderTimer();
        }, 1000);
    },

    initQuestionPalette() {
        const grid = document.getElementById('palette-grid');
        grid.innerHTML = '';

        activeExamQuestions.forEach((question, index) => {
            const button = document.createElement('button');
            button.className = 'q-btn';
            button.textContent = index + 1;
            button.id = `q-btn-${index}`;
            button.setAttribute('aria-label', `Go to question ${index + 1}`);
            button.onclick = () => this.jumpToQuestion(index);
            grid.appendChild(button);
        });

        document.getElementById('total-q-count').textContent = activeExamQuestions.length;
        this.updateStats();
    },

    loadQuestion(index) {
        if (state.currentQuestionIndex !== index) {
            this.saveCurrentAnswer();
        }

        state.currentQuestionIndex = index;
        state.visited[index] = true;

        const question = activeExamQuestions[index];
        document.getElementById('question-number-display').textContent = `Question ${index + 1} of ${activeExamQuestions.length}`;
        document.getElementById('q-text').textContent = question.question;

        const imgContainer = document.getElementById('q-image-container');
        const imgEl = document.getElementById('q-image');
        if (question.image) {
            imgEl.src = question.image;
            imgContainer.style.display = 'block';
        } else {
            imgContainer.style.display = 'none';
        }

        const optionsList = document.getElementById('options-list');
        optionsList.innerHTML = '';
        question.choices.forEach((option, optionIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option-item';

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'current-question-options';
            input.id = `opt-${optionIndex}`;
            input.value = optionIndex;

            if (state.answers[index] === optionIndex) {
                input.checked = true;
            }

            input.onchange = () => {
                this.saveCurrentAnswer();
                this.updateStats();
            };

            const label = document.createElement('label');
            label.htmlFor = `opt-${optionIndex}`;
            label.textContent = `${getOptionLetter(optionIndex)}. ${option}`;

            optionDiv.appendChild(input);
            optionDiv.appendChild(label);
            optionsList.appendChild(optionDiv);
        });

        document.getElementById('mark-review-check').checked = state.reviewMarks[index];
        this.updateStats();

        const scroller = document.querySelector('.question-scroll-content');
        if (scroller) {
            scroller.scrollTop = 0;
        }
    },

    saveCurrentAnswer() {
        const selected = document.querySelector('input[name="current-question-options"]:checked');
        if (selected) {
            state.answers[state.currentQuestionIndex] = parseInt(selected.value, 10);
        }
    },

    saveAndNext() {
        this.saveCurrentAnswer();

        if (state.currentQuestionIndex < activeExamQuestions.length - 1) {
            this.loadQuestion(state.currentQuestionIndex + 1);
        } else {
            this.loadQuestion(0);
        }
    },

    toggleReview() {
        const isChecked = document.getElementById('mark-review-check').checked;
        state.reviewMarks[state.currentQuestionIndex] = isChecked;
        this.updateStats();
    },

    jumpToQuestion(index) {
        this.loadQuestion(index);
    },

    updateStats() {
        let answeredCount = 0;
        let notAnsweredCount = 0;
        let notVisitedCount = 0;

        activeExamQuestions.forEach((question, index) => {
            const btn = document.getElementById(`q-btn-${index}`);
            if (!btn) {
                return;
            }

            btn.className = 'q-btn';

            if (index === state.currentQuestionIndex) {
                btn.classList.add('active-q');
            }

            if (state.reviewMarks[index]) {
                btn.classList.add('review');
            }

            if (!state.visited[index] && index !== state.currentQuestionIndex && state.answers[index] === null) {
                notVisitedCount++;
            } else if (state.answers[index] !== null) {
                answeredCount++;
                btn.classList.add('ans');
            } else {
                notAnsweredCount++;
                btn.classList.add('not-ans');
            }
        });

        document.getElementById('stat-answered').textContent = answeredCount;
        document.getElementById('stat-not-answered').textContent = notAnsweredCount;
        document.getElementById('stat-not-visited').textContent = notVisitedCount;

        const endBtn = document.getElementById('end-test-btn');
        if (endBtn && answeredCount === activeExamQuestions.length && activeExamQuestions.length) {
            endBtn.disabled = false;
            endBtn.classList.add('active');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();

    const resizers = document.querySelectorAll('.resizer');
    const contentArea = document.getElementById('question-content-area');
    if (resizers.length >= 3 && contentArea) {
        resizers[0].onclick = () => { contentArea.style.fontSize = '14px'; };
        resizers[1].onclick = () => { contentArea.style.fontSize = '16px'; };
        resizers[2].onclick = () => { contentArea.style.fontSize = '20px'; };
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && state.currentView === 'view-exam' && event.target.tagName !== 'BUTTON') {
            event.preventDefault();
            app.saveAndNext();
        }
    });

    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
        navigator.serviceWorker.register('service-worker.js').catch(() => {
            // The app works fine without offline support.
        });
    }
});

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;

    const installAppBtn = document.getElementById('install-app-btn');
    if (installAppBtn) {
        installAppBtn.hidden = false;
    }
});

window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;

    const installAppBtn = document.getElementById('install-app-btn');
    if (installAppBtn) {
        installAppBtn.hidden = true;
    }
});
