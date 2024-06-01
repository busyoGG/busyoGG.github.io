window.NavBarScript = {
  obj: null,
  InitLock: () => {
    var isLock = localStorage.getItem("isLock") || false;
    var ele = document.getElementsByClassName("head-bar")[0];
    var head = document.getElementsByClassName("l_header")[0];
    if (isLock == "true") {
      ele.classList.remove("head-bar-hover");
      head.classList.remove("l_header-hover");
      ele.classList.add("head-bar-focus");
      obj.innerHTML = "🔒";
    } else {
      ele.classList.add("head-bar-hover");
      head.classList.add("l_header-hover");
      ele.classList.remove("head-bar-focus");
      obj.innerHTML = "🔓";
    }
    console.log("初始化", isLock);
  },

  ChangeLock: () => {
    var isLock = localStorage.getItem("isLock") || false;
    console.log("切换");
    var ele = document.getElementsByClassName("head-bar")[0];
    var head = document.getElementsByClassName("l_header")[0];
    if (isLock == "false") {
      ele.classList.remove("head-bar-hover");
      head.classList.remove("l_header-hover");
      ele.classList.add("head-bar-focus");
      obj.innerHTML = "🔒";
    } else {
      ele.classList.add("head-bar-hover");
      head.classList.add("l_header-hover");
      ele.classList.remove("head-bar-focus");
      obj.innerHTML = "🔓";
    }
    isLock = isLock == "false" ? "true" : "false";
    console.log(isLock);
    localStorage.setItem("isLock", isLock);
  },
  Init: () => {
    obj = document.getElementsByClassName("lock-emoji")[0];
    NavBarScript.InitLock();
    obj.addEventListener("click", () => {
      NavBarScript.ChangeLock();
    });
  },
};

NavBarScript.Init();
