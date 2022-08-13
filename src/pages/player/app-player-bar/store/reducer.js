import { Map } from "immutable";
import * as actionTypes from "./constants";
import { playList } from '@/common/local-data';

const defaultState = Map({
  currentSong: {},
  playList: playList || [],
  currentSongIndex: 0,
  sequence: 0, // 0 循环 1 随机 2 单曲
  lyricList: [],
  lyricIndex: 0,
});

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_SONG:
      return state.set("currentSong", action.currentSong);
    case actionTypes.CHANGE_CURRENT_SONG_INDEX:
      return state.set("currentSongIndex", action.currentSongIndex);
    case actionTypes.CHANGE_PLAY_LIST:
      return state.set("playList", action.playList);
    case actionTypes.CHANGE_SEQUENCE:
      return state.set("sequence", action.sequence);
    case actionTypes.CHANGE_LYRIC_LIST:
      return state.set('lyricList', action.lyricList);
    case actionTypes.CHANGE_LYRIC_INDEX:
      return state.set('lyricIndex', action.lyricIndex);
    default:
      return state;
  }
}
