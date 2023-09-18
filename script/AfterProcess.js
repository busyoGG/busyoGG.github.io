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
        console.log("测试代码", eles);
    },

    Init: () => {
        console.log("初始化界面");
        AfterProcess.ResetCodeStyle();
    }
}
AfterProcess.Init();