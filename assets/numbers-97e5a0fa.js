function i(s){const t=String(s),e=[];let n=t.length%3||3;for(let r=0;r<t.length;r+=3)e.push(t.substring(n-3,n)),n+=3;return e.join(" ")}export{i as f};
