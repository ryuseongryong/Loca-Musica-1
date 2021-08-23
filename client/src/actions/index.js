// sign in &  out 및 userInfo에 관련된 action
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const UPDATE_USERINFO = "UPDATE_USERINFO";

// Bookmark 관리와 관련된 action
export const ADD_BOOKMARK = "ADD_BOOKMARK";
export const REMOVE_BOOKMARK = "REMOVE_BOOKMARK";

// pathname과 관련된 action
export const REMEMBER_PATHNAME = "REMEMBER_PATHNAME";

// 알림센터와 관련된 action
export const NOTIFY = "NOTIFY";
export const ENQUEUE_NOTIFICATION = "ENQUEUE_NOTIFICATION";
export const DEQUEUE_NOTIFICATION = "DEQUEUE_NOTIFICATION";

// 로그인 액션
export const signin = (data) => {
  // console.log("data를 보여줘", data);
  const { email, username, profile, resign, admin, kakao, bookmarksData } =
    data;
  return {
    type: SIGN_IN,
    payload: {
      isSignin: true,
      userInfo: {
        email: email,
        username: username,
        profile: profile,
        resign: resign,
        admin: admin,
        kakao: kakao,
      },
      bookmarksData: bookmarksData,
    },
  };
};
// 로그아웃 액션
export const signout = () => {
  return {
    type: SIGN_OUT,
    payload: {
      isSignin: false,
      userInfo: {
        email: "",
        username: "",
        profile: "",
        resign: "",
        admin: "",
        kakao: "",
      },
      bookmarksData: [],
    },
  };
};
// 회원정보변경 액션
export const updateUserInfo = (data) => {
  const { email, username, profile, resign, admin, kakao } = data;
  return {
    type: UPDATE_USERINFO,
    payload: {
      userInfo: {
        email: email,
        username: username,
        profile: profile,
        resign: resign,
        admin: admin,
        kakao: kakao,
      },
    },
  };
};

// pathname 저장 액션
export const rememberPathname = (pathname) => {
  return {
    type: REMEMBER_PATHNAME,
    payload: {
      pathname,
    },
  };
};

// bookmark 더하기
export const addBookmark = (data) => {
  // console.log("북마크를 더했을때", data);
  return {
    type: ADD_BOOKMARK,
    payload: data,
  };
};
// bookmark 취소하기
export const removeBookmark = (title) => {
  return {
    type: REMOVE_BOOKMARK,
    payload: {
      title,
    },
  };
};

// 알림창 작동과 관련된 액션
export const notify =
  (message, dismissTime = 3000) =>
  (dispatch) => {
    const uuid = Math.random();
    dispatch(enqueueNotification(message, dismissTime, uuid));
    setTimeout(() => {
      dispatch(dequeueNotification());
    }, dismissTime);
  };

export const enqueueNotification = (message, dismissTime, uuid) => {
  return {
    type: ENQUEUE_NOTIFICATION,
    payload: {
      message,
      dismissTime,
      uuid,
    },
  };
};

export const dequeueNotification = () => {
  return {
    type: DEQUEUE_NOTIFICATION,
  };
};
