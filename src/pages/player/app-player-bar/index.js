import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { NavLink } from "react-router-dom";

import { Slider } from "antd";
import { PlayBarWrapper, Control, PlayInfo, Operator } from "./style";
import AppPlayerPanel from "../app-player-panel";

import {
  getSongDetailAction,
  changeSequenceAction,
  switchCurrentSongAction,
  changeLyricIndexAction,
} from "./store/actionCreators";
import {
  getSizeImage,
  formatMinutesSecond,
  getPlaySong,
} from "@/utils/format-utils.js";

const AppPlayerBar = memo(() => {
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const { currentSong, sequence, lyricList, lyricIndex, playList } =
    useSelector(
      (state) => ({
        currentSong: state.getIn(["player", "currentSong"]),
        sequence: state.getIn(["player", "sequence"]),
        lyricList: state.getIn(["player", "lyricList"]),
        lyricIndex: state.getIn(["player", "lyricIndex"]),
        playList: state.getIn(["player", "playList"]),
      }),
      shallowEqual
    );
  const dispatch = useDispatch();

  const audioRef = useRef();
  useEffect(() => {
    dispatch(getSongDetailAction(414611211));
  }, [dispatch]);
  useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong.id);
    audioRef.current
      .play()
      .then((res) => {
        setIsPlaying(true);
      })
      .catch((err) => {
        setIsPlaying(false);
      });
  }, [currentSong]);

  const picUrl = currentSong.al && currentSong.al.picUrl;
  const singername = currentSong.ar && currentSong.ar[0].name;
  const duration = currentSong.dt || 0;
  const showCurrentTime = formatMinutesSecond(currentTime);

  const playMusic = useCallback(() => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const changeSequence = () => {
    const currentSequence = (sequence + 1) % 3;
    dispatch(changeSequenceAction(currentSequence));
  };

  const changeMusic = (tag) => {
    dispatch(switchCurrentSongAction(tag));
  };

  const timeUpate = (e) => {
    const currentTime = e.target.currentTime;
    if (!isChanging) {
      setCurrentTime(currentTime * 1000);
      setProgress(((currentTime * 1000) / duration) * 100);
    }

    let i = 0;
    for (; i < lyricList.length; i++) {
      let lyricItem = lyricList[i];
      if (currentTime * 1000 < lyricItem.time) {
        break;
      }
    }
    if (i - 1 !== lyricIndex) {
      dispatch(changeLyricIndexAction(i - 1));
    }
  };

  const handleEnded = (e) => {
    if (sequence === 2) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(switchCurrentSongAction(1));
    }
  };

  const sliderChange = useCallback(
    (value) => {
      const currentTime = (value / 100) * duration;
      setCurrentTime(currentTime);
      setIsChanging(true);
      setProgress(value);
    },
    [duration]
  );

  const sliderAfterChange = useCallback(
    (value) => {
      const currentTime = ((value / 100) * duration) / 1000;
      audioRef.current.currentTime = currentTime;
      setCurrentTime(currentTime * 1000);
      setIsChanging(false);

      if (!isPlaying) {
        playMusic();
      }
    },
    [duration, isPlaying, playMusic]
  );

  return (
    <PlayBarWrapper className="sprite_player">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button
            className="sprite_player prev"
            onClick={(e) => changeMusic(-1)}
          ></button>
          <button
            className="sprite_player play"
            onClick={(e) => playMusic()}
          ></button>
          <button
            className="sprite_player next"
            onClick={(e) => changeMusic(1)}
          ></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/discover/player">
              <img src={getSizeImage(picUrl, 35)} alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span>{currentSong.name}</span>
              <a href="todo" className="singer-name">
                {singername}
              </a>
            </div>
            <div className="progress">
              <Slider
                defaultValue={30}
                tooltipVisible={false}
                value={progress}
                onChange={sliderChange}
                onAfterChange={sliderAfterChange}
              />
              <div className="time">
                <span className="now-time">{showCurrentTime}</span>
                <span className="divider">/</span>
                <span className="duration">
                  {formatMinutesSecond(duration)}
                </span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={sequence}>
          <div className="left">
            <button className="sprite_player btn favor"></button>
            <button className="sprite_player btn share"></button>
          </div>
          <div className="right sprite_player">
            <button className="sprite_player btn volume"></button>
            <button
              className="sprite_player btn loop"
              onClick={(e) => changeSequence()}
            ></button>
            <button
              className="sprite_player btn playlist"
              onClick={(e) => setShowPanel(!showPanel)}
            >
              {playList.length}
            </button>
          </div>
        </Operator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={timeUpate}
        onEnded={handleEnded}
      ></audio>
      {showPanel && <AppPlayerPanel />}
      {/* <div className="lock sprite_player"></div> */}
    </PlayBarWrapper>
  );
});

export default AppPlayerBar;
