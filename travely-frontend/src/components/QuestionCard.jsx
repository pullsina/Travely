import europeOutline from '../assets/continent-outlines/europe.png'
import './QuestionCard.css'

const defaultAnswers = [
  { id: 1, label: 'France' },
  { id: 2, label: 'Italy' },
  { id: 3, label: 'Spain' },
  { id: 4, label: 'Portugal' },
  { id: 5, label: 'Germany' },
  { id: 6, label: 'Poland' },
  { id: 7, label: 'Belgium' },
  { id: 8, label: 'Netherlands' },
]

function QuestionCard({
  continent = 'Europe',
  questionNumber = 6,
  totalQuestions = 10,
  capital = 'Paris',
  answers = defaultAnswers,
  selectedAnswerId,
  hintType = 'map',
  mapImage = europeOutline,
  flagUrl,
  factImageUrl = '/images/countries/hints/fallback.png',
  factText = 'Use a hint to reveal more about this country.',
  correctAnswerId,
  isSubmitted = false,
  isCorrect = false,
  submitError = '',
  onSelectAnswer,
  onFlagHint,
  onFactHint,
  onSubmit,
}) {
  const progressPercent = (questionNumber / totalQuestions) * 100
  const displayedImage =
    hintType === 'flag' ? flagUrl : hintType === 'fact' ? factImageUrl : mapImage

  return (
    <section className="question-card" aria-labelledby="question-card-title">
      <header className="question-card__header">
        <h1 id="question-card-title" className="question-card__continent">
          {continent}
        </h1>
        <p className="question-card__count">
          Question {questionNumber} / {totalQuestions}
        </p>
        <div className="question-card__progress" aria-hidden="true">
          <span style={{ width: `${progressPercent}%` }} />
        </div>
      </header>

      <div className="question-card__prompt">
        <p className="question-card__capital">{capital}</p>
        <p className="question-card__text">is the capital of which country?</p>
      </div>

      <div className="question-card__body">
        <div className="question-card__media-panel" data-hint-type={hintType}>
          <div className="question-card__image-frame">
            {displayedImage ? (
              <img src={displayedImage} alt={`${hintType} hint`} />
            ) : (
              <span>No hint selected</span>
            )}
          </div>

          {hintType === 'fact' && (
            <p className="question-card__fact">{factText}</p>
          )}
        </div>

        <div className="question-card__answers" aria-label="Answer options">
          {answers.map((answer) => (
            <button
              className="question-card__answer"
              data-selected={selectedAnswerId === answer.id}
              data-correct={isSubmitted && answer.id === correctAnswerId}
              data-incorrect={
                isSubmitted &&
                selectedAnswerId === answer.id &&
                answer.id !== correctAnswerId
              }
              disabled={isSubmitted}
              key={answer.id}
              type="button"
              onClick={() => onSelectAnswer?.(answer.id)}
            >
              {answer.label}
            </button>
          ))}
        </div>
      </div>

      <div className="question-card__actions">
        <div className="question-card__hint-actions">
          <button
            className="question-card__hint-button"
            data-active={hintType === 'flag'}
            type="button"
            onClick={onFlagHint}
            aria-describedby="hint-cost-tooltip"
          >
            <span className="question-card__hint-icon" aria-hidden="true">
              ⚐
            </span>
            Flag - 1 p
          </button>

          <button
            className="question-card__hint-button"
            data-active={hintType === 'fact'}
            type="button"
            onClick={onFactHint}
            aria-describedby="hint-cost-tooltip"
          >
            <span className="question-card__hint-icon" aria-hidden="true">
              ?
            </span>
            Fun fact - 1 p
          </button>

          <span className="question-card__hint-tooltip" id="hint-cost-tooltip">
            This hint costs 1 point
          </span>
        </div>

        <button className="primary-button question-card__submit" type="button" onClick={onSubmit}>
          Submit answer
        </button>

        <div className="question-card__feedback" aria-live="polite">
          {submitError && (
            <p className="question-card__feedback-error">{submitError}</p>
          )}

          {isSubmitted && (
            <p
              className={
                isCorrect
                  ? 'question-card__feedback-correct'
                  : 'question-card__feedback-incorrect'
              }
            >
              {isCorrect ? 'Correct!' : 'Wrong answer.'}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default QuestionCard
