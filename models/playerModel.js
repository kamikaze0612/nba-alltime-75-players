const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  ranked_at: {
    type: Number,
    required: [true, "A player must have ranking"],
  },
  name: {
    type: String,
    required: [true, "A player must have their full name"],
  },
  position: {
    long: {
      type: [String],
      required: [true, "A player must have at least one position"],
    },
    short: {
      type: [String],
      required: [true, "A player must have at least one position"],
    },
  },
  date_of_birth: {
    type: String,
    required: [true, "A player must have their date of birth"],
  },
  draft_year: {
    type: Number,
    required: [true, "A player must have their drafted year"],
  },
  nationality: {
    type: String,
    required: [true, "A player must have their official nationality"],
  },
  teams_played: {
    type: [String],
    required: [true, "A player must have teams they have played in"],
  },
  number: {
    type: [Number],
    required: [true, "A player must have at least one jersey number"],
  },
  mvp: {
    type: [Number],
    default: [],
  },
  championship: {
    type: [Number],
    default: [],
  },
  all_star_appearances: {
    type: Number,
    required: [true, "A player's All Star appearances must be provided"],
  },
  college: {
    type: String,
    default: "",
  },
  highschool: {
    type: String,
    default: "",
  },
  scoring_rank: {
    type: Number,
    required: [true, "A player's all time NBA scoring rank must be inserted"],
  },
  rookie_of_the_year: {
    type: Boolean,
    required: [
      true,
      "A player must have a field about whether they won Rookie of the Year or not",
    ],
  },
  career_highs: {
    points: {
      type: Number,
      required: [true, "A player's career high points must be inserted"],
    },
    rebounds: {
      type: Number,
      required: [true, "A player's career high rebounds must be inserted"],
    },
    assists: {
      type: Number,
      required: [true, "A player's career high assists must be inserted"],
    },
    steals: {
      type: Number,
      required: [true, "A player's career high steals must be inserted"],
      default: 0,
    },
    blocks: {
      type: Number,
      required: [true, "A player's career high blocks must be inserted"],
      default: 0,
    },
  },
  years_played: {
    type: Number,
    required: [true, "A player's played years in NBA must be inserted"],
  },
  retired: {
    type: Boolean,
    required: [
      true,
      "A player must have a field about whether they retired or active",
    ],
  },
  is_hall_of_famer: {
    type: Boolean,
    required: [
      true,
      "A player must have a field about whether they entered Basketball Hall of Fame or not",
    ],
  },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
