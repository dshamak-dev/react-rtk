import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, {
  FC,
  PropsWithoutRef,
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
      onChange(state);
    }
  }, [JSON.stringify(state)]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = new FormData(e.target).get("value") as FigureType;
    const opponent = randomArrayItem(options).value;

    const isMatch = value === opponent;

    setState((prev) => {
      let win = prev.win || 0;
      let lost = prev.lost || 0;
      const isWin = !isMatch && validateFigures(value, opponent);
      const isLost = !isMatch && !isWin;

      if (isWin) {
        win += 1;
      }

      const completed = prev.completed || win >= targetWins;

      if (isLost) {
        lost += 1;
      }

      return concatObjects(prev, { completed, win, lost, selection: value, opponent });
    });
  };

  const controls = useMemo(() => {
    if (!state) {
      return null;
    }

    if (!state.selection) {
      return (
        <form
          onSubmit={handleSubmit}
          className={classNames(
            "flex flex-col items-center justify-center gap-4"
          )}
        >
          <select defaultValue="" className="text-black" name="value">
            <option disabled value="">
              select figure
            </option>
            {options.map(({ value, text }) => {
              return (
                <option key={value} value={value}>
                  {text}
                </option>
              );
            })}
          </select>
          <Button>confirm</Button>
        </form>
      );
    }

    const isMatch = state.selection === state.opponent;
    let text = isMatch ? "match" : null;

    if (!text) {
      text = validateFigures(state.selection, state.opponent) ? "won" : "lost";
    }

    return (
      <div>
        <h2>{text}</h2>
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
      <div className={classNames("flex items-center justify-center gap-4")}>
        <span>Wins</span>
        <span>{state.win || 0}</span>
        <span>/</span>
        <span>{targetWins}</span>
      </div>
      <div className={classNames("flex items-center justify-center gap-4")}>
        <GameFigure figure={state.selection} />
        <span>
          <FontAwesomeIcon icon={faTimes} className="text-highlight" />
        </span>
        <GameFigure figure={state.opponent} />
      </div>
      <div>{controls}</div>
    </div>
  );
}
