import * as actionTypes from "./constants";

import { getSongDetail, getLyric } from "@/services/player";
import { getRandomNum } from "@/utils/format-math";
import { parseLyric } from "@/utils/parse-lyric";

const changeCurrentSongAction = (currentSong) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong,
});

const changeCurrentSongIndexAction = (currentSongIndex) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  currentSongIndex,
});

const changePlayListAction = (playList) => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  playList,
});

const changeLyricListAction = (lyricList) => ({
  type: actionTypes.CHANGE_LYRIC_LIST,
  lyricList,
});

export const changeLyricIndexAction = (lyricIndex) => ({
  type: actionTypes.CHANGE_LYRIC_INDEX,
  lyricIndex,
})

export const changeSequenceAction = (sequence) => ({
  type: actionTypes.CHANGE_SEQUENCE,
  sequence,
});

export const switchCurrentSongAction = (tag) => {
  return (dispatch, getState) => {
    const sequence = getState().getIn(["player", "sequence"]);
    const playList = getState().getIn(["player", "playList"]);
    let currentSongIndex = getState().getIn(["player", "currentSongIndex"]);
    if (!playList.length) {
      return;
    }
    switch (sequence) {
      case 1:
        if (playList.length !== 1) {
          let randomIndex = getRandomNum(playList.length);
          while (randomIndex === currentSongIndex) {
            randomIndex = getRandomNum(playList.length);
          }
          currentSongIndex = randomIndex;
        }
        break;
      default:
        currentSongIndex = (currentSongIndex + tag) % playList.length;
    }
    const currentSong = playList[currentSongIndex];
    dispatch(changeCurrentSongAction(currentSong));
    dispatch(changeCurrentSongIndexAction(currentSongIndex));
    dispatch(getLyricAction(currentSong.id));
  };
};

export const getSongDetailAction = (idx) => {
  return (dispatch, getState) => {
    const playList = getState().getIn(["player", "playList"]);
    const currentIndex = playList.findIndex((item) => item.id === idx);
    let song = null;
    if (currentIndex !== -1) {
      dispatch(changeCurrentSongIndexAction(currentIndex));
      song = playList[currentIndex];
      dispatch(changeCurrentSongAction(song));
      dispatch(getLyricAction(song.id));
    } else {
      getSongDetail(idx).then((res) => {
        song = res.songs && res.songs[0];
        if (!song) {
          return;
        }

        dispatch(changeCurrentSongAction(song));

        const newPlayList = [...playList];
        newPlayList.push(song);
        dispatch(changePlayListAction(newPlayList));

        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1));
        dispatch(getLyricAction(song.id));
      });
    }
  };
};

export const getLyricAction = (id) => {
  return (dispatch) => {
    getLyric(id).then((res) => {
      dispatch(changeLyricListAction(parseLyric(res.lrc.lyric)));
    });
  };
};
