/*eslint-disable*/

import '../css/detail.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PerformanceInfo from '../components/performanceInfo';
import PerformanceTag from '../components/performanceTag';
import Footer from '../components/footer';

function Detail() {
  // 상태관리
  const dispatch = useDispatch();
  const { isSignin, userInfo } = useSelector((state) => {
    return {
      isSignin: state.userReducer.isSignin,
      userInfo: state.userReducer.userInfo,
    };
  });
  // console.log("사용자정보를 보여줘", userInfo);
  // console.log("뷱마크리스트를 보여줘", bookmarkList);
  const [performanceInfo, setPerformanceInfo] = useState({
    id: '',
    code: '',
    title: '',
    thumbnail: '',
    contents: '',
    state: '',
    actors: '',
    numbersData: [],
    hashtagsData: [],
  });

  // 작품정보 가져오기
  useEffect(() => {
    // 페이지 이동하면 쿼리에서 title만 가져오면..
    const url = new URL(window.location.href);
    const title = decodeURI(url.pathname.slice(9));

    axios
      .get(`${process.env.REACT_APP_END_POINT}/musical/${title}`, {
        withCredentials: true,
      })
      .then((res) => {
        // 응답으로 받은 데이터로 현재 페이지에서의 작품정보를 state로 관리
        // console.log(res.data.data);
        setPerformanceInfo(res.data.data);
      })
      .catch((err) => {
        console.log('작품정보를 불러오지 못한 이유는?', err);
      });
  }, []);

  // 핸들러함수
  return (
    <div className="detailPageWrap">
      <div id="detailPage">
        {userInfo.admin === 1 ? (
          <div className="adminBtnWrap">
            <button>수정</button>
            <button>삭제</button>
          </div>
        ) : null}
        <div className="pfInfoContainer">
          <PerformanceInfo
            performanceInfo={performanceInfo}
            isSignin={isSignin}
          />
          <PerformanceTag
            performanceInfo={performanceInfo}
            isSignin={isSignin}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
