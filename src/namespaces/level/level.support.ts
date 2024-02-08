import {
  faDungeon,
  faHammer,
  faHandScissors,
} from "@fortawesome/free-solid-svg-icons";

export const getLevelIcon = (type) => {
  switch (type) {
    case "hammer": {
      return faHammer;
    }
    case "spr": {
      return faHandScissors;
    }
    default: {
      return faDungeon;
    }
  }
};
