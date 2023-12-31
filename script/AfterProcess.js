window.AfterProcess = {
    ResetCodeStyle: () => {
        var eles = document.getElementsByClassName("highlight");
        var colors = [
            "#ed6a5e",
            "#f5bd4f",
            "#61c454"
        ]
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
                p.style.width = (customDiv.offsetWidth - 40 * 3) + "px";
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

    ResetTitle: ()=>{
        var eles = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
        var picker = window.getComputedStyle;
        for (let i = 1, len = eles.length; i < len; i++) {
            let child = eles[i].firstChild;
            let eleStyle = picker(eles[i]);
            //创建标识
            let customDiv = document.createElement("div");
            customDiv.style.display = "flex";
            customDiv.style.width = "15px";
            customDiv.style.backgroundColor = "#61c454";
            customDiv.style.height = eleStyle.fontSize;
            customDiv.style.marginRight = "10px";
            customDiv.style.marginTop = (parseFloat(eleStyle.lineHeight) - parseFloat(eleStyle.fontSize)) * 0.5 + "px";
            customDiv.style.borderRadius = "5px";
            // console.log("字体大小",eleStyle.fontSize,parseFloat(eleStyle.lineHeight),parseFloat(eleStyle.fontSize))
            // customDiv.style.verticalAlign
            eles[i].style.display = "flex";
            eles[i].style.verticalAlign = "center"

            eles[i].insertBefore(customDiv, child);
        }
    },

    Init: () => {
        console.log("初始化界面");
        AfterProcess.ResetCodeStyle();
        AfterProcess.ResetTitle();
    }
}
AfterProcess.Init();