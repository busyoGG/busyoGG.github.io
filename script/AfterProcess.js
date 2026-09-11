window.AfterProcess = {
  ResetCodeStyle: () => {
    var eles = document.getElementsByClassName("highlight");
    var colors = ["#ed6a5e", "#f5bd4f", "#61c454"];
    for (let i = 0, len = eles.length; i < len; i++) {
      let child = eles[i].firstChild;
      //创建按钮
      let customDiv = document.createElement("div");
      customDiv.style.display = "flex";
      customDiv.style.height = "40px";
      customDiv.style.width = "100%";

      for (let j = 0; j < 3; j++) {
        let btn = document.createElement("div");
        btn.style.backgroundColor = colors[j];
        btn.style.height = "20px";
        btn.style.width = "20px";
        btn.style.border = "1px solid " + colors[j];
        btn.style.borderRadius = "10px";
        btn.style.margin = "10px 5px 10px 5px";
        customDiv.appendChild(btn);
      }

      console.log("是否匹配", child.nodeName);
      if (child.nodeName != "FIGCAPTION") {
        //没有标题
        eles[i].insertBefore(customDiv, child);
      } else {
        eles[i].replaceChild(customDiv, child);
        //有标题
        let p = document.createElement("p");
        p.style.width = customDiv.offsetWidth - 40 * 3 + "px";
        p.style.height = "40px";
        p.style.textAlign = "center";
        p.style.margin = "0px";
        p.style.lineHeight = "40px";
        p.innerText = child.firstChild.innerText;
        p.style.fontSize = "20px";
        customDiv.appendChild(p);
      }
    }
  },

  ResetTitle: () => {
    let colors = {
      H1: "#61c454",
      H2: "#61c454",
      H3: "#f5bd4f",
      H4: "#ed6a5e",
      H5: "#e40056",
      H6: "#029ae2",
    };
    var eles = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
    var picker = window.getComputedStyle;
    for (let i = 1, len = eles.length; i < len; i++) {
      let child = eles[i].firstChild;
      let eleStyle = picker(eles[i]);

      let div = document.createElement("div");
      div.classList.add("title_div");

      div.style.width = "100%";
      div.style.display = "flex";

      //创建标识
      let customDiv = document.createElement("div");
      customDiv.classList.add("title_mark");
      customDiv.style.display = "flex";
      customDiv.style.width = "15px";
      customDiv.style.backgroundColor = colors[eles[i].tagName];
      customDiv.style.height = eleStyle.fontSize;
      customDiv.style.marginRight = "10px";
      customDiv.style.marginTop =
        (parseFloat(eleStyle.lineHeight) - parseFloat(eleStyle.fontSize)) *
          0.5 +
        "px";
      customDiv.style.borderRadius = "5px";
      // console.log("字体大小",eleStyle.fontSize,parseFloat(eleStyle.lineHeight),parseFloat(eleStyle.fontSize))
      // customDiv.style.verticalAlign
      eles[i].style.display = "flex";
      eles[i].style.verticalAlign = "center";

      div.appendChild(customDiv, child);

      let str = eles[i].textContent;
      eles[i].textContent = "";

      var text = document.createTextNode(str);
      div.appendChild(text);

      eles[i].appendChild(div);
    }
  },
  InitVideo: () => {
    let videos = document.getElementsByTagName("video");
    for (let index = 0; index < videos.length; index++) {
      let ele = videos[index];
      let player = new Plyr(ele, {
        controls: [
          "play-large", // The large play button in the center
          "play", // Play/pause playback
          "restart", // Restart playback
          "progress", // The progress bar and scrubber for playback and buffering
          "current-time", // The current time of playback
          "duration", // The full duration of the media
          "mute", // Toggle mute
          "volume", // Volume control
          "captions", // Toggle captions
          "settings", // Settings menu
          "pip", // Picture-in-picture (currently Safari only)
          "airplay", // Airplay (currently Safari only)
          "download", // Show a download button with a link to either the current source or a custom URL you specify in your options
          "fullscreen", // Toggle fullscreen
        ],
      });
    }

    // 监听全屏状态变化
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    function handleFullscreenChange() {
      var fullscreenElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

      if (fullscreenElement) {
        //  fullscreenStateDiv.textContent = '当前是全屏状态';
        for (let index = 0; index < videos.length; index++) {
          let ele = videos[index];
          ele.classList.add("full-screen");
        }
      } else {
        //  fullscreenStateDiv.textContent = '当前不是全屏状态';
        for (let index = 0; index < videos.length; index++) {
          let ele = videos[index];
          ele.classList.remove("full-screen");
        }
      }
    }
  },
  InitList: () => {
    const olElements = document.querySelectorAll("ol");
    olElements.forEach((ol) => {
      const start = ol.getAttribute("start");
      if (start) {
        ol.style.counterReset = `custom-counter ${start - 1}`;
      }
    });
  },
  ResizeTable: () => { 
    console.log("调整表格宽度");
    document.querySelectorAll("table").forEach(table => {
      // 代码块表格（figure.highlight 里的 td.gutter / td.code）交给主题样式处理，
      // 既不要设置列宽，也不要包 table-wrapper，否则主题的 .highlight > table 选择器会失效
      if (table.closest("figure.highlight")) return;

      const rows = [...table.rows];
      if (!rows.length) return;

      const cols = rows[0].cells.length;
      const weights = new Array(cols).fill(0);

      // 统计每列最长文本长度
      rows.forEach(row => {
        [...row.cells].forEach((cell, i) => {
          weights[i] = Math.max(weights[i], cell.innerText.trim().length);
        });
      });

      // 平滑权重，避免简介、简评占太宽
      weights.forEach((w, i) => {
        weights[i] = Math.max(4, Math.sqrt(w));
      });

      const total = weights.reduce((a, b) => a + b, 0);

      let table_width = table.getBoundingClientRect().width;
      console.log("table", table_width, weights, total);
      if (table_width < 400) {
        table_width = "900";
      }
      // 只设置第一行
      [...rows[0].cells].forEach((cell, i) => {
        cell.style.width = `${weights[i] / total * table_width}px`;
        // console.log("设置列宽", i, cell.style.width);
      });

      // 检查是否已经被包裹过，避免重复
      if (table.parentElement && table.parentElement.classList.contains('table-wrapper')) {
        return;
      }

      // 创建外层容器
      const wrapper = document.createElement('div');
      wrapper.className = 'table-wrapper';

      // 将表格替换为容器，再把表格放进去
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  },
  Init: () => {
    console.log("初始化界面");
    AfterProcess.ResetCodeStyle();
    AfterProcess.ResetTitle();
    AfterProcess.InitVideo();
    AfterProcess.InitList();
    AfterProcess.ResizeTable();
    mermaid.init(undefined, ".mermaid");
  },
};
AfterProcess.Init();
