window.HomeScript = {
  InitCard: () => {
    var targetDiv = document.getElementsByClassName("post-wrapper");
    for (var i = 0; i < targetDiv.length; i++) {
      var element = targetDiv[i];
      element.classList.add("card-ani");
      var targetDivTop = element.getBoundingClientRect().top;

      if (targetDivTop < window.innerHeight + 260) {
        // 当目标div进入视口时，添加动画效果
        // element.classList.add("animated");
        element.classList.add("card-in");
      } else {
        // 当目标div离开视口时，移除动画效果
        // element.classList.remove("animated");
        element.classList.remove("card-in");
      }
    }
  },
  CardAni: () => {
    var targetDiv = document.getElementsByClassName("post-wrapper");
    for (var i = 0; i < targetDiv.length; i++) {
      var element = targetDiv[i];
      var targetDivTop = element.getBoundingClientRect().top;

      //   if (targetDivTop < window.innerHeight) {
      //     // 当目标div进入视口时，添加动画效果
      //     // element.classList.add("animated");
      //     element.classList.add("card-in");
      //   } else {
      //     // 当目标div离开视口时，移除动画效果
      //     // element.classList.remove("animated");
      //     element.classList.remove("card-in");
      //   }

      if (targetDivTop >= window.innerHeight) {
        element.classList.remove("card-in");
      } else {
        element.classList.add("card-in");
      }
    }
  },
  Init: () => {
    HomeScript.InitCard();
    window.removeEventListener("scroll", HomeScript.CardAni);
    window.addEventListener("scroll", HomeScript.CardAni);
  },
};

HomeScript.Init();
