import {
  faCheck,
  faEquals,
  faMinus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, {
  FC,
  PropsWithoutRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button } from "src/components/Button";
import { ISession } from "src/namespaces/session/session.model";
import {
  compareObject,
  concatObjects,
  copyObject,
} from "src/support/object.support";
import { randomArrayItem } from "src/support/random.support";

interface Props extends PropsWithoutRef<any> {
  session: ISession;
}

enum FigureType {
  Draft = "0",
  Scissors = "1",
  Paper = "2",
  Rock = "3",
}

const FigurePreview = {
  [FigureType.Draft]: "https://cdn-icons-png.flaticon.com/128/6688/6688580.png",
  [FigureType.Scissors]:
    "https://cdn-icons-png.flaticon.com/128/9534/9534501.png",
  [FigureType.Paper]:
    "https://cdn-icons-png.flaticon.com/128/12355/12355903.png",
  [FigureType.Rock]: "https://cdn-icons-png.flaticon.com/128/2745/2745215.png",
};

const options = [
  { value: FigureType.Scissors, text: "scissors" },
  { value: FigureType.Paper, text: "paper" },
  { value: FigureType.Rock, text: "rock" },
];

const validateFigures = (a: FigureType, b: FigureType) => {
  if (a === b) {
    return false;
  }

  switch (a) {
    case FigureType.Scissors: {
      return b !== FigureType.Rock;
    }
    case FigureType.Paper: {
      return b !== FigureType.Scissors;
    }
    case FigureType.Rock: {
      return b !== FigureType.Paper;
    }
    default: {
      return false;
    }
  }
};

const targetWins = 3;

const GameFigure = ({ className = null, figure, pending = false }) => {
  const figureImage = useMemo(() => {
    let url = FigurePreview[figure];

    if (!url) {
      url = FigurePreview[FigureType.Draft];
    }

    return <img className="w-16 max-w-16" src={url} />;
  }, [figure, pending]);

  return (
    <div
      className={classNames(
        "flex items-center justify-center",
        "p-4 w-16 h-16",
        "text-4xl text-white",
        className
      )}
    >
      {figureImage}
    </div>
  );
};

const defaultState = {
  win: 0,
  lost: 0,
  selection: null,
  opponent: null,
};

export function SPRGame({ session, onChange }) {
  const [state, setState] = useState(null);

  const handleReset = () => {
    setState(defaultState);
  };

  const handleContinue = () => {
    setState((prev) =>
      concatObjects(defaultState, prev, { selection: null, opponent: null })
    );
  };

  useEffect(() => {
    if (!session) {
      return;
    }

    if (session.state) {
      setState(session.state);
    } else {
      handleReset();
    }
  }, [JSON.stringify(session)]);

  useEffect(() => {
    if (!state || !session) {
      return;
    }

    if (onChange && !compareObject(state, session?.state)) {
      onChange({ state });
    }
  }, [JSON.stringify(state)]);

  const handleEnd = () => {
    onChange({ completed: state.completed, state });
  };

  const canPlay = useMemo(() => {
    return !state?.completed;
  }, [state?.completed]);

  const handleSelect = useCallback((selection: FigureType) => {
    const opponent = randomArrayItem(options).value;

    const isMatch = selection === opponent;

    setState((prev) => {
      let win = prev.win || 0;
      let lost = prev.lost || 0;
      const isWin = !isMatch && validateFigures(selection, opponent);
      const isLost = !isMatch && !isWin;

      if (isWin) {
        win += 1;
      }

      const completed = prev.completed || win >= targetWins;

      if (isLost) {
        lost += 1;
      }

      return concatObjects(prev, { completed, win, lost, selection, opponent });
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = new FormData(e.target).get("value") as FigureType;
    handleSelect(value);
  };

  const statusIcon = useMemo(() => {
    if (!state?.selection) {
      return faMinus;
    }

    const isMatch = state.selection === state.opponent;

    if (isMatch) {
      return faEquals;
    }

    const isOk = validateFigures(state.selection, state.opponent);

    return isOk ? faCheck : faTimes;
  }, [state]);

  const controls = useMemo(() => {
    if (!state) {
      return null;
    }

    if (!state.selection) {
      return (
        <div
          className={classNames(
            "flex flex-col items-center justify-center gap-4"
          )}
        >
          <h3>Select a figure</h3>
          <div className={classNames("flex items-center justify-center gap-4")}>
            {options.map(({ value, text }) => {
              return (
                <div
                  key={value}
                  onClick={() => handleSelect(value)}
                  className={classNames(
                    "flex flex-col items-center justify-center gap-1",
                    "rounded-md p-4 bg-white text-black"
                  )}
                >
                  <img
                    src={FigurePreview[value]}
                    className={classNames("w-12")}
                  />
                  <div>{text}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    const isMatch = state.selection === state.opponent;
    let text = isMatch ? "match" : null;

    if (!text) {
      text = validateFigures(state.selection, state.opponent)
        ? "you won"
        : "you lost";
    }

    return (
      <div className={classNames("flex flex-col items-center gap-2")}>
        <h2 className="text-center uppercase">{text}</h2>
        <Button onClick={handleContinue}>ok</Button>
      </div>
    );
  }, [state]);

  if (!state) {
    return null;
  }

  return (
    <div
      className={classNames("flex flex-col items-center justify-center gap-4")}
    >
      <div
        className={classNames(
          "flex flex-col items-center justify-center gap-1"
        )}
      >
        <div>Score</div>
        <div className={classNames("flex items-center justify-center gap-4")}>
          <span>{state.win || 0}</span>
          <span>/</span>
          <span>{targetWins}</span>
        </div>
      </div>
      {canPlay ? (
        <>
          <div className={classNames("flex items-center justify-center gap-4")}>
            <GameFigure figure={state.selection} />
            <span>
              <FontAwesomeIcon icon={statusIcon} className="text-highlight" />
            </span>
            <GameFigure figure={state.opponent} />
          </div>
          <div>{controls}</div>
        </>
      ) : (
        <div>
          <div>{state?.completed ? "you won" : "Game Over"}</div>
          <Button onClick={handleEnd}>go back</Button>
        </div>
      )}
    </div>
  );
}
